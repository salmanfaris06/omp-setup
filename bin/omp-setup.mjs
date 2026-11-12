#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { install } from '../lib/setup.mjs';
import { doctor } from '../lib/doctor.mjs';

const help = `omp-setup <init|update|doctor> [opsi]

init       Pasang konfigurasi bersama dari bundle paket.
update     Terapkan bundle baru; hentikan jika ada perubahan lokal.
doctor     Periksa runtime, konfigurasi, skills, agen, dan MCP.

--target <direktori>  Direktori agent OMP eksplisit (aman untuk sandbox).
--profile <nama>      Profile OMP; default mengikuti environment OMP.
--source <direktori>  Bundle alternatif berisi manifest.json dan agent/.
--local <berkas>      Overlay YAML/JSON: settings dan mcp; tetap lokal.
--dry-run             Tampilkan rencana init/update tanpa menulis.
--adopt               Khusus init: ambil alih berkas lama dengan cadangan.
--online              Khusus doctor: jalankan MCP dan periksa Context7 CLI.
--json                Cetak hasil JSON.
--help                Tampilkan bantuan.

Tidak memasang OMP atau binary MCP, menerbitkan npm, atau menyalin kredensial.
Context7 CLI memakai npx on demand; Context7 MCP dikonfigurasi dalam bundle.
`;

try {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      target: { type: 'string' }, profile: { type: 'string' }, source: { type: 'string' }, local: { type: 'string' },
      'dry-run': { type: 'boolean' }, adopt: { type: 'boolean' }, online: { type: 'boolean' }, json: { type: 'boolean' }, help: { type: 'boolean', short: 'h' },
    },
  });
  if (values.help || positionals.length === 0) console.log(help);
  else {
    const [command] = positionals;
    if (positionals.length !== 1 || !['init', 'update', 'doctor'].includes(command)) throw new Error('Perintah tidak valid. Gunakan --help.');
    if (values.target && values.profile) throw new Error('Pilih --target atau --profile, bukan keduanya.');
    if (values.adopt && command !== 'init') throw new Error('--adopt hanya berlaku untuk init.');
    if (values.online && command !== 'doctor') throw new Error('--online hanya berlaku untuk doctor.');
    if (values['dry-run'] && command === 'doctor') throw new Error('--dry-run hanya berlaku untuk init/update.');
    const options = { ...values, dryRun: values['dry-run'] };
    const result = command === 'doctor' ? await doctor(options) : await install(command, options);
    if (values.json) console.log(JSON.stringify(result, null, 2));
    else {
      console.log(`Target: ${result.target}`);
      console.log(`Konfigurasi: ${result.version ?? 'belum terpasang'}`);
      if (command === 'doctor') {
        for (const check of result.checks) console.log(`[${check.status.toUpperCase()}] ${check.name}: ${check.detail}`);
      } else {
        console.log(`${result.dryRun ? 'Rencana' : 'Selesai'}: ${result.changes.length} perubahan.`);
        if (result.dryRun) for (const change of result.changes) console.log(`  ${change.action}: ${change.path}`);
        if (result.backup) console.log(`Cadangan: ${result.backup}`);
        console.log('Kredensial dan data sesi tetap lokal. Mulai ulang OMP untuk memuat seluruh definisi baru.');
      }
    }
    if (result.ok === false) process.exitCode = 1;
  }
} catch (error) {
  const messages = [];
  for (let current = error; current; current = current.cause) messages.push(current.message);
  console.error(`Gagal: ${messages.join(' ')}`);
  process.exitCode = 1;
}
