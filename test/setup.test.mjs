import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm, symlink, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { parse } from 'yaml';
import { install, loadBundle, targetDirectory } from '../lib/setup.mjs';

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'omp-setup-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const source = join(root, 'bundle');
  const target = join(root, 'agent');
  await mkdir(join(source, 'agent', 'skills', 'sample'), { recursive: true });
  await mkdir(join(source, 'agent', 'agents'), { recursive: true });
  await writeFile(join(source, 'manifest.json'), JSON.stringify({ version: '1.0.0', ompVersion: '18.19.0', context7Version: '0.11.1' }));
  await writeFile(join(source, 'agent', 'config.yml'), 'tools:\n  approvalMode: write\ncycleOrder: [smol, default]\n');
  await writeFile(join(source, 'agent', 'mcp.json'), JSON.stringify({ mcpServers: { context7: { type: 'http', url: 'https://mcp.context7.com/mcp' } } }));
  await writeFile(join(source, 'agent', 'skills', 'sample', 'SKILL.md'), '---\nname: sample\ndescription: A sample skill.\n---\nRead documentation.\n');
  await writeFile(join(source, 'agent', 'skills', 'sample', 'asset.bin'), Buffer.from([0, 1, 255, 128]));
  await writeFile(join(source, 'agent', 'agents', 'sample.md'), '---\nname: sample\ndescription: A sample agent.\n---\nReview assigned work.\n');
  return { root, source, target };
}

async function absent(path) {
  await assert.rejects(readFile(path), { code: 'ENOENT' });
}

test('profile selection isolates named profiles and respects explicit default', () => {
  const env = { OMP_PROFILE: 'work', PI_PROFILE: 'legacy', PI_CODING_AGENT_DIR: join(tmpdir(), 'custom') };
  assert.equal(targetDirectory({}, env, tmpdir()), join(tmpdir(), '.omp', 'profiles', 'work', 'agent'));
  assert.equal(targetDirectory({ profile: 'default' }, env, tmpdir()), env.PI_CODING_AGENT_DIR);
  assert.equal(targetDirectory({}, { OMP_PROFILE: '', PI_PROFILE: 'legacy' }, tmpdir()), join(tmpdir(), '.omp', 'agent'));
  assert.throws(() => targetDirectory({ profile: '../outside' }, {}, tmpdir()), /Nama profile/);
});

test('dry run does not create target or state', async (t) => {
  const options = await fixture(t);
  const result = await install('init', { ...options, dryRun: true });
  assert.equal(result.changes.some((change) => change.path === 'config.yml'), true);
  await absent(join(options.target, 'config.yml'));
  await absent(join(options.target, '.omp-setup', 'state.json'));
  await assert.rejects(readdir(options.target), { code: 'ENOENT' });
});

test('init copies binary assets and preserves auth, sessions and unrelated files', async (t) => {
  const options = await fixture(t);
  await mkdir(join(options.target, 'sessions'), { recursive: true });
  await writeFile(join(options.target, 'agent.db'), 'private auth');
  await writeFile(join(options.target, '.env'), 'KEY=private');
  await writeFile(join(options.target, 'sessions', 'session.jsonl'), 'private conversation');
  await writeFile(join(options.target, 'personal.md'), 'unmanaged');
  await install('init', options);
  assert.deepEqual(await readFile(join(options.target, 'skills', 'sample', 'asset.bin')), Buffer.from([0, 1, 255, 128]));
  assert.equal(await readFile(join(options.target, 'agent.db'), 'utf8'), 'private auth');
  assert.equal(await readFile(join(options.target, '.env'), 'utf8'), 'KEY=private');
  assert.equal(await readFile(join(options.target, 'sessions', 'session.jsonl'), 'utf8'), 'private conversation');
  assert.equal(await readFile(join(options.target, 'personal.md'), 'utf8'), 'unmanaged');
  assert.deepEqual((await install('update', options)).changes, []);
});

test('adoption requires explicit opt-in and backs up original content', async (t) => {
  const options = await fixture(t);
  await mkdir(options.target);
  await writeFile(join(options.target, 'config.yml'), 'theme:\n  dark: personal\n');
  await assert.rejects(install('init', options), /belum dikelola/);
  assert.equal(await readFile(join(options.target, 'config.yml'), 'utf8'), 'theme:\n  dark: personal\n');
  const result = await install('init', { ...options, adopt: true });
  assert.equal(await readFile(join(result.backup, 'files', 'config.yml'), 'utf8'), 'theme:\n  dark: personal\n');
  const backup = JSON.parse(await readFile(join(result.backup, 'backup.json'), 'utf8'));
  assert.equal(backup.previousState, null);
  assert.equal(backup.files['config.yml'], 'restore');
});

test('update writes new configuration, removes obsolete managed resources and retains backups', async (t) => {
  const options = await fixture(t);
  await install('init', options);
  await writeFile(join(options.source, 'agent', 'config.yml'), 'tools:\n  approvalMode: read\n');
  await rm(join(options.source, 'agent', 'skills', 'sample', 'asset.bin'));
  const result = await install('update', options);
  assert.equal(parse(await readFile(join(options.target, 'config.yml'), 'utf8')).tools.approvalMode, 'read');
  await absent(join(options.target, 'skills', 'sample', 'asset.bin'));
  assert.deepEqual(await readFile(join(result.backup, 'files', 'skills', 'sample', 'asset.bin')), Buffer.from([0, 1, 255, 128]));
});

test('local drift blocks the whole update before any managed file changes', async (t) => {
  const options = await fixture(t);
  await install('init', options);
  const original = await readFile(join(options.target, 'config.yml'));
  await writeFile(join(options.target, 'skills', 'sample', 'SKILL.md'), 'local user edit');
  await writeFile(join(options.source, 'agent', 'config.yml'), 'tools:\n  approvalMode: read\n');
  await assert.rejects(install('update', options), /Perubahan lokal/);
  assert.deepEqual(await readFile(join(options.target, 'config.yml')), original);
  assert.equal(await readFile(join(options.target, 'skills', 'sample', 'SKILL.md'), 'utf8'), 'local user edit');
});

test('locally deleted managed resources also block update', async (t) => {
  const options = await fixture(t);
  await install('init', options);
  await rm(join(options.target, 'agents', 'sample.md'));
  await assert.rejects(install('update', options), /Perubahan lokal/);
});

test('local overlays deep-merge mappings, replace arrays and preserve environment references', async (t) => {
  const options = await fixture(t);
  const local = join(options.root, 'host.local.yml');
  await writeFile(local, 'settings:\n  tools:\n    approvalMode: read\n  cycleOrder: [default]\nmcp:\n  mcpServers:\n    context7:\n      headers:\n        CONTEXT7_API_KEY: "${CONTEXT7_API_KEY}"\n');
  await install('init', { ...options, local });
  const settings = parse(await readFile(join(options.target, 'config.yml'), 'utf8'));
  assert.equal(settings.tools.approvalMode, 'read');
  assert.deepEqual(settings.cycleOrder, ['default']);
  const mcp = JSON.parse(await readFile(join(options.target, 'mcp.json'), 'utf8'));
  assert.equal(mcp.mcpServers.context7.url, 'https://mcp.context7.com/mcp');
  assert.equal(mcp.mcpServers.context7.headers.CONTEXT7_API_KEY, '${CONTEXT7_API_KEY}');
});

test('literal credentials are rejected before target writes', async (t) => {
  const options = await fixture(t);
  await writeFile(join(options.source, 'agent', 'mcp.json'), JSON.stringify({ mcpServers: { example: { type: 'http', url: 'https://example.com/mcp', headers: { Authorization: 'Bearer example-credential' } } } }));
  await assert.rejects(install('init', options), /Kredensial literal/);
  await absent(join(options.target, 'mcp.json'));
});

test('malformed MCP configuration fails before adoption overwrites anything', async (t) => {
  const options = await fixture(t);
  await mkdir(options.target);
  await writeFile(join(options.target, 'config.yml'), 'personal: true\n');
  await writeFile(join(options.source, 'agent', 'mcp.json'), JSON.stringify({ mcpServers: { broken: { type: 'stdio', url: 'https://example.com/mcp' } } }));
  await assert.rejects(install('init', { ...options, adopt: true }), /Command MCP kosong/);
  assert.equal(await readFile(join(options.target, 'config.yml'), 'utf8'), 'personal: true\n');
});

test('tampered state cannot write outside managed target paths', async (t) => {
  const options = await fixture(t);
  await install('init', options);
  const statePath = join(options.target, '.omp-setup', 'state.json');
  const state = JSON.parse(await readFile(statePath, 'utf8'));
  state.files['../outside.txt'] = 'a'.repeat(64);
  await writeFile(statePath, JSON.stringify(state));
  await assert.rejects(install('update', options), /Path berkas tidak aman/);
  await absent(join(options.root, 'outside.txt'));
});

test('target junctions and symlinks cannot redirect writes', async (t) => {
  const options = await fixture(t);
  const outside = join(options.root, 'outside');
  await mkdir(outside);
  await symlink(outside, options.target, process.platform === 'win32' ? 'junction' : 'dir');
  await assert.rejects(install('init', options), /Symlink\/junction ditolak/);
  assert.deepEqual(await readdir(outside), []);
});

test('legacy config.yaml is not silently shadowed', async (t) => {
  const options = await fixture(t);
  await mkdir(options.target);
  await writeFile(join(options.target, 'config.yaml'), 'personal: true\n');
  await assert.rejects(install('init', { ...options, adopt: true }), /config.yaml sudah ada/);
  await absent(join(options.target, 'config.yml'));
});

test('uninitialized update cannot become an implicit installation', async (t) => {
  const options = await fixture(t);
  await assert.rejects(install('update', options), /belum dikelola/);
  await absent(join(options.target, 'config.yml'));
});

test('unknown local keys and unsafe source resources fail before deployment', async (t) => {
  const options = await fixture(t);
  const local = join(options.root, 'host.local.yml');
  await writeFile(local, 'setting:\n  theme: dark\n');
  await assert.rejects(loadBundle({ ...options, local }), /hanya menerima settings dan mcp/);
  await writeFile(join(options.source, 'agent', 'skills', 'sample', '.env'), 'PRIVATE=secret');
  await assert.rejects(loadBundle(options), /Berkas rahasia\/runtime ditolak/);
});

test('custom providers retain environment references and reject literal API keys', async (t) => {
  const options = await fixture(t);
  const source = join(options.source, 'agent', 'models.yml');
  const safe = 'providers:\n  personal:\n    apiKey: PERSONAL_API_KEY\n    baseUrl: https://example.com/v1\n';
  await writeFile(source, safe);
  await install('init', options);
  assert.equal(await readFile(join(options.target, 'models.yml'), 'utf8'), safe);
  await writeFile(source, 'providers:\n  personal:\n    apiKey: example-private-value\n');
  await assert.rejects(install('update', options), /Kredensial literal/);
  assert.equal(await readFile(join(options.target, 'models.yml'), 'utf8'), safe);
});
