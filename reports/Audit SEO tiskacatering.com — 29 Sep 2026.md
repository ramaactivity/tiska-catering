# Audit SEO tiskacatering.com — 29 September 2026

Dijalankan dengan plugin `claude-seo` (delapan agent spesialis: teknis, konten,
schema, performa, lokal, GEO/AI, agent-readiness, SXO).

**Skor kesehatan SEO: ±69/100 sebelum perbaikan.** Bukan situs bermasalah —
fondasi teknisnya termasuk rapi. Yang hilang adalah bukti: banyak fakta terbaik
Tiska tertulis di kode tapi tidak pernah sampai ke HTML yang dibaca mesin.

| Kategori | Bobot | Skor |
|---|---|---|
| Teknis | 22% | 78 |
| Kualitas konten | 23% | 62 |
| On-page / SXO | 20% | 65 |
| Schema | 10% | 75 |
| Performa (CWV) | 10% | 75 |
| Kesiapan AI Search | 10% | 66 |
| Gambar | 5% | 60 |

Tanpa kredensial Google API (GSC/GA4/CrUX) dan tanpa DataForSEO, jadi: angka
performa = data lab, posisi ranking = perkiraan, bukan hasil ukur.

---

## Bagian 1 — Sudah dikerjakan & tayang hari ini

### 1.1 Kutipan testimoni palsu atas nama pejabat publik — DIHAPUS

`lib/content.ts` memuat dua kutipan bertanda `placeholder: true`, teks karangan
yang diatasnamakan **Bima Arya** dan **Dedie Rachim & Yanti Rachim**. Penandanya
ada sejak awal, tapi `Testimoni.tsx` merender seluruh daftar tanpa membacanya,
jadi keduanya tayang di homepage produksi. Terverifikasi langsung di HTML live.

Ini risiko hukum dan kepercayaan, bukan sekadar E-E-A-T. Komponen sekarang
menghormati penandanya. Hapus `placeholder: true` setelah kutipan asli diperoleh
dengan izin yang bersangkutan. Konsekuensinya: sekarang tinggal satu testimoni
asli (Teuku Wisnu & Shireen Sungkar) — perlu diisi lagi.

### 1.2 Empat angka andalan tidak pernah terbaca mesin — DIPERBAIKI

`Counter.tsx` memulai dari `useState(0)`, jadi HTML server berbunyi
`0 + Tahun pengalaman`. Terverifikasi: string `45`, `350`, `8000` nol kemunculan
di HTML produksi. Empat fakta paling meyakinkan di situs ini — 45+ tahun,
350+ acara/tahun, 8.000+ pesanan/bulan, 800+ menu — tidak terlihat oleh
GPTBot/ClaudeBot/PerplexityBot maupun pembaca tanpa JavaScript.

Sekarang nilai sebenarnya dirender server; mundur ke 0 terjadi di klien sebelum
animasinya, jadi geraknya tidak berubah. Sudah diverifikasi live.

### 1.3 Beranda 4× lebih lambat dari perlunya — DIPERBAIKI

Lighthouse: TTFB seluler beranda **1,09 detik** vs **0,25 detik** di `/menu`
yang statis; LCP seluler 4,2 detik. Penyebabnya `force-dynamic` mengirim
`cache-control: no-store` — tidak satu pun request kena cache, dan halaman
gagal masuk bfcache.

Delapan halaman publik + sitemap pindah ke ISR. Kesegaran tidak berkurang: tiap
penyimpanan di `/admin` sudah memanggil `revalidatePath`. Sekaligus ketemu bug
diam: cermin `/en` tidak pernah ikut di-revalidate — tidak terasa selama masih
`force-dynamic`, akan terasa setelah ISR. Sudah disamakan di empat file action.

Terverifikasi live: `cache-control: public` dan `x-vercel-cache: HIT`.

### 1.4 Schema: satu entitas, bukan tiga — DIPERBAIKI

`Service` di halaman landing dan `Article` di Kabar masing-masing
mendeklarasikan organisasi baru, jadi Google melihat beberapa "Tiska" terpisah.
Sekarang `@graph` dengan `@id` tetap dan semuanya merujuk ke sana, plus node
`WebSite`. Nomor telepon dibakukan ke E.164 (`+62-251-8314442`), `contactPoint`
kantor + WhatsApp ditambahkan, `areaServed` diperinci sampai Jakarta Selatan.

Tipe `FoodEstablishment` **dipertahankan** — schema.org tidak punya tipe
`Caterer`, dan `Restaurant` menyiratkan makan di tempat. Satu agent menyarankan
`CateringService`, itu keliru: tipe itu tidak ada di schema.org.

### 1.5 Header keamanan — DITAMBAHKAN

`nosniff`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`.
CSP sengaja dilewati: situs ini penuh inline style dari Tailwind/Framer, CSP
yang salah lebih berisiko (situs blank) daripada manfaatnya. Pasang belakangan
lewat `Report-Only` kalau memang mau.

### 1.6 Pipeline deploy yang rusak — DIPERBAIKI

Empat deploy hari ini gagal diam-diam. API Vercel menunjukkan tidak ada satu pun
deployment terbuat, jadi bukan kegagalan build. Log CI:
`Invalid vercel.json - should NOT have additional property "//"`. Vercel
memvalidasi file itu dengan skema ketat dan menolak kunci komentar.

Sekalian dicoba dan gagal: `"regions": ["sin1"]` **tidak tersedia di plan
Hobby**. Ini sayang, karena header `x-vercel-id` menunjukkan request mendarat di
Singapura tapi fungsinya jalan di Virginia — pengunjung Jakarta membayar satu
putaran ke Amerika. Catatannya ditaruh di `deploy.md` untuk dipasang kalau naik
ke Pro.

---

## Bagian 2 — Perlu keputusan kamu

### 2.1 FAQ: 15 dari 17 jawaban tidak ada di DOM

`FAQ.tsx` memakai tab kategori + accordion; `AnimatePresence` melepas kategori
yang tidak aktif. Hasilnya JSON-LD mengumumkan 17 tanya-jawab sementara halaman
cuma memuat 2.

Dua sisi:
- **Google tetap dapat ke-17-nya** lewat JSON-LD, jadi dampak SERP kecil —
  apalagi rich result FAQ sudah dipensiunkan Mei 2026.
- **Perplexity & ChatGPT cuma dapat 2.** Dan ~900 kata jawaban yang bagus —
  termasuk rincian service charge, minimum 25 pax, jendela layanan 4–6 jam —
  tidak terbaca siapa pun kecuali yang mengklik.

Saya **tidak** mengubahnya sendiri: memperbaikinya berarti membongkar animasi
accordion yang sudah rapi, dan itu keputusanmu. Kalau setuju, saya render semua
jawaban di DOM dan sembunyikan lewat CSS — animasinya tetap, isinya terbaca.

### 2.2 Empat pos Kabar masih placeholder 43–58 kata

Terindeks, punya schema `Article` tanpa penulis dan tanpa tanggal terlihat,
dicermin ke `/en/news` yang **kosong sama sekali** tapi tetap ada di sitemap.
Ini kombinasi penanda konten berkualitas rendah yang paling dihindari Google.

Pilih: tulis isi aslinya, atau `noindex` + keluarkan dari sitemap sampai siap.

### 2.3 Banner contoh berbahasa Indonesia tayang di `/en`

Halaman Inggris menampilkan "Layanan Unggulan" dan "Sajian anggun untuk hari
paling istimewa". Sumbernya dua banner *mockup* (`sample-pernikahan`,
`sample-hampers`) yang belum pernah diganti.

Cara tercepat: ganti atau hapus keduanya di `/admin/banners` — itu memang data
contoh. Kalau mau permanen, saya bisa tambahkan kolom Inggris di form banner
seperti yang sudah ada di Kabar.

### 2.4 Judul di Google memposisikan Tiska sebagai katering pernikahan berbahasa Inggris

SERP untuk pencarian merek menampilkan **"Tiska Catering — Celebrate Love with
the Finest Flavours"**. Penyebabnya `og:title` diisi slogan itu dan Google lebih
memilihnya daripada `<title>` yang sudah benar. H1 beranda juga slogan yang sama
— tidak menyebut layanan, kota, maupun tahun.

Untuk bisnis yang fokus utamanya korporat Jakarta, itu jangkar entitas yang
salah. Perbaikannya satu baris, tapi menyentuh slogan brand, jadi saya tunggu
persetujuanmu. Usulan: slogan tetap ada sebagai sub-baris, H1 dan `og:title`
memuat katering + Jakarta + Bogor + sejak 1980.

### 2.5 Company profile PDF sudah dikodekan tapi filenya tidak ada

`LandingPage.tsx` sudah punya gerbang `existsSync` untuk
`/dokumen/company-profile-tiska-catering.pdf` — dan file itu 404. Untuk pembeli
korporat, ini aset paling dicari. Tinggal unggah, kodenya sudah menunggu.

---

## Bagian 3 — Google Business Profile

Kabar baik dari screenshot: kamu ada di **profil yang benar** — Tiska Catering,
4,8★, 33 ulasan, kategori Caterer, "You manage this Business Profile". Tidak ada
duplikat. Deskripsi sudah terpasang.

Yang masih perlu dibenahi, berurutan:

1. **Jam buka masih "Open 24 hours"** — salah, dan Google memakainya untuk
   memutuskan kapan menampilkan bisnismu. Ganti ke jam kantor sebenarnya.
2. **Nomor telepon** — isi (0251) 831 4442 sebagai utama, WhatsApp
   0813-8310-8103 sebagai tambahan.
3. **Kategori tambahan** (3–5, pilih dari dropdown yang tampil, nama kategori
   Google berubah-ubah): Layanan Katering Pernikahan, Katering Acara, Layanan
   Makan Siang Kotak. Jangan tambah kategori toko kue/hampers — itu justru
   mengencerkan kategori utama.
4. **Wilayah layanan** sampai level kota/kecamatan, bukan "Jabodetabek" —
   Google tidak mengenali istilah itu sebagai tempat.
5. **Tautan situs pakai UTM**: `https://tiskacatering.com/?utm_source=gbp` supaya
   trafik dari Maps bisa dibedakan.
6. **Foto minimal 25** yang asli — dapur, hidangan, penataan di lokasi, tim.
7. **Ulasan**: 33 dalam beberapa tahun itu sedikit untuk bisnis 45 tahun.
   Target 10 ulasan baru dalam 60 hari, lalu 1–2 per minggu. Kirim tautan ulasan
   via WhatsApp dari Ida dalam 24–48 jam setelah acara. Jangan beri insentif,
   jangan menyaring hanya klien yang puas — dua-duanya melanggar kebijakan
   Google. Balas semua ulasan dalam 48 jam.

Yang **jangan** dilakukan: menambahkan `aggregateRating` di JSON-LD situs dari
ulasan Google. Rating yang ditulis sendiri di situs sendiri tidak memenuhi
syarat dan berisiko manual action.

---

## Bagian 4 — Celah konten & kata kunci

Temuan paling mahal: **`/area/bogor` cuma skor 53/100 di kandang sendiri.**
45 tahun, dapur pusat, rekanan Puri Begawan — dan halamannya punya empat gambar
yang semuanya logo. Sama untuk `/layanan/katering-pernikahan`: nol foto makanan
di halaman yang keputusannya paling visual.

### Kosakata yang dicari orang tapi tidak ada di situs

| Yang dicari | Yang tertulis di situs |
|---|---|
| prasmanan | "Buffet & Banquet" |
| nasi box / nasi kotak | "meal box", "Nasi Keranjang" — nol kemunculan |
| katering halal jakarta | `/area/jakarta` tidak menyebut halal sama sekali |

"Katering halal Jakarta" adalah kata kunci termurah yang bisa dimenangkan:
SERP-nya paling terpecah, dan Halal + HACCP justru pembeda terkuat yang Tiska
punya.

### Halaman yang belum ada tapi jelas dibutuhkan

- Persilangan **pernikahan × Bogor** (dengan Puri Begawan) — sekarang wedding
  cuma satu dari empat kartu di `/area/bogor`
- **korporat × Jakarta Selatan** (SCBD, Kuningan, TB Simatupang)
- Halaman **prasmanan**
- **`/tentang`** — 45 tahun sejarah, timeline, tim, sertifikasi semuanya cuma
  section di beranda, tidak ada satu URL pun yang bisa dikutip sebagai sumber
- **katering harian kantor** — terdaftar sebagai layanan, tidak punya halaman,
  padahal ini kebutuhan korporat yang paling berulang

Jangan bikin halaman per kecamatan. Google menganggapnya doorway page.

### Soal tidak menampilkan harga

Enam dari delapan SERP target dimenangkan halaman yang mencantumkan rupiah,
beberapa di judulnya. **Tetap jangan tampilkan harga** — dua kata kunci strategis
kamu dimenangkan lewat kredensial, logistik, dan geografi, bukan harga.

Tapi ada yang janggal: satu-satunya angka rupiah di situs sekarang adalah
service charge (15% / min Rp1.500.000 Bogor, sampai 21% / min Rp2.500.000
Jabodetabek) — dan itu terkubur di dalam JSON-LD, tidak terlihat pengguna. Jadi
satu-satunya angka yang kamu publikasikan adalah **biaya tanpa nilai di
sebelahnya**. Itu susunan terburuk dari batasan ini.

Gantinya, tanpa rupiah: naikkan minimum pax (25 buffet/box, 20 fine dining) ke
atas lipatan, buat tangga paket bernama (Klasik / Pilihan / Signature) yang
dibedakan jumlah hidangan dan rasio staf, dan pindahkan komponen biaya ke
halaman — bagian pengadaan butuh komponen biaya untuk PO, dan itu transparansi,
bukan daftar harga.

---

## Bagian 5 — Yang sengaja TIDAK dikerjakan

Agent agent-readiness memberi situs ini **100/100** untuk UX agent: 117 elemen
interaktif semuanya bernama, tidak ada div-onclick, semua input berlabel.
Rekomendasinya: jangan ubah apa pun secara struktural.

Tidak perlu: WebMCP, `ai-catalog.json`, A2A, Web Bot Auth, Markdown content
negotiation, baris Content-Signal (tidak ditegakkan siapa pun), `llms-full.txt`.
Semua itu untuk produk SaaS, bukan katering 25 orang.

`llms.txt` opsional — 15 menit kerja, imbalannya satu audit Lighthouse lewat.
Jangan berharap kutipan darinya.

---

## Urutan pengerjaan yang saya sarankan

**Minggu ini (murah, dampak besar)**
1. Benahi GBP: jam buka, telepon, kategori, wilayah layanan
2. Unggah company profile PDF (kodenya sudah menunggu)
3. Ganti/hapus dua banner contoh yang bikin `/en` campur bahasa
4. Putuskan soal H1 & `og:title` beranda
5. Mulai mesin ulasan Google

**Bulan ini**
6. Foto asli menggantikan Unsplash — terutama `/layanan/katering-pernikahan`
   dan `/area/bogor` yang sekarang nol foto makanan
7. Tulis ulang empat pos Kabar, atau `noindex` sampai siap
8. Tambah "prasmanan", "nasi box", dan halal ke halaman yang relevan
9. Halaman `/tentang`
10. Render semua jawaban FAQ di DOM (setelah kamu setuju)

**Berikutnya**
11. Halaman persilangan: pernikahan × Bogor, korporat × Jakarta Selatan
12. Nomor sertifikat Halal & HACCP di situs — sinyal kepercayaan termurah yang
    tersisa, tinggal menunggu datamu
13. LinkedIn company page (penting untuk pembeli korporat, dan untuk `sameAs`)
14. Set `GOOGLE_API_KEY` supaya audit berikutnya pakai data lapangan CrUX, bukan
    perkiraan lab

---

Temuan mentah per kategori (teknis, konten, schema, performa, lokal, GEO,
agentic, SXO) ada di folder audit sesi ini; minta saja kalau mau salah satunya
dilampirkan utuh.

---

# Pembaruan 30 September 2026 — pengerjaan lanjutan

## Koreksi atas laporan di atas

**Bagian 2.4 keliru.** Agent SXO melaporkan `og:title` berisi slogan Inggris.
Pemeriksaan langsung ke produksi menunjukkan `og:title` dan `<title>` keduanya
sudah versi berkata kunci ("Tiska Catering — Katering Premium Jakarta & Bogor
sejak 1980"). Yang dibaca agent itu `alt` milik OG image, bukan `og:title`.
Tidak ada yang perlu diperbaiki di sana.

Tagline **"Celebrate love with the finest flavours" dipertahankan sebagai H1** —
itu identitas Tiska. Yang diperbaiki hanya subjudul di bawahnya, yang kini
menyebut layanan, kota, dan tahun.

## Selesai dan tayang

| Temuan | Hasil |
|---|---|
| FAQ: 15 dari 17 jawaban tidak di DOM | Panel tidak lagi dilepas, kategori non-aktif dicermin. Tanda tanya terlihat 5 → **20**; H-30, PB1, minimum 25 pax kini terbaca |
| Empat pos Kabar placeholder | Diturunkan jadi draft, diganti **3 artikel asli ID + EN**. `/en/news` tidak lagi kosong |
| Banner Indonesia di `/en` | Banner kini punya kolom Inggris di admin; tanpa terjemahan, banner dilewati di `/en` |
| Tim: 10 dari 11 orang tak terbaca | Cermin teks lengkap ditambahkan |
| Tidak ada halaman `/tentang` | **`/tentang` + `/en/about`** — 909 kata, blok fakta ringkas, masuk sitemap & navigasi |
| Judul promo carousel jadi H2 pertama | Diturunkan jadi `<p>` |
| Artikel tanpa tanggal & breadcrumb | Tanggal terbit terlihat, `mainEntityOfPage`, `BreadcrumbList` |
| Halaman layanan/area tanpa FAQPage | Ditambahkan; remah kedua halaman area yang tadinya tanpa `item` diperbaiki |
| wa.me tanpa konteks | CTA utama kini membawa pesan pembuka sesuai bahasa halaman |
| Logo klien 312 KB | **76 KB** + dimensi eksplisit |
| LCP `/menu` 4,8 detik | Banner kategori pertama diberi `priority` |
| "prasmanan" & "nasi box" absen | Kini muncul sebagai istilah terlihat |
| `/area/jakarta` tak menyebut halal | FAQ halal ditambahkan, ID & EN |
| Tidak ada `llms.txt` | Ditambahkan |

Sitemap: 32 → **36 URL**.

## Masih menunggu dari Rama

Ini tidak bisa dikerjakan tanpa datamu — bukan karena teknis, tapi karena
isinya harus benar:

1. **Foto asli.** Ini yang terbesar. `/layanan/katering-pernikahan` dan
   `/area/bogor` masing-masing punya empat gambar dan **semuanya logo** — nol
   foto makanan di dua halaman yang keputusannya paling visual. Beranda masih
   memakai placeholder Unsplash.
2. **File company profile PDF** → taruh di `public/dokumen/company-profile-tiska-catering.pdf`.
   Kodenya sudah menunggu file itu; begitu ada, tombolnya muncul sendiri di
   halaman layanan.
3. **Nomor sertifikat Halal (BPJPH) dan HACCP.** Sinyal kepercayaan termurah
   yang tersisa. Kode sengaja menolak mengarang nomornya.
4. **Testimoni asli** pengganti dua kutipan yang dihapus.
5. **Google Business Profile**: jam buka masih "Open 24 hours", nomor telepon
   kosong, kategori tambahan belum diisi.
6. **LinkedIn company page** — penting untuk pembeli korporat dan untuk
   `sameAs` di schema.
7. **`GOOGLE_API_KEY`** supaya audit berikutnya memakai data lapangan CrUX dan
   Search Console, bukan perkiraan lab.

## Sengaja tidak dikerjakan

- **CSP.** Situs ini penuh inline style dari Tailwind dan Framer; CSP yang
  salah membuat halaman blank. Empat header keamanan lain sudah terpasang.
- **Halaman per kecamatan.** Google menganggapnya doorway page.
- **`aggregateRating` di JSON-LD.** Rating yang ditulis sendiri di situs
  sendiri tidak memenuhi syarat dan berisiko manual action. Rating datang dari
  Google Business Profile.
- **WebMCP, ai-catalog.json, A2A, Web Bot Auth.** Audit agent-readiness memberi
  situs ini 100/100; semua itu untuk produk SaaS, bukan katering 25 orang.
- **Menampilkan harga.** Tetap tidak ditampilkan, sesuai keputusan. Sebagai
  gantinya komponen biaya kini dijelaskan terbuka lewat artikel
  "Membaca Biaya Katering".
