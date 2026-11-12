# Setup instruksi global OMP

Jalankan setelah inspeksi dan cadangan pada [AGENTS.md](../AGENTS.md). Panduan ini memasang instruksi untuk pengguna OMP, bukan instruksi pemeliharaan repo.

## Sumber dan tujuan

| Sumber | Tujuan | Fungsi |
| --- | --- | --- |
| [RULES.md](../RULES.md) | `<native-agent-dir>/RULES.md` | Kebijakan tetap, termasuk graph-first |
| [APPEND_SYSTEM.md](../APPEND_SYSTEM.md) | `<shared-config-base>/APPEND_SYSTEM.md` | Kebijakan interaksi dan penggunaan Context7 CLI |
| Bagian AGENTS global di bawah | `<native-agent-dir>/AGENTS.md` | Batas operasi global dan perlindungan konfigurasi lokal |

Jangan menyalin `AGENTS.md` root repo ke direktori global. Berkas itu mengarahkan setup dan pemeliharaan repo, bukan pekerjaan harian pengguna.

## Resolusikan lokasi sebelum menulis

1. Temukan home akun yang akan menjalankan OMP. Pada Windows gunakan home pengguna, bukan direktori instalasi program atau akun administrator. Pada Linux periksa home dan variabel XDG pengguna yang sama.
2. Tentukan profile dari perintah yang diminta pengguna, lalu `OMP_PROFILE`, lalu `PI_PROFILE`. `OMP_PROFILE` yang terdefinisi tetapi kosong memilih default, bukan fallback. Jangan membuat profile baru tanpa permintaan.
3. Gunakan dokumen konfigurasi dari tag/versi OMP yang terpasang untuk menentukan lokasi efektif. Dalam konfigurasi standar:

   | Mode | Native agent | Base konfigurasi bersama |
   | --- | --- | --- |
   | Default | `~/.omp/agent` | `~/.omp/agent` |
   | Profile bernama | `~/.omp/profiles/<nama>/agent` | `~/.omp/profiles/<nama>/agent` |

4. Jika `PI_CONFIG_DIR`, `PI_CODING_AGENT_DIR`, atau XDG aktif, verifikasi resolver versi tersebut. Jangan menganggap kedua lokasi selalu sama. `PI_CODING_AGENT_DIR` memengaruhi native discovery pada profile default, tetapi bukan base generik untuk `APPEND_SYSTEM.md`. Profile bernama mengabaikan override tersebut. Periksa pula resolver MCP pada [panduan MCP](mcp.md).
5. Catat path absolut hasil resolusi dalam rencana dan laporan lokal. Jika versi atau environment tidak memungkinkan penentuan yang pasti, berhenti sebelum menulis dan minta keputusan target melalui `ask`.
6. Periksa override project dan flag `--append-system-prompt` yang dapat mengalahkan append global. Jangan mengubah override itu secara otomatis.

Referensi: [resolusi konfigurasi](https://github.com/can1357/oh-my-pi/blob/main/docs/config-usage.md) dan [system prompt](https://github.com/can1357/oh-my-pi/blob/main/docs/system-prompt-customization.md). Dokumen `main` adalah referensi penemuan; cocokkan perilakunya dengan versi terpasang sebelum menerapkan.

## Siapkan dependensi instruksi

`RULES.md` mewajibkan skill dan MCP codebase-memory. Pasang skill pendamping melalui sumber upstream pada [panduan MCP](mcp.md). Pastikan MCP dapat dipakai sebelum menyatakan kebijakan graph-first siap.

`APPEND_SYSTEM.md` memuat perintah Context7 CLI dengan versi yang tertulis di berkas. Periksa bahwa versi itu tersedia dan dapat dipakai. Jangan mengganti pin atau menghapus kebijakan secara diam-diam. Login dan API key opsional tetap milik host. Kegagalan kuota bukan alasan menggunakan dokumentasi yang tidak terverifikasi.

## Terapkan berkas tanpa menimpa kebijakan lokal

1. Baca sumber `RULES.md` dan `APPEND_SYSTEM.md` dari checkout yang sedang dipakai. Jangan mengekspor prompt sesi, inventaris skill host, atau nilai environment menjadi sumber baru.
2. Jika tujuan belum ada, stage konten UTF-8 dengan nama sementara di direktori tujuan, lalu rename setelah validasi. Jika tujuan identik, jangan menulis ulang.
3. Jika tujuan sudah berbeda, tampilkan diff nonrahasia dan minta keputusan gabung atau ganti melalui `ask`. Cadangkan sebelum tindakan. Untuk gabungan, pertahankan aturan lokal dan masukkan hanya kebijakan yang belum ada. Jika aturan bertentangan, minta keputusan; jangan memilih berdasarkan urutan teks.
4. Susun `AGENTS.md` global menggunakan bagian berikut. Pada berkas yang sudah ada, kelola hanya blok bertanda ini. Pertahankan konten lain dan minta persetujuan jika blok berbeda dari versi sumber. Jika penanda ganda atau tidak berpasangan, hentikan penulisan dan laporkan konflik.

```markdown
<!-- omp-setup:global:start -->
# Instruksi global OMP

- Ikuti instruksi project untuk pekerjaan di project tersebut. Jangan memasang instruksi setup repo sebagai kebijakan global.
- Pertahankan kredensial, konfigurasi provider, sesi, database, cache, dan preferensi host. Ubah hanya komponen yang diminta pengguna.
- Baca RULES.md dan APPEND_SYSTEM.md pada lokasi global efektif jika belum dimuat dalam konteks. Gunakan lokasi yang telah diverifikasi saat setup; jangan menganggap current working directory sebagai lokasi global.
- Jalankan ulang setup hanya atas permintaan pengguna. Tinjau konflik dan cadangkan konfigurasi sebelum mengganti konten lokal.
<!-- omp-setup:global:end -->
```

5. Sebelum menulis tiap hasil staging, bandingkan hash tujuan dengan baseline inspeksi. Jika berubah, hentikan penimpaan dan baca ulang. Jangan mengikuti symlink/junction tanpa peninjauan target.
6. Simpan sumber/versi checkout dan hash hasil di catatan lokal setup. Jangan menambah metadata setup ke berkas sumber repo atau mengirim konten host ke repositori.

## Verifikasi pemuatan, bukan hanya keberadaan

1. Pastikan ketiga berkas dapat dibaca pada tujuan efektif. Untuk salinan utuh, bandingkan hash sumber dan tujuan. Untuk gabungan, periksa kebijakan sumber dan aturan lokal tetap ada tanpa blok ganda.
2. Mulai sesi OMP baru dengan profile yang sama dari direktori netral di luar checkout. Jangan menghentikan sesi lain. Gunakan `/context` atau tampilan discovery yang tersedia pada versi terpasang untuk memeriksa path instruksi global dan skill.
3. Periksa append yang efektif. Flag CLI atau konfigurasi project dapat membuat salinan global tidak dipakai. Jangan mengklaim berhasil hanya karena isi repo muncul pada sesi yang dibuka dari repo ini.
4. Pastikan codebase-memory dan Context7 terverifikasi sesuai [panduan MCP](mcp.md). `AGENTS.md` tidak diwariskan otomatis ke semua task subagent; kebijakan wajib tidak boleh hanya bergantung pada berkas tersebut.
5. Laporkan sumber, tujuan, perubahan, hasil discovery, dan cadangan. Jika pemuatan tidak dapat dibuktikan, tandai `belum diverifikasi`, bukan `selesai`.

## Pembaruan dan pembatalan

Pada setup ulang, bandingkan sumber checkout yang baru dengan hasil setup sebelumnya dan konten host saat ini. Kebijakan host yang berubah adalah konflik, bukan izin menimpa. Jangan menghapus berkas state atau cadangan dari installer lama; berkas tersebut bukan sumber setup baru.

Jika verifikasi gagal, pulihkan hanya berkas yang diubah sesi setup ini sesuai catatan cadangan. Sebelum pemulihan, pastikan hash masih sama dengan hasil tulis sesi ini. Pertahankan perubahan konkuren dan laporkan konflik. Penghapusan berkas baru hanya boleh dilakukan jika sesi ini membuatnya dan isinya belum berubah.
