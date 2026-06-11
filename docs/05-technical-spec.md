# 05 — Technical Spec

## Stack Final

| Lapisan | Pilihan | Catatan |
|---|---|---|
| Framework | Next.js (App Router) | versi terbaru stabil |
| Bahasa | TypeScript | strict mode |
| Styling | Tailwind CSS | + CSS variables untuk token warna |
| Smooth scroll | Lenis | global, di root layout |
| Animasi reveal | Framer Motion | utama (fade, slide, blur-to-focus, stagger) |
| Animasi berat | GSAP + ScrollTrigger | hanya untuk pinned scrollytelling (section Sejarah) |
| Gambar | next/image | optimasi otomatis, lazy-load |
| Font | next/font (Google) | Fraunces, Instrument Serif, Space Grotesk |
| Deploy | Vercel | |
| Domain | Squarespace → Vercel | lihat bagian Deploy di bawah |

## Setup Awal

```bash
npx create-next-app@latest tiska-catering --typescript --tailwind --app --eslint
cd tiska-catering
npm install lenis framer-motion gsap
```

## Struktur Folder (saran)

```
tiska-catering/
├── app/
│   ├── layout.tsx          # root: font, Lenis provider, metadata global
│   ├── page.tsx            # Beranda (one-page, rakit semua section)
│   ├── menu/page.tsx       # Halaman menu lengkap
│   ├── galeri/page.tsx     # Halaman galeri
│   └── globals.css         # token warna (CSS vars), base styles
├── components/
│   ├── layout/             # Nav, Footer
│   ├── sections/           # Hero, Profil, MengapaTiska, Sejarah, Layanan,
│   │                       #   Filosofi, MenuRingkas, Testimoni, Klien, CTA
│   ├── ui/                 # Button, Eyebrow, Tile, ReasonCard, ClientPlate
│   └── motion/             # Reveal, BlurToFocus, Counter (wrapper Framer Motion)
├── lib/
│   ├── lenis.ts            # setup Lenis
│   └── content.ts          # data terstruktur (dari 03-content-copy.md)
├── public/
│   ├── images/             # foto Tiska (lihat 06-asset-inventory.md)
│   └── logos/              # logo Tiska + logo klien
└── CLAUDE.md + docs/
```

## Konvensi

- **Komponen:** satu komponen per file, PascalCase. Section di `components/sections/`.
- **Data konten:** taruh di `lib/content.ts` sebagai objek/array TypeScript, jangan hardcode di JSX — agar mudah di-update Muhamad.
- **Token warna:** definisikan sebagai CSS variables di `globals.css`, referensikan via Tailwind (extend theme) atau langsung `var(--gold)`.
- **Animasi:** bungkus pola berulang jadi komponen reusable (`<Reveal>`, `<BlurToFocus>`) agar konsisten & rapi.
- **Responsif:** mobile-first. Test breakpoint sm/md/lg. Efek berat degrade di mobile.
- **Reduced motion:** hormati `prefers-reduced-motion`.

## Lenis + GSAP Sinkronisasi (penting)

Saat memakai GSAP ScrollTrigger bersama Lenis, keduanya HARUS disinkronkan agar animasi tidak tersendat:

```ts
// pola sinkronisasi (di setup Lenis)
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

Di Next.js App Router, inisialisasi Lenis di komponen client (`'use client'`) di root layout, atau buat `LenisProvider`. Pastikan cleanup di unmount.

## Performa & SEO

- `next/image` untuk semua foto; sediakan ukuran & alt text deskriptif (ID).
- Metadata per halaman (title, description) — fokus kata kunci: "katering Bogor", "katering pernikahan Jakarta", dll.
- Open Graph image untuk share di WhatsApp/sosmed.
- Foto di-compress sebelum masuk repo (target < 300KB/foto bila bisa).

## Deploy: Vercel + Domain Squarespace

Domain `tiskacatering.com` terdaftar di Squarespace. Website lama (PHP/Niagahoster) ditinggalkan.

**Langkah:**
1. Push repo ke GitHub.
2. Import project ke Vercel → auto-deploy.
3. Di Vercel project → Settings → Domains → tambahkan `tiskacatering.com` dan `www.tiskacatering.com`.
4. Vercel akan memberi instruksi DNS. Untuk apex domain (`tiskacatering.com`) → **A record** ke IP Vercel (default `76.76.21.21`, tapi **pakai nilai yang ditampilkan dashboard Vercel** karena bisa spesifik). Untuk `www` → **CNAME** ke `cname.vercel-dns.com`.
5. Di Squarespace → Domains → DNS settings → tambahkan A record & CNAME sesuai instruksi Vercel.
6. **JANGAN sentuh MX & TXT record** bila email `@tiskacatering.com` dipakai — itu untuk email, mengubahnya merusak email. Hanya tambah/ubah A & CNAME untuk web.
7. Tunggu propagasi DNS (bisa sampai 48 jam, biasanya lebih cepat). Vercel auto-provision SSL setelah verifikasi.

**Alternatif:** arahkan seluruh nameserver Squarespace ke Vercel (metode nameservers). Lebih bersih tapi semua DNS (termasuk email) pindah ke Vercel — kalau dipilih, salin dulu semua record lama (terutama MX email) ke Vercel agar email tidak putus.

> Rekomendasi: pakai metode **A + CNAME** (lebih aman untuk email), kecuali ada alasan kuat pindah nameserver.

## Catatan

- Stack ini sama dengan proyek Atlas milik Muhamad (Next.js + TS) — pengetahuan langsung terpakai.
- Mulai sederhana: bangun beranda dulu dengan foto placeholder, pasang Lenis + reveal, baru tambah GSAP scrollytelling & foto asli.
