# 04 — Sitemap & Section Map

Struktur **hybrid**: satu halaman utama (one-page scroll) + halaman terpisah untuk Menu & Galeri.

## Sitemap

```
/                    Beranda (one-page, semua section utama)
/menu                Menu lengkap (semua kategori + item)
/galeri              Galeri/Portofolio acara (grid foto)
  (opsional nanti)
/kontak              Bisa jadi section di beranda + anchor; halaman terpisah opsional
```

Navigasi utama: Profil · Layanan · Menu · Klien · [Kontak] (anchor scroll di beranda; Menu ke /menu).

---

## Beranda — Urutan Section & Efek

> Efek: **L** = Lenis smooth scroll aktif global. **FM** = Framer Motion. **GSAP** = GSAP ScrollTrigger.
> Prinsip: halus & disiplin. Jangan semua section punya efek heboh — beri ritme.

| # | Section | Konten | Efek yang disarankan | Latar |
|---|---|---|---|---|
| 0 | **Loader** | "Celebrate love" + Est. 1980 | Reveal kata naik (FM), lalu tirai buka ke atas | Gelap |
| 1 | **Hero** | Judul besar, subjudul, CTA, foto sinematik | Parallax foto (scroll-linked), teks staggered masuk (FM) | Gelap + foto |
| 2 | **Profil** | "Setiap perayaan adalah kisah Anda" + 2 foto | **Blur-to-focus reveal** (FM), heading word-by-word | Terang |
| 3 | **Mengapa Tiska** | 4 reason-card dengan angka counter | Counter naik saat masuk (FM), card stagger | Gelap |
| 4 | **Sejarah** | Timeline 1980→2024 di atas foto besar | **GSAP pinned scrollytelling** — foto/section menempel, tahun & teks berganti saat scroll | Gelap + foto |
| 5 | **Layanan** | 4 layanan, bento grid | Tile stagger reveal (FM), foto zoom saat hover | Gelap |
| 6 | **Filosofi** | "Nothing brings people together…" | Color block penuh (emas), teks fade-up (FM) | **Emas (block)** |
| 7 | **Menu (ringkas)** | 4 kategori unggulan + link ke /menu | Bento stagger (FM) | Gelap |
| 8 | **Testimoni** | Kutipan + atribusi | Fade-up halus (FM), glow radial | Gelap |
| 9 | **Klien** | Logo wall (plate putih) | Plate stagger naik (FM) | Terang |
| 10 | **CTA** | "Send your love now" + tombol | Parallax foto, fade-up (FM) | Gelap + foto |
| 11 | **Footer** | Navigasi, kontak, social, "TISKA" raksasa | Reveal sederhana | Gelap |

**Ritme terang-gelap:** Gelap → Terang → Gelap → Gelap → Gelap → Emas → Gelap → Gelap → Terang → Gelap → Gelap. (Variasi cukup; jangan monoton.)

**Catatan pinned scrollytelling (section Sejarah):**
Ini satu-satunya efek "berat" yang disarankan. Foto latar tetap (pinned), sementara tahun (1980 → 1990 → 2017 → 2020 → 2024) dan teksnya berganti seiring user scroll. Ini cara terbaik menceritakan warisan tiga generasi Tiska (terinspirasi twoleavestea & Microsoft AI). Gunakan GSAP ScrollTrigger + pin. Jangan berlebihan; transisi halus.

---

## Halaman /menu

- Hero ringkas: judul "Menu" + intro singkat (250+ pilihan).
- Section per kategori: Flavorful Indonesian, Delectable Asian, Pleasant Western, Pasta Special, Tumpeng, Festive Hampers.
- Tiap kategori: grid foto item + nama (data di `03-content-copy.md`).
- Efek: blur-to-focus reveal per kategori saat scroll (FM). Lenis aktif.
- CTA di akhir: kembali ke kontak.

## Halaman /galeri

- Grid foto acara (pernikahan, korporat, buffet, hampers).
- Efek: masonry/grid dengan reveal stagger; opsional lightbox saat klik.
- Sumber foto: aset asli Tiska (lihat `06-asset-inventory.md`).

---

## Catatan UX

- **Mobile:** semua efek harus degrade dengan anggun. Custom cursor & magnetic JANGAN diandalkan di mobile (tidak ada kursor). Smooth scroll Lenis tetap jalan.
- **Performa:** lazy-load foto (next/image), jangan muat semua foto resolusi penuh sekaligus.
- **Aksesibilitas:** hormati `prefers-reduced-motion` — matikan animasi berat bagi yang membutuhkan.
- **CTA selalu dekat:** tombol kontak/WA mudah dijangkau di nav & beberapa titik.
