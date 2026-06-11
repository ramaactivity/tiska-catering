# Tiska Catering — Handover ke Claude Code (VS Code)

Paket lengkap untuk melanjutkan pembangunan website Tiska Catering via **Claude Code di VS Code**.

## Struktur Paket

```
tiska-catering-handover/
├── CLAUDE.md                  ← dibaca Claude Code OTOMATIS (konteks utama)
├── STARTER-PROMPT.md          ← prompt siap copy-paste per fase
├── README.md                  ← file ini
├── docs/
│   ├── 01-project-brief.md    ← tujuan, audiens, scope
│   ├── 02-design-system.md    ← font, warna, komponen
│   ├── 03-content-copy.md     ← SEMUA teks final + data perusahaan
│   ├── 04-sitemap-sections.md ← struktur + urutan section + efek
│   ├── 05-technical-spec.md   ← stack, folder, Lenis+GSAP, deploy
│   └── 06-asset-inventory.md  ← checklist foto & logo
└── reference/
    ├── tiska-v8-acuan-visual.html  ← prototipe acuan feel (buka di browser)
    └── logos-base64.ts             ← logo Tiska transparan (sementara)
```

## Cara Mulai (5 menit)

1. **Buat folder proyek** di komputer, misal `~/projects/tiska-catering/`.
2. **Salin SELURUH isi paket ini** ke folder itu (CLAUDE.md harus di root).
3. Buka folder di **VS Code** → buka terminal (`` Ctrl+` ``).
4. Jalankan `claude` (atau buka panel extension Claude Code).
5. **Copy-paste PROMPT UTAMA** dari `STARTER-PROMPT.md` → enter. Selesai — Claude Code akan membaca semua dokumen lalu setup Fase 1.

> Catatan: Claude Code akan membuat proyek Next.js di folder ini. CLAUDE.md, docs/, dan reference/ aman berdampingan dengan kode — justru itu desainnya, supaya konteks selalu terbawa di setiap sesi.

## Alur Kerja (5 fase, satu per satu)

1. **Fondasi** — setup, token desain, Lenis, komponen motion. → review
2. **Beranda** — 12 section sesuai docs/04 (bertahap 3 batch). → review tiap batch
3. **Menu & Galeri** — halaman terpisah. → review
4. **Aset asli** — foto Tiska + logo klien menggantikan placeholder. → review
5. **Deploy** — Vercel + DNS Squarespace.

Prompt tiap fase sudah disiapkan di `STARTER-PROMPT.md`.

## Yang Perlu Rama Siapkan Paralel (prioritas!)

- **Foto asli Tiska** (faktor #1 feel mahal): kurasi 20–30 foto terbaik dari Drive "04. APRIL" → detail kebutuhan per section di `docs/06`.
- **Logo Tiska** SVG/PNG transparan resolusi tinggi.
- **Logo klien resmi** (BCA, BMW, dll) — kemungkinan ada di file desain company profile.
- **Jawab TBD:** CTA utama (WhatsApp Rakhma?), email publik, status email @tiskacatering.com (krusial untuk DNS), sosmed aktif.

## Prinsip yang Tidak Boleh Hilang

> **"Let the customer be the spotlight."** — tunjukkan lewat desain, bukan slogan.
> **Disiplin efek.** Sedikit & halus mengalahkan tumpukan animasi.
> **Foto = 70% feel mahal.** Animasi tidak menyelamatkan foto generik.

---

*Disusun dari sesi desain & audit referensi (Lucci Lambrusco, microsoft.ai, mors.design). Stack & arah sudah disetujui: Next.js + TS + Tailwind + Lenis + Framer Motion + GSAP, struktur hybrid, deploy Vercel.*
