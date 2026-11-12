---
description: Jalankan orkestrasi fitur paralel dengan gerbang persetujuan 2 tahap
argument-hint: "<daftar fitur atau tujuan paralel>"
---

Gunakan pola orchestrate dan workflowz dengan aturan 2 gerbang berikut untuk menyelesaikan permintaan ini:

$ARGUMENTS

## Protokol Wajib (2 Gerbang Persetujuan)

1. **Tahap 1 — Eksplorasi & Partisi (Read-Only)**:
   - Petakan file terdampak menggunakan `scout` atau tool baca.
   - Susun pembagian sub-tugas paralel, kepemilikan file masing-masing (tanpa tumpang tindih), serta tentukan apakah hasilnya untuk **1 PR gabungan** (`task` dengan `isolated: true`) atau **PR terpisah per fitur** (`eval` `agent(..., isolated=True, apply=False)`).

2. **Gate 1 — Persetujuan Rencana (`ask`)**:
   - Wajib tampilkan ringkasan rencana dan minta konfirmasi user lewat tool `ask` sebelum menjalankan subagent penulis kode.

3. **Tahap 2 — Eksekusi Terisolasi & Verifikasi**:
   - Setelah disetujui, jalankan pekerja secara paralel sesuai batas konkurensi global (atau delegasikan koordinasi eksekusi ke agent `orchestrator`).
   - Lakukan verifikasi akhir (typecheck, lint, dan tes yang relevan) pada hasil integrasi atau masing-masing branch.

4. **Gate 2 — Persetujuan Git & PR (`ask`)**:
   - Laporkan ringkasan file berubah, nama branch hasil (`omp/task/<id>` atau branch fitur), dan status verifikasi.
   - Wajib minta persetujuan eksplisit user lewat `ask` sebelum menjalankan `git commit`, `git push`, atau membuka Pull Request (`pr_create` / `gh pr create`).
