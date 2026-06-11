# 02 — Design System

Token ini diturunkan dari prototipe `tiska-v8.html` yang sudah disetujui arahnya. Pertahankan konsistensi.

## Prinsip Visual

1. **Elegan & tenang** — banyak ruang kosong (white/dark space), tipografi besar percaya diri, tidak ramai.
2. **Mix terang & gelap** — selang-seling section gelap (ink) dan terang (paper) untuk ritme. Disukai user.
3. **Foto sebagai bintang** — foto sinematik besar; teks mendukung, bukan menutupi.
4. **Disiplin efek** — sedikit, halus, sempurna. Bukan tumpukan.
5. **Customer is the spotlight** — tunjukkan lewat foto pelanggan & panggung untuk klien, bukan slogan.

## Tipografi

Serif editorial elegan yang senada dengan logo Tiska (ornamental, anggun). **JANGAN ganti ke font tebal-membulat ala Lucci.**

| Peran | Font | Catatan |
|---|---|---|
| Display / Heading | **Fraunces** (variable, opsz 144) | weight 300 untuk heading besar; elegan |
| Aksen italic | **Instrument Serif** (italic) | untuk kata kunci beraksen (mis. *love*, *flavours*) berwarna emas |
| Body / UI / label | **Space Grotesk** | weight 300–500; untuk paragraf, nav, label uppercase |

Google Fonts:
```
Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..600
Instrument+Serif:ital@0;1
Space+Grotesk:wght@300;400;500;600
```

**Pola tipografi khas Tiska:**
- Heading serif besar, lalu satu-dua kata kunci di-italic (Instrument Serif) berwarna emas. Contoh: "Celebrate *love* with the finest *flavours*".
- Label kecil uppercase, letter-spacing lebar (0.18em–0.34em), warna emas atau mint.
- Body Space Grotesk, line-height longgar (1.7–1.9).

## Palet Warna

```css
/* Emas (utama, aksen) */
--gold:        #c4a05a;
--gold-deep:   #a07c34;  /* untuk teks emas di latar terang */
--gold-soft:   #d8b876;  /* untuk teks emas di latar gelap */
--gold-bright: #ecd5a0;

/* Mint/teal (aksen sekunder, dari logo) */
--teal:        #8fc9bf;
--teal-deep:   #5a9a8f;

/* Gelap (ink) — section gelap */
--ink:    #0e0d0a;
--ink-2:  #16140f;
--ink-3:  #211e17;
--ink-4:  #2e2a20;

/* Terang (paper) — section terang */
--paper:     #f6f1e7;
--paper-2:   #e9e0cf;
--paper-bg:  #efe7d6;  /* background section terang */
--paper-ink: #2a2418;  /* teks di latar terang */

/* Garis */
--line:    rgba(196,160,90,0.16);
--line-2:  rgba(196,160,90,0.3);
--line-d:  rgba(42,36,24,0.12);  /* garis di latar terang */
```

**Aturan kontras (penting — masalah di prototipe awal):**
- Di latar gelap: teks `--paper`, aksen `--gold-soft`.
- Di latar terang: teks `--paper-ink`, aksen `--gold-deep`.
- Teks di atas foto: SELALU beri overlay gradien gelap dulu agar terbaca. Jangan biarkan teks menabrak foto/teks belakang.

## Spacing & Layout

- Max-width konten: **1280px**, padding horizontal **40px** (desktop), **24px** (mobile).
- Padding vertikal antar section: **14vh–20vh** (lega, mewah).
- Grid: gunakan 12-kolom untuk layout bento/asimetris.
- Border-radius: **6–8px** untuk kartu/foto (halus, tidak terlalu bulat).

## Komponen Dasar

- **Tombol (btn):** pill (border-radius 100px), border 1px, isi transparan; saat hover, latar emas naik dari bawah + teks jadi gelap + panah bergeser kanan.
- **Nav:** floating pill di tengah atas; jadi kaca buram (backdrop-blur) saat scroll.
- **Tile foto:** overlay gradien, foto sedikit zoom saat hover, nomor urut kecil di pojok.
- **Reason card:** garis emas muncul di atas saat hover.
- **Client plate:** kartu putih di latar terang, naik sedikit + shadow saat hover.
- **Eyebrow label:** garis pendek + teks uppercase kecil + (kadang) garis pendek lagi.

## Logo

- File logo Tiska: horizontal (untuk nav/footer) & vertikal (untuk hero accent). Logo = bingkai berlian ornamental mint + monogram "T" emas + teks "TISKA catering service" emas.
- Logo asli punya background hitam baked-in → **perlu diproses jadi transparan** (sudah dilakukan di prototipe; file PNG transparan tersedia, atau minta versi SVG/transparan ke Muhamad — lihat asset inventory).
- Di nav latar gelap, logo tampil apa adanya. Di latar terang, pastikan kontras cukup.
