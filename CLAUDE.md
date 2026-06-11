# CLAUDE.md — Tiska Catering Website

> File ini dibaca otomatis oleh Claude Code. Ini titik masuk konteks proyek.
> Dokumen detail ada di `docs/`. Acuan visual ada di `reference/`.

---

## Ringkasan Proyek

Membangun **website company profile baru** untuk **Tiska Catering** — bisnis katering premium di Bogor, berdiri 1980, tiga generasi. Website lama (PHP) ditinggalkan; ini pembangunan dari nol.

**Tujuan:** website yang terasa elegan, mahal, dan immersive — setara referensi kelas dunia (Lucci Lambrusco, microsoft.ai) — namun setia pada identitas brand Tiska yang anggun (logo ornamental emas-mint).

**Prinsip brand inti yang TIDAK BOLEH dilanggar:**
> **"Let the customer be the spotlight."**
> Website ini tentang momen perayaan pelanggan, bukan memamerkan Tiska. Tunjukkan lewat desain (foto pelanggan besar, klien diberi panggung) — JANGAN lewat slogan motivational/hard-sell.

---

## Tech Stack (TERKUNCI — jangan diganti tanpa konfirmasi Rama)

| Lapisan | Pilihan |
|---|---|
| Framework | **Next.js (App Router)** |
| Bahasa | **TypeScript** (strict) |
| Styling | **Tailwind CSS** |
| Smooth scroll | **Lenis** (global) |
| Animasi reveal | **Framer Motion** (utama: fade, blur-to-focus, stagger) |
| Animasi berat | **GSAP + ScrollTrigger** (HANYA pinned scrollytelling section Sejarah) |
| Gambar | **next/image** |
| Font | **next/font** — Fraunces, Instrument Serif, Space Grotesk |
| Deploy | **Vercel** · domain `tiskacatering.com` di Squarespace (A + CNAME) |

Detail lengkap → `docs/05-technical-spec.md` (termasuk pola sinkronisasi Lenis+GSAP yang WAJIB dipakai).

---

## Aturan Main untuk Claude Code

1. **Bahasa konten website:** Bahasa Indonesia. Kode/komentar: bebas (Inggris ok).
2. **Komunikasi dengan Rama:** Bahasa Indonesia kasual, frank dan langsung. Rama vibe-coder non-developer — jelaskan keputusan teknis singkat saat relevan, kelola coding sepenuhnya.
3. **Disiplin efek:** Efek melayani *feel*, bukan tujuan. Sedikit efek halus + foto bagus + ruang lega > sepuluh efek bertumpuk. Brand ini anggun — tahan diri.
4. **Tipografi:** Serif editorial elegan (lihat `docs/02`). JANGAN font tebal-membulat ala Lucci — bertabrakan dengan logo Tiska. Lucci hanya referensi *teknik & feel*.
5. **Copywriting:** Elegan, tenang, berkelas. JANGAN hard-sell, JANGAN klise template AI ("Wujudkan impian Anda!", "Anda adalah bintang utama!"). Semua copy final sudah ada di `docs/03` — pakai itu, jangan mengarang ulang.
6. **Testimoni figur publik (Teuku Wisnu & Shireen Sungkar):** pakai versi di `docs/03`. JANGAN mengarang kutipan dramatis baru.
7. **Foto:** Faktor #1 "feel mahal". Versi awal boleh placeholder, tapi struktur harus siap menerima foto asli Tiska (lihat `docs/06`).
8. **Konten di `lib/content.ts`**, bukan hardcode di JSX — agar Rama mudah update.
9. **Mobile-first & `prefers-reduced-motion`** dihormati. Efek berat degrade anggun di mobile.
10. **Konfirmasi dulu sebelum:** ganti stack, ubah struktur situs, atau menyimpang dari dokumen.

## Workflow yang Disarankan

- Kerjakan **bertahap per section**, jangan satu ledakan besar. Urutan ada di "Roadmap" bawah.
- Setelah tiap tahap selesai: jalankan `npm run dev`, pastikan tidak ada error TypeScript/build, baru lanjut.
- Commit kecil & sering dengan pesan jelas (mis. `feat: hero section with parallax`).
- Kalau ada keputusan desain ambigu yang tidak tercakup dokumen → tanya Rama, jangan asumsi diam-diam.

---

## Peta Dokumen

| File | Isi |
|---|---|
| `docs/01-project-brief.md` | Tujuan, audiens, halaman, scope |
| `docs/02-design-system.md` | Font, warna (CSS vars siap pakai), spacing, komponen |
| `docs/03-content-copy.md` | SEMUA teks final (ID) + data perusahaan |
| `docs/04-sitemap-sections.md` | Struktur hybrid + urutan 12 section + efek per section |
| `docs/05-technical-spec.md` | Setup, struktur folder, konvensi, sinkronisasi Lenis+GSAP, deploy |
| `docs/06-asset-inventory.md` | Foto & logo: status + checklist |
| `reference/tiska-v8-acuan-visual.html` | Prototipe acuan feel — buka di browser (butuh internet) |
| `reference/logos-base64.ts` | Logo Tiska transparan (base64) — pakai sementara sampai ada SVG |

---

## Roadmap (urutan kerja)

- [ ] **Fase 1 — Fondasi:** setup Next.js + TS + Tailwind (perintah di `docs/05`), token warna & font dari `docs/02`, LenisProvider global, komponen motion reusable (`<Reveal>`, `<BlurToFocus>`, `<Counter>`).
- [ ] **Fase 2 — Beranda (urutan section di `docs/04`):** Nav floating pill → Hero → Profil → Mengapa Tiska → Sejarah (GSAP pinned, satu-satunya efek berat) → Layanan → Filosofi (color block emas) → Menu ringkas → Testimoni → Klien → CTA → Footer.
- [ ] **Fase 3 — Halaman lain:** `/menu` (semua kategori dari `docs/03`), `/galeri` (grid + reveal).
- [ ] **Fase 4 — Aset & polish:** ganti placeholder dengan foto asli Tiska, logo klien resmi, SEO metadata, OG image, performa.
- [ ] **Fase 5 — Deploy:** Vercel + DNS Squarespace (langkah di `docs/05`; HATI-HATI jangan sentuh MX record email).

**Item TBD yang mungkin perlu ditanyakan ke Rama saat relevan:** CTA utama (asumsi: WhatsApp 0877-8900-0968 Rakhma), email publik, status email @tiskacatering.com (menentukan DNS), sosmed aktif.
