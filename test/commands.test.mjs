import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { run } from '../lib/doctor.mjs';

test('command runner chooses a runnable shim when npm-style extensionless files coexist', async (t) => {
  const root = await mkdtemp(join(tmpdir(), 'omp setup command-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  if (process.platform === 'win32') {
    await writeFile(join(root, 'example'), '#!/bin/sh\necho wrong-shim\n');
    await writeFile(join(root, 'example.cmd'), '@echo off\r\necho correct-shim\r\n');
  } else {
    await writeFile(join(root, 'example'), '#!/bin/sh\nprintf "correct-shim\\n"\n', { mode: 0o755 });
  }
  const output = await run('example', [], { ...process.env, PATH: root });
  assert.equal(output, 'correct-shim');
});
