# Starter Prompt — Copy-Paste ke Claude Code

> Buka terminal di folder proyek (yang sudah berisi CLAUDE.md, docs/, reference/), jalankan `claude`, lalu paste prompt di bawah.

---

## PROMPT UTAMA (mulai dari sini)

```
Baca CLAUDE.md lalu semua dokumen di docs/ (01 sampai 06) sampai selesai sebelum menulis kode apa pun.

Konteks: ini proyek website company profile Tiska Catering yang sudah melalui fase desain & dokumentasi lengkap. Semua keputusan (stack, design system, copy, struktur section, efek per section) SUDAH terkunci di dokumen — tugasmu mengeksekusi, bukan mendesain ulang dari nol.

Setelah selesai membaca, kerjakan FASE 1 (Fondasi) sesuai roadmap di CLAUDE.md:

1. Setup proyek Next.js (App Router) + TypeScript + Tailwind CSS di folder ini, lalu install lenis, framer-motion, gsap (perintah persis ada di docs/05-technical-spec.md).
2. Implementasikan design token dari docs/02-design-system.md: CSS variables warna di globals.css, font Fraunces + Instrument Serif + Space Grotesk via next/font.
3. Buat LenisProvider (client component) yang aktif global di root layout, termasuk pola sinkronisasi Lenis+GSAP yang tertulis di docs/05 — ini wajib persis seperti itu.
4. Buat komponen motion reusable di components/motion/: <Reveal>, <BlurToFocus>, <Counter> (pakai Framer Motion).
5. Buat lib/content.ts berisi data terstruktur yang diambil dari docs/03-content-copy.md (hero, profil, reasons, timeline, layanan, menu, testimoni, klien, kontak).
6. Pastikan npm run dev jalan tanpa error TypeScript.

Aturan penting (detail di CLAUDE.md):
- Konten website Bahasa Indonesia, copy HARUS dari docs/03 — jangan mengarang ulang.
- Disiplin efek: halus & sedikit, brand ini anggun.
- Konten di lib/content.ts, jangan hardcode di JSX.
- Foto sementara boleh placeholder (Unsplash), struktur siap diganti foto asli.
- Logo Tiska sementara pakai reference/logos-base64.ts.

Setelah Fase 1 beres dan dev server jalan bersih, laporkan ringkas apa saja yang dibuat, lalu berhenti — saya akan review dulu sebelum lanjut Fase 2.
```

---

## PROMPT LANJUTAN (pakai setelah Fase 1 di-review)

**Fase 2 — Beranda:**
```
Lanjut Fase 2: bangun beranda (app/page.tsx) section per section sesuai urutan & efek di docs/04-sitemap-sections.md, pakai acuan visual reference/tiska-v8-acuan-visual.html (buka/baca untuk memahami feel-nya).

Kerjakan bertahap: (1) Nav floating pill + Hero + Profil dulu → berhenti, tunggu review saya. Lalu (2) Mengapa Tiska + Sejarah (GSAP pinned scrollytelling — satu-satunya efek berat) → review. Lalu (3) sisanya sampai Footer.

Semua copy dari lib/content.ts. Ritme terang-gelap section ikuti tabel di docs/04.
```

**Fase 3 — Halaman Menu & Galeri:**
```
Lanjut Fase 3: buat halaman /menu dan /galeri sesuai spesifikasi di docs/04, data menu lengkap dari lib/content.ts (sumber: docs/03). Konsisten dengan design system & komponen yang sudah ada.
```

**Fase 4 — Aset asli:**
```
Saya sudah siapkan foto asli Tiska di public/images/ dan logo klien di public/logos/. Ganti semua placeholder sesuai mapping di docs/06-asset-inventory.md, optimasi via next/image, tambahkan alt text deskriptif Bahasa Indonesia, lengkapi SEO metadata + OG image.
```

**Fase 5 — Deploy:**
```
Siapkan deploy: pastikan npm run build bersih, buat repo git + push ke GitHub, lalu pandu saya langkah demi langkah deploy ke Vercel dan setting DNS di Squarespace sesuai docs/05 — ingatkan saya soal MX record email sebelum menyentuh DNS.
```

---

## Tips Pemakaian

- **Satu fase satu waktu.** Jangan paste semua sekaligus — review tiap fase membuat hasil jauh lebih terkendali (ini pelajaran dari fase prototipe).
- Kalau hasil melenceng dari feel yang diinginkan, tunjuk section spesifik + rujuk acuan: *"Section X kurang Y, lihat lagi reference/tiska-v8-acuan-visual.html dan docs/02."*
- Kalau Claude Code bertanya soal item TBD (CTA, email, dll), jawab langsung — jawaban Anda jadi keputusan final.
- Simpan perubahan keputusan penting ke CLAUDE.md supaya sesi berikutnya tetap konsisten (bisa minta: *"update CLAUDE.md dengan keputusan ini"*).
