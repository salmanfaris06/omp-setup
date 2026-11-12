# omp-setup

Panduan agar AI agent menyiapkan **skills, instruksi global, dan MCP OMP** pada Windows atau Linux. Repo ini tidak menyediakan installer, paket npm, atau bundle skill.

## Mulai melalui AI agent

Clone repo dengan akses Git pengguna, lalu buka direktori ini melalui AI agent yang memiliki akses terminal dan berkas. Berikan instruksi:

> Baca AGENTS.md repo ini. Siapkan skills, instruksi global OMP, serta MCP codebase-memory dan Context7 untuk pengguna saat ini. Periksa host dan sumber terlebih dahulu. Pertahankan konfigurasi lokal, cadangkan sebelum perubahan, dan minta keputusan hanya untuk konflik atau tindakan yang memerlukan izin. Verifikasi hasil dari sesi OMP baru di luar repo dan laporkan hasil per komponen.

Agent mengikuti prosedur [AGENTS.md](AGENTS.md). Membuka atau mengubah repo saja tidak mengizinkan setup host.

## Yang dipasang

| Komponen | Sumber dan prosedur |
| --- | --- |
| Semua skill dari empat repositori dan empat skill tambahan | [Setup skills](docs/skills.md) |
| `AGENTS.md` global, `RULES.md`, dan `APPEND_SYSTEM.md` | [Instruksi global](docs/global-instructions.md) |
| MCP `codebase-memory`, skill pendampingnya, dan Context7 | [Setup MCP](docs/mcp.md) |

Skills diambil dari upstream, bukan disalin dari konfigurasi mesin pembuat repo. Perintah `npx skills` tidak menetapkan `--agent`; CLI memilih agen secara otomatis. Agent setup harus memeriksa tujuan aktual dan discovery OMP, bukan menganggap target otomatis selalu sama.

`RULES.md` dan `APPEND_SYSTEM.md` tetap disimpan sebagai sumber instruksi. `AGENTS.md` repo ini **bukan** berkas yang dipasang global. Panduan instruksi global menjelaskan pembuatan dan penggabungan berkas global yang terpisah.

## Prasyarat dan batas

- OMP sudah terpasang dan dapat dijalankan. Autentikasi provider model disiapkan pengguna.
- Node.js, npm/npx, Git, dan akses jaringan sesuai persyaratan versi upstream yang akan digunakan.
- Agent dapat membaca, menulis, dan menjalankan perintah dengan izin pengguna. Pemasangan executable MCP memerlukan peninjauan sumber dan rencana host.
- Setup hanya mengelola ketiga komponen pada tabel. Repo ini tidak memasang OMP, model/provider, custom agent, command, hooks, atau pengaturan UI.
- MCP lain dan skill yang tidak termasuk rencana tidak dihapus. Kredensial, sesi, database, cache, dan preferensi host tetap lokal.

## Perilaku setup

Agent menginspeksi host, meninjau sumber, menyelesaikan konflik, membuat cadangan lokal, menerapkan perubahan minimal, lalu memeriksa hasil. Berkas yang sudah sesuai tidak ditulis ulang. Perubahan lokal tidak boleh ditimpa tanpa keputusan pengguna.

Tes MCP menjalankan executable lokal atau mengakses jaringan. Pemeriksaan itu dilakukan hanya setelah persetujuan yang diperlukan. Jika dependensi, discovery, atau koneksi gagal, agent melaporkan hasil parsial dan pemulihan; keberadaan berkas bukan bukti setup berhasil.

Baca prosedur [cadangan dan verifikasi](AGENTS.md#2-cadangan-dan-staging) sebelum perubahan. Mulai ulang OMP untuk memuat instruksi dan skills; reload MCP saja tidak memuat ulang seluruh instruksi.

## Pengulangan dan migrasi

Untuk memperbarui setup, ambil revisi repo yang diinginkan lalu minta agent menjalankan prosedur yang sama. Agent membandingkan konten aktual, sumber/versi, dan catatan setup sebelumnya. Skill baru dari sumber berisi seluruh skill perlu ditinjau lagi sebelum dipasang.

CLI `init`, `update`, dan `doctor` dari versi repo sebelumnya tidak lagi menjadi alur repo ini. Perubahan repo tidak menghapus instalasi npm yang sudah diterbitkan atau konfigurasi host yang pernah dipasang. Jangan menjalankan paket lama untuk menerapkan instruksi baru. Pertahankan cadangan dan state lama sampai pemulihan tidak diperlukan lagi.

## Peta repo

| Berkas | Tujuan |
| --- | --- |
| [AGENTS.md](AGENTS.md) | Prosedur setup dan aturan pemeliharaan untuk AI agent |
| [RULES.md](RULES.md) | Kebijakan global yang dipertahankan |
| [APPEND_SYSTEM.md](APPEND_SYSTEM.md) | Instruksi interaksi dan Context7 CLI yang dipertahankan |
| [docs/skills.md](docs/skills.md) | Sumber skill dan bulk instalasi |
| [docs/global-instructions.md](docs/global-instructions.md) | Lokasi, penggabungan, dan pemuatan instruksi global |
| [docs/mcp.md](docs/mcp.md) | Dependensi, konfigurasi, dan verifikasi dua MCP |
| [CHANGELOG.md](CHANGELOG.md) | Riwayat perubahan prosedur |

Tidak ada suite installer untuk dijalankan. Saat memelihara panduan, periksa tautan, sintaks contoh, dan prosedur pada sandbox. Pengujian setup nyata harus memisahkan konfigurasi aktif dari sandbox dan memerlukan izin pengguna.

