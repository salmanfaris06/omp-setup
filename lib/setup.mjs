import { createHash, randomUUID } from 'node:crypto';
import { homedir } from 'node:os';
import { dirname, isAbsolute, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { lstat, mkdir, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { parse, stringify } from 'yaml';

export const bundledSource = fileURLToPath(new URL('../bundle/', import.meta.url));
const control = '.omp-setup';
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
const object = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

export function merge(base, overlay) {
  if (!object(base) || !object(overlay)) return structuredClone(overlay);
  const result = structuredClone(base);
  for (const [key, value] of Object.entries(overlay)) {
    if (['__proto__', 'constructor', 'prototype'].includes(key)) throw new Error(`Kunci terlarang: ${key}`);
    result[key] = object(value) && object(result[key]) ? merge(result[key], value) : structuredClone(value);
  }
  return result;
}

export function targetDirectory(options, env = process.env, home = homedir()) {
  if (options.target) return resolve(options.target);
  const selected = options.profile ?? env.OMP_PROFILE ?? env.PI_PROFILE ?? '';
  const profile = selected.trim();
  if (profile && profile !== 'default' && !/^[a-zA-Z0-9_-]+$/.test(profile)) {
    throw new Error('Nama profile hanya boleh berisi huruf, angka, _ dan -.');
  }
  const root = resolve(home, env.PI_CONFIG_DIR || '.omp');
  if (profile && profile !== 'default') return join(root, 'profiles', profile, 'agent');
  return env.PI_CODING_AGENT_DIR ? resolve(env.PI_CODING_AGENT_DIR) : join(root, 'agent');
}

async function stat(path) {
  try { return await lstat(path); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}

function safeRelative(path) {
  if (typeof path !== 'string' || !path || path.includes('\\') || path.includes(':') || path.includes('\0') || isAbsolute(path)
    || path.split('/').some((part) => !part || part === '.' || part === '..')) {
    throw new Error(`Path berkas tidak aman: ${path}`);
  }
  return path;
}

function managedPath(path) {
  safeRelative(path);
  if (!['config.yml', 'models.yml', 'mcp.json', 'RULES.md', 'APPEND_SYSTEM.md', 'SYSTEM.md'].includes(path)
    && !/^(skills|agents|instructions|commands)\/.+/.test(path)) {
    throw new Error(`Berkas di luar daftar kelola: ${path}`);
  }
  if (path.split('/').some((part) => /^(?:\.env(?:\..*)?|\.git|node_modules)$/.test(part))
    || /\.(db|key|pem)(?:-|$)/.test(path)) throw new Error(`Berkas rahasia/runtime ditolak: ${path}`);
  return path;
}

async function guardPath(root, name = '') {
  const full = resolve(root, name);
  const absoluteRoot = resolve(root);
  if (full !== absoluteRoot && !full.startsWith(absoluteRoot + sep)) throw new Error('Path keluar dari target.');
  // Check ancestors too: a symlink above the target can redirect the entire installation.
  let current = full;
  while (true) {
    const info = await stat(current);
    if (info?.isSymbolicLink()) throw new Error(`Symlink/junction ditolak: ${current}`);
    if (info && current !== full && !info.isDirectory()) throw new Error(`Bukan direktori: ${current}`);
    const parent = dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return full;
}

async function bytesAt(root, name) {
  const full = await guardPath(root, name);
  const info = await stat(full);
  if (!info) return null;
  if (!info.isFile()) throw new Error(`Bukan berkas biasa: ${name}`);
  return readFile(full);
}

export function mapping(text, label) {
  const value = parse(text, { maxAliasCount: 50, uniqueKeys: true });
  if (!object(value)) throw new Error(`${label} harus berupa mapping.`);
  return merge({}, value);
}

function checkSecrets(value, path = '') {
  if (!object(value) && !Array.isArray(value)) return;
  for (const [key, entry] of Object.entries(value)) {
    const keyPath = `${path}.${key}`;
    if (/(?:api[_-]?key|client[_-]?secret|password|authorization|(?:^|[_-])token$|private[_-]?key)/i.test(key)
      && typeof entry === 'string' && entry.trim()
      && !/^\$\{[A-Z_][A-Z0-9_]*(?::-[^}]*)?\}$/.test(entry)
      && !/^[A-Z_][A-Z0-9_]*$/.test(entry)) {
      throw new Error(`Kredensial literal ditolak pada ${keyPath}; gunakan environment variable.`);
    }
    checkSecrets(entry, keyPath);
  }
}

export function validateMcp(mcp) {
  if (!object(mcp.mcpServers)) throw new Error('mcpServers harus berupa mapping.');
  for (const [name, server] of Object.entries(mcp.mcpServers)) {
    if (!object(server)) throw new Error(`Definisi MCP tidak valid: ${name}`);
    const type = server.type ?? (server.url ? 'http' : 'stdio');
    if (!['stdio', 'http', 'sse'].includes(type) || (server.command && server.url)) throw new Error(`Transport MCP tidak valid: ${name}`);
    if (type === 'stdio' && (typeof server.command !== 'string' || !server.command.trim())) throw new Error(`Command MCP kosong: ${name}`);
    if (type !== 'stdio' && (typeof server.url !== 'string' || !server.url.trim())) throw new Error(`URL MCP kosong: ${name}`);
    if (server.args !== undefined && (!Array.isArray(server.args) || server.args.some((arg) => typeof arg !== 'string'))) throw new Error(`Args MCP tidak valid: ${name}`);
    if (server.enabled !== undefined && typeof server.enabled !== 'boolean') throw new Error(`enabled MCP tidak valid: ${name}`);
    if (server.headers !== undefined && (!object(server.headers) || Object.values(server.headers).some((v) => typeof v !== 'string'))) throw new Error(`Headers MCP tidak valid: ${name}`);
    if (server.env !== undefined && (!object(server.env) || Object.values(server.env).some((v) => typeof v !== 'string'))) throw new Error(`Env MCP tidak valid: ${name}`);
  }
  checkSecrets(mcp);
}

async function sourceFiles(root, prefix = '') {
  const result = new Map();
  const entries = await readdir(join(root, prefix), { withFileTypes: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const name = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isSymbolicLink()) throw new Error(`Symlink sumber ditolak: ${name}`);
    if (entry.isDirectory()) {
      for (const [path, bytes] of await sourceFiles(root, name)) result.set(path, bytes);
    } else if (entry.isFile()) {
      managedPath(name);
      result.set(name, await readFile(join(root, name)));
    } else throw new Error(`Jenis berkas sumber tidak didukung: ${name}`);
  }
  return result;
}

export async function loadBundle(options) {
  const source = resolve(options.source || bundledSource);
  const manifest = JSON.parse(await readFile(join(source, 'manifest.json'), 'utf8'));
  for (const key of ['version', 'ompVersion', 'context7Version']) {
    if (typeof manifest[key] !== 'string' || !/^\d+\.\d+\.\d+(?:-[\w.-]+)?$/.test(manifest[key])) throw new Error(`Versi manifest tidak valid: ${key}`);
  }
  await guardPath(source, 'agent');
  const files = await sourceFiles(join(source, 'agent'));
  if (!files.has('config.yml') || !files.has('mcp.json')) throw new Error('Bundle membutuhkan config.yml dan mcp.json.');
  let settings = mapping(files.get('config.yml').toString(), 'config.yml');
  let mcp = mapping(files.get('mcp.json').toString(), 'mcp.json');
  if (files.has('models.yml')) checkSecrets(mapping(files.get('models.yml').toString(), 'models.yml'));
  if (options.local) {
    const local = mapping(await readFile(resolve(options.local), 'utf8'), 'Konfigurasi lokal');
    if (Object.keys(local).some((key) => !['settings', 'mcp'].includes(key))) throw new Error('Konfigurasi lokal hanya menerima settings dan mcp.');
    if (local.settings !== undefined) {
      if (!object(local.settings)) throw new Error('settings lokal harus berupa mapping.');
      settings = merge(settings, local.settings);
    }
    if (local.mcp !== undefined) {
      if (!object(local.mcp)) throw new Error('mcp lokal harus berupa mapping.');
      mcp = merge(mcp, local.mcp);
    }
  }
  checkSecrets(settings);
  validateMcp(mcp);
  files.set('config.yml', Buffer.from(stringify(settings)));
  files.set('mcp.json', Buffer.from(JSON.stringify(mcp, null, 2) + '\n'));
  return { source, manifest, files, settings, mcp };
}

export async function readState(target) {
  const bytes = await bytesAt(target, `${control}/state.json`);
  if (!bytes) return null;
  const state = JSON.parse(bytes);
  if (state.schema !== 1 || !object(state.files)) throw new Error('State installer tidak valid.');
  for (const [path, hash] of Object.entries(state.files)) {
    managedPath(path);
    if (typeof hash !== 'string' || !/^[a-f0-9]{64}$/.test(hash)) throw new Error('Hash state tidak valid.');
  }
  return state;
}

async function atomicWrite(path, bytes) {
  const temp = `${path}.${randomUUID()}.tmp`;
  await mkdir(dirname(path), { recursive: true });
  try {
    await writeFile(temp, bytes, { flag: 'wx', mode: 0o600 });
    await rename(temp, path);
  } finally { await rm(temp, { force: true }); }
}

export async function install(command, options) {
  const target = targetDirectory(options);
  const bundle = await loadBundle(options);
  await guardPath(target, control);
  let locked = false;
  const lock = join(target, control, 'lock');
  if (!options.dryRun) {
    await mkdir(join(target, control), { recursive: true });
    try { await mkdir(lock); locked = true; }
    catch (error) {
      if (error.code === 'EEXIST') throw new Error(`Installer lain aktif atau lock tersisa: ${lock}`);
      throw error;
    }
  }
  try {
    const state = await readState(target);
    if (command === 'update' && !state) throw new Error('Target belum dikelola. Jalankan init terlebih dahulu.');
    const paths = new Set([...Object.keys(state?.files || {}), ...bundle.files.keys()]);
    const changes = [];
    for (const name of [...paths].sort()) {
      managedPath(name);
      const before = await bytesAt(target, name);
      const after = bundle.files.get(name) ?? null;
      const previous = state?.files[name];
      if (previous && (!before || digest(before) !== previous)) throw new Error(`Perubahan lokal ditemukan: ${name}. Pindahkan perubahan ke sumber atau overlay lokal terlebih dahulu.`);
      if (!previous && before && !options.adopt) throw new Error(`Berkas belum dikelola: ${name}. Gunakan init --adopt untuk mengambil alih dengan cadangan.`);
      if ((before && after && before.equals(after)) || (!before && !after)) continue;
      changes.push({ name, before, after });
    }
    // config.yaml shadows/migrates differently between OMP versions. Do not silently leave it behind.
    if (await stat(join(target, 'config.yaml'))) throw new Error('config.yaml sudah ada. Migrasikan secara eksplisit ke config.yml sebelum instalasi.');
    const result = { target, version: bundle.manifest.version, changes: changes.map(({ name, after }) => ({ path: name, action: after ? 'write' : 'remove' })), dryRun: !!options.dryRun, backup: null };
    if (options.dryRun || (changes.length === 0 && state?.version === bundle.manifest.version)) return result;
    const backup = `${control}/backups/${randomUUID()}`;
    await guardPath(target, backup);
    const backupMetadata = { schema: 1, previousState: state, files: {} };
    for (const { name, before } of changes) {
      backupMetadata.files[name] = before ? 'restore' : 'remove';
      if (before) await atomicWrite(join(target, backup, 'files', name), before);
    }
    await atomicWrite(join(target, backup, 'backup.json'), JSON.stringify(backupMetadata, null, 2) + '\n');
    const applied = [];
    try {
      for (const change of changes) {
        await guardPath(target, change.name);
        // Catch edits made after preflight, before touching this particular file.
        const current = await bytesAt(target, change.name);
        if (!(current === null && change.before === null) && !(current && change.before && current.equals(change.before))) throw new Error(`Berkas berubah selama instalasi: ${change.name}`);
        if (change.after) await atomicWrite(join(target, change.name), change.after);
        else await rm(join(target, change.name));
        applied.push(change);
      }
      const next = { schema: 1, version: bundle.manifest.version, source: bundle.source, files: Object.fromEntries([...bundle.files].map(([name, bytes]) => [name, digest(bytes)])) };
      await atomicWrite(join(target, control, 'state.json'), JSON.stringify(next, null, 2) + '\n');
    } catch (error) {
      for (const { name, before } of applied.reverse()) {
        if (before) await atomicWrite(join(target, name), before);
        else await rm(join(target, name), { force: true });
      }
      throw new Error(`Instalasi dibatalkan. Cadangan: ${join(target, backup)}`, { cause: error });
    }
    result.backup = join(target, backup);
    return result;
  } finally {
    if (locked) await rm(lock, { recursive: true });
  }
}

export async function drift(target, state) {
  const changed = [];
  for (const [name, hash] of Object.entries(state.files)) {
    const bytes = await bytesAt(target, name);
    if (!bytes || digest(bytes) !== hash) changed.push(name);
  }
  return changed;
}
