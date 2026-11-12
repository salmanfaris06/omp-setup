import { access, readFile, readdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import { delimiter, extname, isAbsolute, join, resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { drift, loadBundle, mapping, readState, targetDirectory, validateMcp } from './setup.mjs';

export async function executable(command, env = process.env) {
  const directories = isAbsolute(command) || /[/\\]/.test(command) ? [''] : (env.PATH || env.Path || '').split(delimiter);
  const extensions = process.platform === 'win32' && !extname(command) ? (env.PATHEXT || '.COM;.EXE;.BAT;.CMD').split(';') : [''];
  for (const directory of directories) {
    for (const extension of extensions) {
      const candidate = directory ? join(directory, command + extension) : resolve(command + extension);
      try { await access(candidate, process.platform === 'win32' ? constants.F_OK : constants.X_OK); return candidate; }
      catch (error) { if (!['ENOENT', 'EACCES', 'ENOTDIR'].includes(error.code)) throw error; }
    }
  }
  throw new Error(`Executable belum tersedia: ${command}`);
}

async function childProcess(command, args, env, cwd) {
  const path = await executable(command, env);
  if (process.platform === 'win32' && /\.(cmd|bat)$/i.test(path)) {
    // cmd.exe expands metacharacters even inside some quoted arguments. Refuse rather than reinterpret input.
    if ([path, ...args].some((value) => /[\r\n"%!^&|<>]/.test(value))) throw new Error('Argumen shell Windows tidak aman; gunakan executable native.');
    const line = `"${[path, ...args].map((value) => `"${value}"`).join(' ')}"`;
    return spawn(env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', line], { env, cwd, windowsHide: true, windowsVerbatimArguments: true, stdio: ['pipe', 'pipe', 'pipe'] });
  }
  return spawn(path, args, { env, cwd, windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'] });
}

export async function run(command, args, env = process.env, cwd, timeout = 30000) {
  const child = await childProcess(command, args, env, cwd);
  return new Promise((accept, reject) => {
    let output = '';
    let done = false;
    const finish = (error) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      if (error) { child.kill(); reject(error); }
      else accept(output.trim());
    };
    const timer = setTimeout(() => finish(new Error(`Batas waktu perintah: ${command}`)), timeout);
    child.stdout.on('data', (chunk) => {
      output += chunk;
      if (output.length > 1024 * 1024) finish(new Error('Output perintah terlalu besar.'));
    });
    child.stderr.resume();
    child.stdin.end();
    child.on('error', () => finish(new Error(`Gagal menjalankan ${command}.`)));
    child.on('close', (code) => finish(code === 0 ? null : new Error(`Perintah gagal (${code}): ${command}`)));
  });
}

function expand(value, env) {
  if (typeof value === 'string') return value.replace(/\$\{([A-Z_][A-Z0-9_]*)(?::-([^}]*))?\}/g, (_, name, fallback) => {
    if (env[name]) return env[name];
    if (fallback !== undefined) return fallback;
    throw new Error(`Environment variable belum tersedia: ${name}`);
  });
  if (Array.isArray(value)) return value.map((entry) => expand(entry, env));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, expand(entry, env)]));
  return value;
}

function resolveSecrets(server, env) {
  const result = expand(server, env);
  for (const field of ['env', 'headers']) {
    if (!result[field]) continue;
    for (const [key, value] of Object.entries(result[field])) {
      if (value.startsWith('!')) throw new Error('Doctor tidak menjalankan secret command. Gunakan /mcp test pada OMP untuk konfigurasi ini.');
      if (/^[A-Z_][A-Z0-9_]*$/.test(value)) {
        if (!env[value]) throw new Error(`Environment variable belum tersedia: ${value}`);
        result[field][key] = env[value];
      }
    }
  }
  return result;
}

const initialization = { protocolVersion: '2025-03-26', capabilities: {}, clientInfo: { name: 'omp-setup-doctor', version: '0.1.0' } };

async function checkStdio(server, env) {
  const child = await childProcess(server.command, server.args || [], { ...env, ...server.env }, server.cwd);
  return new Promise((accept, reject) => {
    let buffer = '';
    let settled = false;
    const timer = setTimeout(() => finish(new Error('MCP stdio melewati batas waktu.')), 20000);
    function finish(error) {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      child.stdin.end();
      child.kill();
      if (error) reject(error); else accept();
    }
    function send(message) { child.stdin.write(JSON.stringify({ jsonrpc: '2.0', ...message }) + '\n'); }
    child.stdin.on('error', () => finish(new Error('MCP menutup input.')));
    child.stderr.resume();
    child.on('error', () => finish(new Error('MCP tidak dapat dijalankan.')));
    child.on('close', () => finish(new Error('MCP berhenti sebelum tools/list selesai.')));
    child.stdout.on('data', (chunk) => {
      buffer += chunk;
      if (buffer.length > 4 * 1024 * 1024) return finish(new Error('Output MCP terlalu besar.'));
      let newline;
      while ((newline = buffer.indexOf('\n')) !== -1) {
        const line = buffer.slice(0, newline);
        buffer = buffer.slice(newline + 1);
        let message;
        try { message = JSON.parse(line); } catch { continue; }
        if (message.id !== 1 && message.id !== 2) continue;
        if (message.error) return finish(new Error('MCP mengembalikan JSON-RPC error.'));
        if (message.id === 1) {
          if (!message.result?.protocolVersion || !message.result?.capabilities) return finish(new Error('Respons initialize MCP tidak valid.'));
          send({ method: 'notifications/initialized' });
          send({ id: 2, method: 'tools/list', params: {} });
        } else if (Array.isArray(message.result?.tools)) finish();
        else finish(new Error('Respons tools/list MCP tidak valid.'));
      }
    });
    send({ id: 1, method: 'initialize', params: initialization });
  });
}

function rpcResponse(text, id) {
  let candidates;
  try { candidates = [JSON.parse(text)]; }
  catch { candidates = text.split(/\r?\n/).filter((line) => line.startsWith('data:')).map((line) => { try { return JSON.parse(line.slice(5).trim()); } catch { return null; } }); }
  const message = candidates.find((entry) => entry?.id === id);
  if (!message || message.error) throw new Error('Respons JSON-RPC MCP tidak valid.');
  return message.result;
}

async function checkHttp(server) {
  const url = new URL(server.url);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error('URL MCP harus HTTP(S) tanpa kredensial literal.');
  let session;
  let protocol;
  const send = async (message) => {
    const response = await fetch(url, {
      method: 'POST',
      redirect: 'error',
      headers: { ...server.headers, 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream', ...(protocol ? { 'MCP-Protocol-Version': protocol } : {}), ...(session ? { 'Mcp-Session-Id': session } : {}) },
      body: JSON.stringify({ jsonrpc: '2.0', ...message }),
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) throw new Error(`HTTP MCP gagal: ${response.status}`);
    session ||= response.headers.get('mcp-session-id');
    if (!('id' in message)) { await response.body?.cancel(); return; }
    return rpcResponse(await response.text(), message.id);
  };
  try {
    const initialized = await send({ id: 1, method: 'initialize', params: initialization });
    if (!initialized?.protocolVersion || !initialized?.capabilities) throw new Error('Respons initialize MCP tidak valid.');
    protocol = initialized.protocolVersion;
    await send({ method: 'notifications/initialized' });
    const result = await send({ id: 2, method: 'tools/list', params: {} });
    if (!Array.isArray(result?.tools)) throw new Error('Respons tools/list MCP tidak valid.');
  } finally {
    if (session) {
      try {
        const response = await fetch(url, { method: 'DELETE', redirect: 'error', headers: { ...server.headers, 'Mcp-Session-Id': session, ...(protocol ? { 'MCP-Protocol-Version': protocol } : {}) }, signal: AbortSignal.timeout(5000) });
        await response.body?.cancel();
      } catch { /* Best-effort protocol cleanup; connection proof remains the result of tools/list. */ }
    }
  }
}

export async function doctor(options) {
  const target = targetDirectory(options);
  const { manifest } = await loadBundle(options);
  const checks = [];
  const check = async (name, action) => {
    try { const detail = await action(); checks.push({ name, status: 'ok', detail }); }
    catch (error) { checks.push({ name, status: 'error', detail: error.message }); }
  };
  checks.push({ name: 'Node.js', status: Number(process.versions.node.split('.')[0]) >= 22 ? 'ok' : 'error', detail: process.versions.node });
  await check('npm', () => run('npm', ['--version']));
  const state = await readState(target);
  if (!state) checks.push({ name: 'installation', status: 'error', detail: 'Target belum dikelola; jalankan init.' });
  else await check('managed files', async () => {
    const changed = await drift(target, state);
    if (changed.length) throw new Error(`Perubahan lokal: ${changed.join(', ')}`);
    return `Versi ${state.version}; ${Object.keys(state.files).length} berkas sesuai hash.`;
  });
  const ompEnv = { ...process.env, PI_CODING_AGENT_DIR: target, OMP_PROFILE: '', PI_PROFILE: '' };
  await check('OMP', async () => {
    const version = await run('omp', ['--version'], ompEnv);
    if (!version.includes(manifest.ompVersion)) throw new Error(`Versi OMP berbeda; bundle diuji untuk ${manifest.ompVersion}.`);
    return version;
  });
  let mcp;
  await check('configuration', async () => {
    mapping(await readFile(join(target, 'config.yml'), 'utf8'), 'config.yml');
    mcp = mapping(await readFile(join(target, 'mcp.json'), 'utf8'), 'mcp.json');
    validateMcp(mcp);
    return 'YAML dan definisi MCP valid.';
  });
  for (const [directory, required] of [['skills', 'SKILL.md'], ['agents', null]]) {
    await check(directory, async () => {
      const entries = await readdir(join(target, directory), { withFileTypes: true });
      let count = 0;
      for (const entry of entries) {
        if (required && !entry.isDirectory()) continue;
        if (!required && (!entry.isFile() || !entry.name.endsWith('.md'))) continue;
        const path = required ? join(target, directory, entry.name, required) : join(target, directory, entry.name);
        const text = await readFile(path, 'utf8');
        const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
        if (!frontmatter) throw new Error(`Frontmatter tidak ditemukan: ${directory}/${entry.name}`);
        const meta = mapping(frontmatter[1], path);
        if (typeof meta.name !== 'string' || typeof meta.description !== 'string') throw new Error(`Metadata tidak valid: ${directory}/${entry.name}`);
        count++;
      }
      return `${count} definisi valid.`;
    });
  }
  if (mcp) {
    const disabled = new Set(mcp.disabledServers || []);
    const enabled = new Set(mcp.enabledServers || []);
    for (const [name, definition] of Object.entries(mcp.mcpServers)) {
      if (disabled.has(name) || (definition.enabled === false && !enabled.has(name))) {
        checks.push({ name: `MCP ${name}`, status: 'skip', detail: 'Nonaktif.' });
        continue;
      }
      await check(`MCP ${name}`, async () => {
        const server = resolveSecrets(definition, process.env);
        const type = server.type ?? (server.url ? 'http' : 'stdio');
        if (type === 'stdio') {
          await executable(server.command);
          if (options.online) await checkStdio(server, process.env);
        } else {
          const url = new URL(server.url);
          if (!['http:', 'https:'].includes(url.protocol)) throw new Error('URL MCP harus HTTP(S).');
          if (options.online) {
            if (type === 'sse') throw new Error('Doctor online hanya mendukung stdio dan Streamable HTTP; uji SSE melalui /mcp test di OMP.');
            await checkHttp(server);
          }
        }
        return options.online ? 'initialize dan tools/list berhasil.' : 'Prasyarat valid; koneksi belum diuji (gunakan --online).';
      });
    }
  }
  if (options.online) await check('Context7 CLI', async () => {
    await run('npx', ['--yes', '--package', `ctx7@${manifest.context7Version}`, '--', 'ctx7', '--version'], process.env, undefined, 60000);
    return `ctx7@${manifest.context7Version} dapat dijalankan via npx. Login opsional: npx ctx7@${manifest.context7Version} login`;
  });
  else checks.push({ name: 'Context7 CLI', status: 'skip', detail: `Dijalankan on demand: npx ctx7@${manifest.context7Version}; gunakan --online untuk menguji.` });
  return { target, version: state?.version ?? null, ok: checks.every((item) => item.status !== 'error'), checks };
}
