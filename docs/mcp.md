# Menyiapkan MCP untuk OMP

Panduan ini ditujukan kepada AI agent setup. Kelola hanya `codebase-memory` dan `context7`. Jangan menambah, menghapus, atau mengonfigurasi server lain.

Ikuti prosedur persetujuan dan resolusi direktori dalam [AGENTS.md](../AGENTS.md). Membaca panduan ini tidak memberi izin untuk memasang binary, mengubah host, atau menjalankan server.

## 1. Periksa input dan dependensi

Terima hasil discovery dari prosedur utama:

- `<mcp-config-base>`: direktori konfigurasi MCP pengguna yang benar-benar dibaca OMP pada profil aktif. Targetnya `<mcp-config-base>/mcp.json`.
- Direktori skill yang telah diverifikasi menurut [panduan skills](skills.md).
- OS, arsitektur, shell, versi OMP, profil aktif, dan rencana perubahan yang disetujui.

Default MCP pengguna adalah `~/.omp/agent/mcp.json`. Jangan menggunakan default bila profil, lingkungan, atau konfigurasi aktual memilih lokasi lain. Jangan menyamakan `<mcp-config-base>` dengan direktori native `RULES.md`/`AGENTS.md`. Jangan menganggap `PI_CODING_AGENT_DIR` memindahkan seluruh discovery MCP. Gunakan dokumentasi dan discovery versi OMP terpasang; konfirmasi sumber efektif saat verifikasi.

Periksa dependensi tanpa mencetak seluruh lingkungan atau konfigurasi:

| Komponen | Pemeriksaan |
| --- | --- |
| OMP | Temukan executable dan jalankan `omp --version`; baca bantuan versi terpasang bila sintaks berbeda. |
| Binary memory | Periksa `CODEBASE_MEMORY_COMMAND`, lalu pencarian executable pada `PATH`. Jangan mengeksekusi isi variabel sebagai shell command. |
| Windows | PowerShell, akses HTTPS ke GitHub, `Get-FileHash`, dan `Expand-Archive` jika bootstrap diperlukan. |
| Linux | Bash, `curl` atau `wget`, `tar`, serta `sha256sum` atau `shasum -a 256` jika bootstrap diperlukan. |
| Context7 HTTP | Akses HTTPS ke `mcp.context7.com`; konfigurasi proxy/TLS organisasi bila diperlukan. Tidak perlu Node.js atau server Context7 lokal. |

Binary native memory tidak memerlukan Docker, Node.js, Python, atau compiler untuk berjalan. Jangan memasang dependensi source-build tanpa kebutuhan dan persetujuan terpisah.

Jika executable sudah tersedia, simpan path absolut hasil resolusi dan hasil `--version`. Pada Windows gunakan `Get-Command -CommandType Application`; pada Linux gunakan `command -v` dan resolusi symlink. Pastikan proses OMP akan mewarisi `PATH` atau `CODEBASE_MEMORY_COMMAND` yang sama. Variabel tersebut harus berisi satu executable, bukan command beserta argumen.

Jangan mengganti binary yang sudah ada hanya karena upstream lebih baru. Jangan menjalankan `update`, installer, `daemon stop`, atau penggantian cache untuk memperbaiki konflik sesi. Upstream mewajibkan build dan cache root yang kompatibel antarproses aktif. Laporkan konflik dan minta keputusan pengguna bila perlu perubahan di luar rencana.

## 2. Bootstrap binary jika belum tersedia

Sumber resmi adalah [DeusData/codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp), bukan paket bernama mirip. Gunakan [rilis resmi](https://github.com/DeusData/codebase-memory-mcp/releases). Pilih tag rilis dan catat tag, URL asset, arsitektur, serta SHA-256 yang digunakan. Jangan bergantung pada `latest` selama transaksi berlangsung.

Sebelum mengeksekusi unduhan:

1. Baca README, catatan rilis, [kebijakan keamanan](https://github.com/DeusData/codebase-memory-mcp/blob/main/SECURITY.md), dan sumber installer pada tag yang dipilih.
2. Tunjukkan rencana: sumber, direktori binary pengguna, file baru, perubahan `PATH` bila ada, dan cara pemulihan. Dapatkan persetujuan eksplisit untuk perubahan yang belum disetujui.
3. Periksa instalasi lama di luar `PATH`, proses memory milik akun, dan sesi agent lain. Jangan menghentikannya. Jika ada instalasi atau sesi aktif yang berpotensi terdampak, hentikan bootstrap; gunakan binary yang cocok atau minta keputusan pemilik sesi.
4. Buat direktori staging privat di luar repo. Unduh arsip platform dan `checksums.txt` dari tag rilis yang sama melalui HTTPS. Cocokkan SHA-256 arsip dengan satu entri nama asset yang tepat. Tolak digest hilang, berbeda, atau ambigu. Gunakan bukti provenance rilis jika tersedia.
5. Periksa daftar isi arsip sebelum ekstraksi. Tolak traversal, path absolut, symlink/reparse point yang tidak aman, dan tabrakan nama. Ekstrak hanya ke staging privat.

Pilih asset yang benar-benar tersedia pada rilis:

| Platform | Pola asset upstream |
| --- | --- |
| Windows amd64/arm64 | `codebase-memory-mcp-windows-<arch>.zip` |
| Linux amd64/arm64 | `codebase-memory-mcp-linux-<arch>-portable.tar.gz` |

Installer Linux resmi memilih varian `-portable` yang statis. Binary Linux non-portable memerlukan ABI sistem yang sesuai; jangan menggunakannya sebagai pengganti tanpa pemeriksaan. Android/Termux bukan target Linux portable yang didukung installer.

Setelah integritas terverifikasi, gunakan sifat executable mandiri yang didokumentasikan upstream. Jangan menjalankan native `install` untuk setup ini: bahkan `--skip-config` bukan jaminan bahwa aktivasi tidak memengaruhi sesi lain.

1. Jalankan executable staging dengan `--version`, bukan tanpa argumen. Cocokkan versi dengan rilis yang dipilih.
2. Buat direktori binary pengguna yang disetujui bila belum ada. Tolak tujuan yang berupa link tidak aman atau dimiliki pihak lain. Pastikan nama executable tujuan belum ada; jangan menimpa binary lama.
3. Salin executable yang sudah diverifikasi ke tujuan dengan mode pembuatan eksklusif, bukan overwrite. Pada Linux, berikan izin executable kepada pemilik. Pertahankan izin direktori privat yang sesuai; jangan meminta hak administrator.
4. Cocokkan hash executable tujuan dengan executable staging, lalu jalankan path tujuan dengan `--version`. Jangan menyimpulkan keberhasilan dari exit code penyalinan saja.
5. Gunakan `CODEBASE_MEMORY_COMMAND` dengan path absolut tujuan pada lingkungan peluncur OMP yang disetujui jika tujuan belum ada pada `PATH`. Jangan mengubah `PATH` global. Jangan menulis path host ke repo.
6. Hapus staging milik transaksi setelah semua bukti integritas dan provenance yang tidak sensitif dicatat. Pertahankan informasi lisensi dan pemberitahuan pihak ketiga dari rilis pada direktori instalasi yang disetujui.

[install.sh](https://github.com/DeusData/codebase-memory-mcp/blob/main/install.sh) dan [install.ps1](https://github.com/DeusData/codebase-memory-mcp/blob/main/install.ps1) adalah referensi resmi alur unduhan. Script tersebut memanggil native install dengan `-y --force`; script Windows juga dapat menghentikan daemon dan memindahkan binary lama. Karena itu jangan memakai `curl | bash`, `Invoke-Expression`, atau menjalankan script/native installer tersebut dalam prosedur ini.

## 3. Sediakan skill pendamping graph-first

`RULES.md` lokal repo mewajibkan skill `codebase-memory`. Registrasi server saja belum memenuhi syarat tersebut. Jangan mengganti `RULES.md` atau `APPEND_SYSTEM.md` repo dengan instruksi upstream.

1. Periksa apakah skill `codebase-memory` sudah ditemukan OMP. Jika sudah ada, baca dan periksa kompatibilitasnya. Jangan menjalankan installer untuk memperbaruinya.
2. Jika belum ada, periksa dokumentasi, bantuan CLI, dan sumber tag upstream yang ditinjau untuk file skill atau ekspor skill resmi. Gunakan hasil resmi tersebut bila tersedia tanpa aktivasi installer. Jangan menebak opsi `--skill-only` atau `--skills`, dan jangan menjalankan installer yang mengubah client untuk mencoba mengekspor teks. Pada sumber yang dirujuk panduan ini, payload canonical tertanam sebagai deklarasi `static const char skill_content[]` dalam [src/cli/cli.c](https://github.com/DeusData/codebase-memory-mcp/blob/main/src/cli/cli.c).
3. Bila tag tersebut hanya menyediakan payload C, ekstrak initializer deklarasi `skill_content`, bukan `released_skill_content_*` yang historis. Parse literal string C secara leksikal, gabungkan sesuai urutan, dan dekode escape C seperti `\n` dan `\"`. Abaikan komentar di luar literal; jangan menyalin hasil regex mentah. Jangan menjalankan atau mengompilasi kode upstream untuk memperoleh teks. Bila format berubah, telusuri sumber payload resmi pada tag itu sebelum melanjutkan; jangan membuat skill pengganti dari ingatan.
4. Tinjau teks hasil ekstraksi sebagai skill eksternal sesuai [panduan skills](skills.md). Pastikan frontmatter valid, `name: codebase-memory`, dan petunjuk tool sesuai kemampuan server. Catat tag sumber dan hash payload. Angka jumlah tool dalam teks bukan bukti kemampuan runtime.
5. Setelah review dan persetujuan, pasang hanya `codebase-memory/SKILL.md` pada root skill yang sudah diresolusikan. Cadangkan konten lama; skip jika identik; minta keputusan bila isinya berbeda. Jangan memasang profil subagent, hook, atau integrasi client lain sebagai efek samping.
6. Verifikasi bahwa OMP menemukan skill pada sesi/profil target. Jika tidak ditemukan, laporkan bootstrap graph-first belum selesai dan perbaiki discovery; jangan mengklaim setup berhasil.

Installer upstream menyediakan integrasi OMP, tetapi resolver serta nama servernya tidak harus sama dengan rencana ini. Jangan menggunakan `install --clients=omp` sebagai jalan pintas untuk menimpa konfigurasi yang dikelola prosedur ini.

## 4. Gabungkan konfigurasi secara minimal

Baca target secara privat. Jika JSON rusak atau bentuk `mcpServers` bukan object, jangan menimpanya. Laporkan lokasi dan kesalahan tanpa menampilkan kredensial. Minta keputusan untuk perbaikan yang mengubah konten pengguna.

Sebelum perubahan, buat backup privat di luar repo. Simpan byte asli, izin/ACL, hash, serta catatan apakah target sebelumnya tidak ada. Jangan menaruh backup berisi secret dalam repo atau log.

Contoh berikut adalah dokumen JSON lengkap untuk target baru, bukan perintah untuk mengganti konfigurasi lama:

```json
{
  "$schema": "https://raw.githubusercontent.com/can1357/oh-my-pi/main/packages/coding-agent/src/config/mcp-schema.json",
  "mcpServers": {
    "codebase-memory": {
      "type": "stdio",
      "command": "${CODEBASE_MEMORY_COMMAND:-codebase-memory-mcp}"
    },
    "context7": {
      "type": "http",
      "url": "https://mcp.context7.com/mcp"
    }
  }
}
```

OMP mendokumentasikan ekspansi `${VAR}` dan `${VAR:-default}` pada konfigurasi native. Pastikan dukungan versi terpasang sebelum memakai contoh. Jika versi tersebut tidak mendukungnya, gunakan path executable hasil resolusi dalam konfigurasi host setelah persetujuan; jangan menyimpan placeholder literal yang tidak akan bekerja.

Aturan merge:

- Tambahkan atau ubah hanya dua entri target. Pertahankan server lain, field lokal yang tidak konflik, serta `disabledServers` dan `enabledServers` pengguna.
- Jika entri target identik, jangan tulis ulang file. Bila nama target sudah menunjuk server atau opsi berbeda, tampilkan diff tersanitasi dan minta keputusan; jangan menggantinya tanpa izin.
- Jika server memory sudah terdaftar dengan nama lain, misalnya `codebase-memory-mcp` dari installer upstream, periksa endpoint/command efektif. Hindari duplikasi. Migrasikan hanya entri yang disetujui; jangan menghapus alias atau menambah koneksi kedua secara diam-diam.
- Jangan menghapus penonaktifan atau menambah allowlist untuk memaksa server aktif. Jika target dinonaktifkan, minta keputusan pengguna.
- Periksa sumber project dan sumber client lain yang ditemukan OMP untuk shadowing. Jangan mengedit sumber tersebut secara otomatis. Definisi OMP dengan nama sama tidak digabung antarfile; prioritas menentukan pemenang.
- Validasi JSON hasil merge dan field transport terhadap skema yang cocok dengan versi OMP. Pertahankan key lama yang tidak dipahami; jika bertentangan dengan skema, laporkan, jangan bersihkan di luar scope.
- Tulis secara atomik dengan izin/ACL tetap. Sebelum publikasi, cocokkan hash target dengan snapshot awal. Jika file berubah, baca ulang dan hitung merge baru; jangan menimpa perubahan paralel.

### API key Context7 opsional

Mulai dengan HTTP tanpa key. Upstream merekomendasikan key untuk batas penggunaan lebih tinggi. Jika pengguna memilih key, minta pengguna memasukkannya melalui pengelola secret atau lingkungan peluncur OMP; jangan meminta nilai key di chat.

Setelah memastikan `CONTEXT7_API_KEY` tersedia dan tidak kosong pada proses OMP, tambahkan hanya field berikut pada entri `context7`:

```json
{
  "headers": {
    "Authorization": "Bearer ${CONTEXT7_API_KEY}"
  }
}
```

Fragmen tersebut digabung ke entri, bukan mengganti dokumen. Jangan tulis header bila variabel belum tersedia: placeholder yang tidak teresolusi dapat tetap literal. Jangan gunakan `auth: {"type":"apikey"}` sebagai pengganti header; OMP tidak menginjeksi key dari auth storage melalui field itu. Jangan mencetak hasil ekspansi, header, credential store, atau seluruh konfigurasi.

`ctx7 library` dan `ctx7 docs` adalah CLI dokumentasi. Keberhasilannya bukan bukti MCP terhubung. `ctx7 login` juga bukan autentikasi koneksi MCP OMP. Jangan menjalankan `ctx7 setup` untuk langkah manual ini karena perintah tersebut dapat menulis konfigurasi dan skill tambahan.

## 5. Verifikasi melalui OMP setelah izin menjalankan server

Parsing JSON dan `--version` belum membuktikan handshake MCP. Dapatkan persetujuan eksplisit sebelum memulai atau menghubungkan ulang server. Jelaskan bahwa `/mcp reload` dapat menghubungkan ulang server lain dalam sesi; jangan mengganggu sesi pengguna tanpa izin.

Gunakan sesi OMP dengan profil, lingkungan, dan working directory target:

```text
/mcp reload
/mcp list
/mcp test codebase-memory
/mcp test context7
```

Jika pengguna mempertahankan nama server yang sudah ada, gunakan nama efektif yang disetujui untuk perintah pengujian. `/mcp list` harus menunjukkan sumber konfigurasi yang diharapkan, bukan sekadar nama yang sama dari project lain. Pada versi yang mendukungnya, `/mcp reconnect <name>` dapat menghubungkan ulang satu server yang sudah ditemukan; itu bukan pengganti rediscovery file baru.

`/mcp test <name>` resmi membuat koneksi sementara dan memanggil `tools/list`. Implementasi OMP menampilkan informasi server dan jumlah tool; daftar nama dapat dibatasi pada UI. Catat hasil handshake, jumlah tool, serta error tersanitasi untuk setiap server secara terpisah.

- **codebase-memory:** pastikan tool yang dibutuhkan kebijakan tersedia, termasuk `list_projects`, `index_status`, `index_repository`, `search_graph`, `trace_path`, `get_code_snippet`, dan `check_index_coverage`. Periksa tool registry MCP jika UI tidak menampilkan semua nama. Jangan mensyaratkan jumlah tool tetap. Setelah izin indexing mencakup root kerja, panggil `list_projects`, pilih proyek berdasarkan root absolut, lalu `index_status`. Jika belum diindeks, jalankan `index_repository` untuk root yang disetujui; tunggu selesai, periksa status dan coverage. Pertahankan scope/pengaturan indeks lama. Jangan mengindeks seluruh home untuk menguji setup.
- **context7:** pastikan `resolve-library-id` dan `query-docs` muncul. Untuk uji fungsi yang disetujui, resolve library publik lalu query satu topik dokumentasi, atau langsung query bila pengguna sudah memberikan library ID. Jangan mengirim kode privat atau secret dalam query.

Jika versi OMP tidak menyediakan mekanisme ini, baca bantuan dan dokumentasi resmi versi terpasang. Jangan mengganti pengujian dengan `curl` ke endpoint, proses server yang dibiarkan hidup, atau output CLI dokumentasi. Laporkan `belum diverifikasi` bila handshake tidak dapat dijalankan dengan izin yang tersedia.

## 6. Pulihkan jika verifikasi gagal

1. Simpan error tersanitasi dan tentukan server yang gagal. Jangan mengubah timeout, TLS, atau autentikasi secara acak untuk membuat status tampak berhasil.
2. Batalkan perubahan setup yang gagal. Pulihkan backup bila target masih sama dengan hasil tulisan agent. Jika ada perubahan paralel, balikkan hanya perubahan milik setup; minta keputusan bila konflik tidak dapat dipisahkan.
3. Jika target sebelumnya tidak ada, hapus hanya file baru yang masih identik dengan hasil setup. Pulihkan skill serta perubahan lingkungan/PATH milik setup berdasarkan catatan transaksi. Jangan menghapus server, skill, atau indeks pengguna yang sudah ada.
4. Jangan memanggil uninstall global atau menghentikan daemon untuk rollback. Binary baru hanya boleh dihapus bila milik transaksi ini, tidak berubah, dan tidak dipakai sesi mana pun. Jika dipakai, biarkan dan laporkan pemulihan binary tertahan; jangan memutus sesi lain.
5. Hubungkan ulang konfigurasi lama hanya bila izin sebelumnya mencakupnya. Laporkan hasil pemulihan aktual. Jangan menyatakan rollback penuh bila binary, lingkungan, atau koneksi belum pulih.

## 7. Laporkan hasil

Laporkan path target tanpa isi secret, profil, file yang dibuat/diubah/dilewati, lokasi backup privat, sumber/tag/hash binary dan skill, serta hasil tiap server: `terverifikasi`, `gagal`, atau `belum diverifikasi`. Sertakan root/generasi/scope dan keterbatasan coverage jika indexing dijalankan. Bedakan konfigurasi tersimpan dari koneksi berhasil. Cantumkan tindakan pengguna yang masih diperlukan dan status rollback.

## Referensi resmi

- [Konfigurasi MCP OMP, ekspansi variabel, prioritas, dan perintah `/mcp`](https://github.com/can1357/oh-my-pi/blob/main/docs/mcp-config.md).
- [Skema MCP OMP](https://raw.githubusercontent.com/can1357/oh-my-pi/main/packages/coding-agent/src/config/mcp-schema.json).
- [Implementasi pengujian MCP interaktif OMP](https://github.com/can1357/oh-my-pi/blob/main/packages/coding-agent/src/modes/controllers/mcp-command-controller.ts) dan [mode teks/ACP](https://github.com/can1357/oh-my-pi/blob/main/packages/coding-agent/src/slash-commands/helpers/mcp.ts).
- [Panduan native memory, dependensi, dan koordinasi sesi](https://github.com/DeusData/codebase-memory-mcp#readme), [rilis](https://github.com/DeusData/codebase-memory-mcp/releases), dan [payload skill resmi](https://github.com/DeusData/codebase-memory-mcp/blob/main/src/cli/cli.c).
- [Context7: endpoint HTTP, autentikasi, dan MCP tools](https://context7.com/docs/resources/all-clients), [README resmi](https://github.com/upstash/context7#readme), dan [CLI dokumentasi](https://context7.com/docs/clients/cli).

Tautan `main` mengikuti upstream. Saat setup, cocokkan dengan versi terpasang atau tag rilis yang dipilih sebelum menjalankan langkah yang mengubah host.
