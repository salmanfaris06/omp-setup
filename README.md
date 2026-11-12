# omp-setup

Samakan konfigurasi **Oh My Pi (OMP)** pada Windows dan Linux melalui satu CLI. Simpan konfigurasi nonrahasia di repositori privat, lalu terapkan versi yang sama pada setiap host.

[Mulai cepat](#mulai-cepat) · [Perintah](#referensi-perintah) · [Konfigurasi host](#konfigurasi-host) · [Pembaruan](#pembaruan) · [Troubleshooting](#diagnosis-dan-troubleshooting)

## Fitur dan batas

- Pasang settings, provider tambahan, 104 skills, empat agen khusus, satu command, dan instruksi pengguna.
- Konfigurasikan MCP serta penggunaan Context7 CLI tanpa instalasi global.
- Pisahkan konfigurasi bersama dari pengecualian host melalui overlay lokal.
- Lindungi berkas dengan hash, cadangan, lock, dan pemulihan saat penulisan gagal.
- Periksa instalasi melalui `doctor`, dengan pengujian koneksi opsional.

CLI ini **tidak memasang OMP atau binary MCP**, tidak melakukan sinkronisasi otomatis, dan tidak memindahkan autentikasi, sesi, database, atau cache. Paket tersedia melalui npm atau URL Git.

## Prasyarat

| Kebutuhan | Keterangan |
| --- | --- |
| Node.js | Versi 22 atau lebih baru, dengan npm/npx |
| Git dan akses repo | Hanya untuk clone atau instalasi melalui Git; akses SSH ke `salmanfaris06/omp-setup` diperlukan |
| OMP | Versi acuan bundle: `18.19.0`; harus tersedia pada `PATH` |
| MCP lokal | `codebase-memory-mcp` pada `PATH`, atau tetapkan `CODEBASE_MEMORY_COMMAND` |
| Autentikasi | Siapkan akun provider model dan secret yang diperlukan pada masing-masing host |

Jalankan perintah dengan akun pengguna OMP. Pastikan akun tersebut dapat menulis ke direktori target.

## Mulai cepat

### Jalankan melalui npx

Jalankan paket npm tanpa instalasi global. Contoh ini memakai versi yang sama pada setiap host:

```sh
npx @salmanfaris06/omp-setup@0.1.0 init --profile shared --dry-run
npx @salmanfaris06/omp-setup@0.1.0 init --profile shared
npx @salmanfaris06/omp-setup@0.1.0 doctor --profile shared
omp --profile shared
```

Tinjau rencana dari perintah `--dry-run` sebelum menerapkan instalasi.

Untuk menjalankan langsung dari repositori Git tanpa melalui registry npm:

```sh
npx --package=git+ssh://git@github.com/salmanfaris06/omp-setup.git omp-setup init --profile shared
```

Untuk memasang pada profile default, ganti `--profile shared` dengan `--profile default` pada perintah installer. Jalankan OMP dengan profile yang sama.

### Publikasi paket npm

Publikasi memerlukan akun npm yang memiliki akses ke scope `@salmanfaris06` dan verifikasi 2FA. Atur security key melalui [pengaturan 2FA npm](https://www.npmjs.com/settings), lalu login dengan `npm login`.

Isi paket yang diterbitkan bersifat publik, meskipun repositori Git privat. Sebelum menerbitkan, tinjau isi bundle, lisensi, dan hasil `npm pack --dry-run`. Jangan sertakan secret atau data pribadi.

Di root clone, periksa nama, versi, dan executable, lalu terbitkan:

```sh
npm pkg get name version bin
npm pack --dry-run
npm publish --access public
```

Jika versi sudah di-stage, tinjau dan setujui versi tersebut melalui tab **Staged Packages** di npmjs.com, atau gunakan:

```sh
npm stage list @salmanfaris06/omp-setup
npm stage approve <stage-id>
```

Persetujuan memerlukan 2FA. Jika daftar staging kosong, periksa registry sebelum mencoba menerbitkan lagi. Versi tersebut mungkin sudah disetujui. Lihat [panduan staged publishing npm](https://docs.npmjs.com/staged-publishing/).

Verifikasi versi yang diterbitkan dan field `bin` sebelum menjalankannya pada host lain:

```sh
npm view @salmanfaris06/omp-setup@0.1.0 version bin --json
```

Ganti `0.1.0` dengan versi yang diterbitkan. Gunakan versi baru untuk setiap rilis.


### Jalankan dari clone

Gunakan cara ini untuk mengubah sumber konfigurasi atau memakai contoh overlay dalam repo:

```sh
git clone git@github.com:salmanfaris06/omp-setup.git
cd omp-setup
npm ci --ignore-scripts
node bin/omp-setup.mjs init --profile shared --dry-run
node bin/omp-setup.mjs init --profile shared
node bin/omp-setup.mjs doctor --profile shared
```

Contoh berikutnya dijalankan dari root clone. Gunakan `--profile shared` secara konsisten. Jika memakai profile lain, ganti nama tersebut pada setiap perintah.

### Ambil alih konfigurasi lama

`init` menolak berkas tujuan yang sudah ada tetapi belum dikelola installer. Untuk mengambil alih:

```sh
node bin/omp-setup.mjs init --profile default --adopt --dry-run
node bin/omp-setup.mjs init --profile default --adopt
```

> [!WARNING]
> `--adopt` dapat mengganti settings, skills, atau definisi MCP yang namanya sama. Tinjau rencana dan tutup OMP sebelum menerapkannya. Installer mencadangkan berkas yang diganti. Jika target memiliki `config.yaml`, migrasikan berkas tersebut ke `config.yml` terlebih dahulu.

## Referensi perintah

```text
omp-setup <init|update|doctor> [opsi]
```

| Perintah | Fungsi |
| --- | --- |
| `init` | Mulai mengelola target dan pasang bundle |
| `update` | Terapkan bundle pada target yang sudah dikelola; berhenti jika ada perubahan lokal |
| `doctor` | Periksa runtime, hash berkas, syntax konfigurasi, metadata skills/agen, dan prasyarat MCP |

| Opsi | Berlaku untuk | Fungsi |
| --- | --- | --- |
| `--target <direktori>` | Semua | Gunakan direktori agent eksplisit, misalnya sandbox |
| `--profile <nama>` | Semua | Pilih profile OMP; tidak dapat digabung dengan `--target` |
| `--source <direktori>` | Semua | Baca bundle alternatif yang berisi `manifest.json` dan `agent/` |
| `--local <berkas>` | Semua | Baca overlay YAML/JSON dengan key `settings` dan `mcp` |
| `--dry-run` | `init`, `update` | Tampilkan rencana tanpa menulis ke target |
| `--adopt` | `init` | Ambil alih berkas lama dengan cadangan |
| `--online` | `doctor` | Jalankan MCP aktif, uji koneksi, dan periksa Context7 CLI |
| `--json` | Semua | Cetak hasil dalam JSON |
| `--help`, `-h` | Semua | Tampilkan bantuan |

Kesalahan perintah atau pemeriksaan `doctor` menghasilkan exit code `1`. Tidak ada opsi force untuk mengabaikan perubahan lokal.

## Konfigurasi host

### Lokasi target

Tanpa opsi atau environment khusus, profile default memakai `~/.omp/agent`. Profile bernama memakai `~/.omp/profiles/<nama>/agent`. Pada Windows, `~` berarti direktori home pengguna.

Urutan pilihan profile: `--profile`, `OMP_PROFILE`, lalu `PI_PROFILE`. Nilai `OMP_PROFILE` kosong memilih default dan tidak memakai fallback `PI_PROFILE`.

`PI_CONFIG_DIR` mengganti root `.omp`. `PI_CODING_AGENT_DIR` mengganti direktori agent profile default, tetapi diabaikan oleh profile bernama. `--target` memilih direktori secara langsung; jangan gabungkan dengan `--profile`.

Untuk mencoba tanpa menyentuh profile OMP:

```sh
node bin/omp-setup.mjs init --target ./sandbox-agent --dry-run
```

### Overlay lokal

Salin [examples/host.yml](examples/host.yml) menjadi `host.local.yml`. Nama `*.local.yml` diabaikan Git. Berkas overlay minimal dapat berupa:

```yaml
settings:
  tools:
    approvalMode: write
mcp:
  mcpServers:
    codebase-memory:
      command: "${CODEBASE_MEMORY_COMMAND:-codebase-memory-mcp}"
```

```sh
node bin/omp-setup.mjs init --profile shared --local ./host.local.yml
node bin/omp-setup.mjs update --profile shared --local ./host.local.yml
node bin/omp-setup.mjs doctor --profile shared --local ./host.local.yml
```

Mapping digabung rekursif. Scalar dan array menggantikan nilai sebelumnya. Overlay hanya menerima `settings` dan `mcp`; ubah definisi provider tambahan melalui `bundle/agent/models.yml`.

> [!NOTE]
> Installer tidak mengingat pilihan `--local`. Berikan berkas yang sama pada setiap pemasangan atau pembaruan. Jika dihilangkan, installer menerapkan nilai bundle tanpa pengecualian tersebut. Pada `doctor`, opsi ini memvalidasi sumber; pemeriksaan runtime tetap membaca konfigurasi yang sudah terpasang.

### Path executable Windows dan Linux

Jika executable tidak ada pada `PATH`, tetapkan path sesuai host sebelum menjalankan installer, doctor, dan OMP.

**Windows — PowerShell:**

```powershell
$env:CODEBASE_MEMORY_COMMAND = "$HOME\.local\bin\codebase-memory-mcp.exe"
```

**Linux — Bash:**

```bash
export CODEBASE_MEMORY_COMMAND="$HOME/.local/bin/codebase-memory-mcp"
```

Sesuaikan dengan lokasi binary yang benar. Contoh ini hanya berlaku pada terminal saat ini. Siapkan environment persisten dengan mekanisme host jika diperlukan.

## MCP dan Context7

| MCP | Status bundle | Prasyarat |
| --- | --- | --- |
| `codebase-memory` | Aktif, stdio | Executable lokal |
| `context7` | Aktif, HTTP | Akses ke `https://mcp.context7.com/mcp`; tanpa token bawaan |
| `pencil` | Nonaktif | Binary Pencil; dapat ditentukan melalui `PENCIL_MCP_COMMAND` |
| `rea` | Nonaktif | npx dan paket `rea-agents@6.7.0` saat diaktifkan |

Aktifkan MCP nonaktif melalui overlay hanya setelah dependensinya tersedia. Jangan menyalin binary Windows ke Linux.

### Context7 CLI

Versi acuan CLI adalah `0.11.1`. Instalasi global tidak diperlukan:

```sh
npx ctx7@0.11.1 library "Next.js" "App Router metadata"
npx ctx7@0.11.1 docs /vercel/next.js "App Router metadata"
npx ctx7@0.11.1 login
```

Jalankan `library` dahulu, lalu gunakan ID hasilnya pada `docs`. Login bersifat opsional untuk batas penggunaan lebih tinggi. Login CLI tidak otomatis memasok kredensial ke MCP.

### Secret dan API key

Untuk memakai API key Context7 MCP, tetapkan `CONTEXT7_API_KEY` melalui environment host atau pengelola secret, lalu tambahkan ke overlay:

```yaml
mcp:
  mcpServers:
    context7:
      headers:
        CONTEXT7_API_KEY: "${CONTEXT7_API_KEY}"
```

Installer menyimpan referensinya, bukan nilai token. OMP melakukan ekspansi `${VARIABLE}` dan `${VARIABLE:-default}` ketika memuat MCP. Jika tidak memakai API key, hilangkan bagian `headers` tersebut.

Provider tambahan dalam `models.yml` memakai referensi `ALPHARIZE_API_KEY` dan `ATRIA_API_KEY`. Siapkan hanya jika provider tersebut digunakan.

> [!CAUTION]
> Jangan commit token, `.env`, atau direktori data OMP. Pemeriksaan kredensial literal pada key tertentu bukan pemindai semua kemungkinan secret. Tinjau seluruh bundle sebelum dibagikan, termasuk dalam repo privat.

## Pembaruan

Ubah konfigurasi bersama hanya pada sumber utama di `bundle/`. Setelah perubahan masuk ke repo, jalankan pada host tujuan:

```sh
git pull --ff-only
npm ci --ignore-scripts
node bin/omp-setup.mjs update --profile shared --dry-run
node bin/omp-setup.mjs update --profile shared
node bin/omp-setup.mjs doctor --profile shared
```

Tambahkan `--local` jika host memakai overlay. Untuk cara npx, gunakan versi paket npm yang baru dan subperintah `update`, misalnya `npx @salmanfaris06/omp-setup@0.1.0 update --profile shared --dry-run`. `update` menerapkan bundle yang sedang dijalankan; perintah tersebut tidak melakukan Git pull atau memperbarui OMP.

Installer membandingkan hash pada `.omp-setup/state.json` sebelum mengubah berkas. Perubahan lokal, termasuk penghapusan berkas yang dikelola, menghentikan pembaruan. Berkas kelolaan yang dihapus dari bundle dicadangkan lalu dihapus dari target. Berkas lain tidak disentuh.

Setelah pemasangan atau pembaruan, mulai ulang OMP untuk memuat seluruh skills, agen, dan instruksi. `/mcp reload` hanya memuat ulang MCP. Konfigurasi project atau sumber lain masih dapat menimpa definisi user.

## Cadangan dan pemulihan

Transaksi yang mengubah berkas menyimpan cadangan pada `<target>/.omp-setup/backups/<id>/`. Berkas lama berada di `files/`; `backup.json` mencatat tindakan pemulihan dan `previousState`.

Untuk kembali ke versi konfigurasi sebelumnya tanpa drift, jalankan `update` dari SHA lama atau gunakan bundle lama melalui `--source`.

Untuk membatalkan pengambilalihan awal secara manual:

1. Tutup OMP dan pastikan tidak ada installer yang aktif.
2. Baca `backup.json` dari transaksi yang ingin dibatalkan.
3. Pulihkan berkas bertanda `restore` dari `files/` ke path relatif yang sama pada target.
4. Hapus hanya berkas yang bertanda `remove` pada metadata tersebut.
5. Simpan objek `previousState` sebagai `.omp-setup/state.json`. Jika nilainya `null`, hapus berkas state itu.

Jangan hapus direktori OMP secara menyeluruh. Cadangan dapat memuat konfigurasi lama yang sensitif; simpan secara lokal.

## Diagnosis dan troubleshooting

```sh
node bin/omp-setup.mjs doctor --profile shared
node bin/omp-setup.mjs doctor --profile shared --online
node bin/omp-setup.mjs doctor --profile shared --json
```

Mode biasa memeriksa prasyarat, bukan konektivitas atau discovery efektif OMP. `--online` menjalankan MCP stdio aktif, mengirim `initialize` dan `tools/list` ke MCP HTTP aktif, serta memeriksa versi Context7 CLI melalui npx. Pemeriksaan versi CLI tidak membuktikan autentikasi API dokumentasi.

> [!WARNING]
> Gunakan `--online` hanya pada konfigurasi tepercaya. MCP stdio menjalankan program pada host dan npx dapat mengunduh paket. Doctor tidak membuka browser OAuth secara otomatis. MCP SSE lama dan secret command `!command` perlu diuji melalui `/mcp test <nama>` di OMP.

| Masalah | Tindakan |
| --- | --- |
| Akses repo ditolak | Pastikan akun dan kunci SSH pada host memiliki akses ke repo privat |
| `npx` tidak menemukan executable | Periksa versi dan field `bin` dengan `npm view @salmanfaris06/omp-setup@0.1.0 version bin --json`. Pastikan versi telah diterbitkan, bukan hanya di-stage. |
| Publikasi npm `E403` terkait 2FA | Konfigurasi security key di situs npm, lalu ulangi autentikasi dan publikasi. |
| Publikasi npm `E409` untuk versi yang di-stage | Tinjau dan setujui versi yang ada di staging. Jika tidak ada, periksa apakah versi tersebut sudah tersedia di registry. |
| `Berkas belum dikelola` | Tinjau `init --adopt --dry-run`, lalu ambil alih hanya jika sesuai |
| `Target belum dikelola` | Jalankan `init` pada profile atau target yang sama sebelum `update` |
| `Perubahan lokal ditemukan` | Salin perubahan ke sumber atau overlay, lalu pulihkan berkas target ke versi terakhir sebelum update |
| `config.yaml sudah ada` | Cadangkan dan migrasikan ke `config.yml`; jangan meninggalkan kedua nama |
| Executable MCP tidak ditemukan | Pasang binary yang sesuai OS atau perbaiki environment path |
| Environment variable belum tersedia | Tetapkan variable pada proses yang menjalankan doctor dan OMP; hilangkan header opsional jika tidak dipakai |
| Versi OMP berbeda | Bundle mengacu versi pada `manifest.json`; error ini belum membuktikan versi lain pasti tidak kompatibel |
| Lock tertinggal | Pastikan installer sudah berhenti sebelum menghapus `<target>/.omp-setup/lock` |
| Symlink atau junction ditolak | Gunakan target dan berkas biasa; installer juga memeriksa direktori induknya |

Perubahan melalui `/settings` juga dapat menyebabkan drift pada `config.yml`. Jangan memakai `--adopt` untuk melewati drift pada berkas yang sudah dikelola.

Di dalam OMP, periksa discovery dan koneksi dengan `/mcp list`, `/mcp test codebase-memory`, `/mcp test context7`, serta panel skills/agen. Login provider model tetap dilakukan pada setiap host.

## Struktur proyek

```text
bin/omp-setup.mjs       Antarmuka CLI
lib/setup.mjs          Target, overlay, hash, cadangan, dan transaksi pemasangan
lib/doctor.mjs         Pemeriksaan runtime dan koneksi MCP
bundle/manifest.json   Versi konfigurasi, OMP, dan Context7
bundle/agent/          Berkas konfigurasi yang dibagikan
examples/host.yml      Contoh pengecualian host
test/                  Pengujian terisolasi
.github/workflows/     CI Windows dan Linux
```

Bundle awal berasal dari konfigurasi pengguna yang disanitasi. `approvalMode` menjadi `write`; penanda setup dan persetujuan auto-QA tidak ikut disalin. Path MCP Windows diganti referensi environment atau nama executable. Extension khusus Orca dan `lsp.json` khusus Windows tidak disertakan.

Resource skill beserta lisensi dan atribusinya dipertahankan. Direktori Git, dependency, virtualenv, `.env`, dan database tidak ikut diimpor.

## Pengujian

```sh
npm ci --ignore-scripts
npm test
npm pack --ignore-scripts
```

Suite default memakai direktori sementara, tanpa mengubah OMP aktif atau menjalankan server/browser. [GitHub Actions](https://github.com/salmanfaris06/omp-setup/actions/workflows/test.yml) menjalankan suite dan pemasangan/pembaruan paket npx pada Windows serta Linux. Uji koneksi MCP dilakukan terpisah melalui `doctor --online`.

## Referensi

- [OMP settings](https://github.com/can1357/oh-my-pi/blob/main/docs/settings.md)
- [OMP MCP](https://github.com/can1357/oh-my-pi/blob/main/docs/mcp-config.md)
- [Context7](https://github.com/upstash/context7)
