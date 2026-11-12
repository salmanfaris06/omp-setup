# omp-setup

CLI pribadi untuk menyamakan konfigurasi OMP pada Windows dan Linux. Satu sumber di repositori privat. Pembaruan dilakukan manual. Autentikasi, sesi, database, cache, dan binary MCP tetap lokal.

## Prasyarat

- Node.js 22+ dan npm/npx.
- OMP 18.19.0, yaitu versi acuan bundle pertama. CLI tidak memasang atau memperbarui OMP.
- Akses Git SSH ke repositori privat ini.
- `codebase-memory-mcp` pada PATH untuk MCP yang aktif. Jika lokasinya berbeda, tetapkan `CODEBASE_MEMORY_COMMAND` pada environment host.

## Jalankan langsung dengan npx

Tidak perlu menerbitkan paket npm. npm dapat menjalankan paket dari repositori Git privat melalui SSH:

```sh
npx --package=git+ssh://git@github.com/salmanfaris06/omp-setup.git#main omp-setup init --dry-run
npx --package=git+ssh://git@github.com/salmanfaris06/omp-setup.git#main omp-setup init
```

`#main` mengikuti branch dan tidak menjamin semua host memakai revisi yang sama. Untuk pemasangan konsisten, ganti `main` dengan SHA commit yang sama pada semua host. npm dapat meminta konfirmasi unduhan; tinjau paket sebelum menyetujuinya.

Tidak ada paket registry `@salmanfaris06/omp-setup` yang diterbitkan. `private: true` mencegah publikasi npm yang tidak disengaja. Akses GitHub privat dan autentikasi npm registry adalah dua hal berbeda.

## Jalankan dari clone

```sh
git clone git@github.com:salmanfaris06/omp-setup.git
cd omp-setup
npm ci --ignore-scripts
node bin/omp-setup.mjs init --dry-run
node bin/omp-setup.mjs init
```

Untuk target yang telah berisi berkas konfigurasi, `init` berhenti. Gunakan `init --adopt` hanya setelah meninjau rencana. CLI membuat cadangan sebelum mengambil alih berkas. `config.yaml` harus dimigrasikan secara eksplisit ke `config.yml` terlebih dahulu.

### Profile dan sandbox

```sh
node bin/omp-setup.mjs init --profile work
node bin/omp-setup.mjs init --target ./sandbox-agent
```

Tanpa opsi tersebut, CLI mengikuti `OMP_PROFILE`, lalu `PI_PROFILE`, `PI_CONFIG_DIR`, dan `PI_CODING_AGENT_DIR` sesuai aturan profile OMP. Profile bernama tidak memakai `PI_CODING_AGENT_DIR`. `--target` dan `--profile` tidak dapat digabung.

### Pengecualian host

Salin `examples/host.yml` ke `host.local.yml`, lalu sesuaikan. Hapus bagian API key jika tidak diperlukan.

```sh
node bin/omp-setup.mjs init --local ./host.local.yml
node bin/omp-setup.mjs update --local ./host.local.yml
```

Overlay hanya menerima `settings` dan `mcp`. Mapping digabung rekursif; scalar dan array menggantikan nilai lama. Berikan overlay yang sama setiap pembaruan. Jika opsi `--local` dihilangkan, konfigurasi kembali ke bundle bersama. Path overlay tidak disimpan atau dimasukkan ke Git.

Gunakan `${VARIABLE}` atau `${VARIABLE:-default}` di definisi MCP untuk path dan token host. Nilainya tetap berupa referensi dalam berkas hasil, bukan token yang diekspansi. OMP melakukan ekspansi saat memuat MCP. Rahasia literal pada key kredensial ditolak; pemeriksaan ini bukan pengganti peninjauan manual seluruh bundle.

## Pembaruan

Ubah hanya sumber utama di `bundle/`, lalu kirim commit baru. Pada host tujuan:

```sh
git pull --ff-only
npm ci --ignore-scripts
node bin/omp-setup.mjs update --dry-run
node bin/omp-setup.mjs update
node bin/omp-setup.mjs doctor
```

Untuk mode npx, jalankan `update` dengan SHA commit baru. `update` menerapkan bundle yang sedang dijalankan; perintah itu tidak melakukan Git pull sendiri.

- Hash pada `.omp-setup/state.json` melindungi berkas yang dikelola dari penimpaan perubahan lokal.
- Berkas lama yang dihapus dari bundle juga dihapus dari target, setelah cadangan dibuat.
- Berkas yang tidak dikelola tidak disentuh.
- Kegagalan penulisan memulihkan berkas yang sudah diubah pada transaksi tersebut.
- Lock mencegah dua installer menulis bersamaan. Setelah crash, periksa proses installer sebelum menghapus direktori lock yang tertinggal.
- Mulai ulang OMP untuk memuat semua skills, agen, dan instruksi baru. `/mcp reload` hanya memuat ulang MCP.

Perubahan melalui `/settings` menimbulkan drift pada `config.yml`. Pindahkan perubahan itu ke sumber atau overlay lokal, lalu pulihkan berkas target ke versi terakhir sebelum menjalankan update. Tidak ada opsi force yang mengabaikan drift.

### Cadangan dan pemulihan

Setiap transaksi menyimpan berkas sebelumnya pada `<target>/.omp-setup/backups/<id>/files/` dan metadata pada `backup.json`. Cadangan bisa berisi konfigurasi lokal lama yang sensitif; jangan unggah folder ini.

Untuk kembali ke versi konfigurasi lama tanpa drift, jalankan installer dari SHA lama dengan `update`. Untuk memulihkan pengambilalihan awal, tutup OMP, pulihkan berkas bertanda `restore` dari `files/`, hapus hanya berkas bertanda `remove`, lalu pulihkan `previousState` sebagai `.omp-setup/state.json`. Jika `previousState` null, hapus state tersebut. Jangan hapus data OMP lainnya.

## MCP dan Context7

Bundle memuat:

- `codebase-memory`: aktif, memakai executable host atau `CODEBASE_MEMORY_COMMAND`.
- `context7`: aktif, Streamable HTTP ke `https://mcp.context7.com/mcp`, tanpa token bawaan.
- `pencil` dan `rea`: nonaktif, sesuai konfigurasi sumber. Aktifkan melalui overlay setelah dependensinya tersedia.

Context7 CLI dijalankan on demand; instalasi global tidak diperlukan:

```sh
npx ctx7@0.11.1 library "Next.js" "App Router metadata"
npx ctx7@0.11.1 docs /vercel/next.js "App Router metadata"
npx ctx7@0.11.1 login
```

Login CLI bersifat opsional untuk batas penggunaan lebih tinggi. Login CLI tidak otomatis memasok kredensial ke MCP. Untuk API key MCP, gunakan environment `CONTEXT7_API_KEY` dan overlay contoh. Jangan memasukkan API key sebagai argumen yang tersimpan di shell history.

## Diagnosis

```sh
node bin/omp-setup.mjs doctor
node bin/omp-setup.mjs doctor --online
node bin/omp-setup.mjs doctor --json
```

Mode biasa memeriksa runtime, hash, syntax konfigurasi, metadata skills/agen, executable MCP, dan referensi environment. Mode tersebut tidak membuktikan koneksi atau discovery efektif OMP. Konfigurasi project dan sumber asing masih dapat menimpa definisi user.

`--online` menjalankan MCP stdio yang aktif dan mengirim `initialize` serta `tools/list` ke MCP HTTP yang aktif. Mode ini juga menjalankan `npx ctx7@0.11.1 --version`; npm dapat mengunduh paket. Gunakan hanya pada konfigurasi tepercaya. Tidak ada browser OAuth yang dibuka otomatis. MCP SSE lama atau secret command `!command` perlu diuji memakai `/mcp test <nama>` di OMP. Pemeriksaan versi OMP menandai versi selain acuan sebagai error kompatibilitas, bukan bukti bahwa versi itu pasti rusak.

Di OMP, gunakan `/mcp list`, `/mcp test codebase-memory`, `/mcp test context7`, dan panel skills/agen untuk memeriksa discovery efektif. Autentikasi provider model tetap dilakukan pada masing-masing host.

## Isi bundle awal

104 skills, empat agen khusus, satu command, aturan bahasa/keamanan, instruksi Context7, serta settings dari instalasi sumber. Skill dengan nama sama dipilih berurutan dari native OMP, `.agents`, lalu `.agent`. Resource skill ikut disalin; direktori Git, dependency, virtualenv, `.env`, dan database tidak disalin. Lisensi dan atribusi resource dipertahankan.

Perubahan sanitasi: `approvalMode` menjadi `write`; `setupVersion` dan persetujuan auto-QA dibuang; path executable Windows MCP diganti referensi environment/nama executable. `models.yml` mempertahankan provider tambahan dengan referensi `ALPHARIZE_API_KEY` dan `ATRIA_API_KEY`, tanpa nilainya. Extension khusus Orca dan `lsp.json` khusus Windows tidak disalin. Kredensial provider dan consent harus disiapkan pada host masing-masing.

## Pengembangan

```sh
npm ci --ignore-scripts
npm test
npm pack
```

Pengujian memakai direktori sementara, bukan direktori OMP aktif. Tidak ada server lokal atau browser yang dijalankan oleh suite default. GitHub Actions menjalankan suite dan smoke paket npx pada Windows serta Linux.

Referensi: [OMP settings](https://github.com/can1357/oh-my-pi/blob/main/docs/settings.md), [OMP MCP](https://github.com/can1357/oh-my-pi/blob/main/docs/mcp-config.md), [Context7](https://github.com/upstash/context7).
