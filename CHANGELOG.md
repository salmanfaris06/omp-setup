# Changelog

## Belum dirilis

- Ganti CLI dan bundle konfigurasi dengan prosedur setup yang dijalankan AI agent.
- Batasi setup ke skills upstream, instruksi global OMP, serta MCP codebase-memory dan Context7.
- Pertahankan RULES.md dan APPEND_SYSTEM.md di root; pisahkan instruksi repo dari AGENTS.md global.
- Dokumentasikan inspeksi host, konflik, cadangan, penggabungan, verifikasi discovery, dan pemulihan.
- Hapus installer, dependensi npm, resource bundle, contoh overlay, pengujian CLI, dan workflow paket.

## 0.1.0

- Tambahkan CLI init, update, dan doctor untuk Windows/Linux.
- Sertakan bundle konfigurasi OMP tersanitasi, 104 skills, empat agen, dan instruksi Context7.
- Tambahkan MCP Context7 serta definisi MCP sumber yang portabel.
- Lindungi perubahan lokal dengan hash, cadangan, rollback kegagalan tulis, dan lock installer.
- Jalankan Context7 CLI melalui npx dengan versi terkunci.
