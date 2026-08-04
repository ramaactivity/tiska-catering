# 07 — Backoffice "Kabar" (Promo, Campaign, Menu Musiman, Kabar)

Sistem postingan yang bisa di-update berkala dari halaman admin di website sendiri —
**native, tanpa CMS pihak ketiga**. Data & foto disimpan di **Supabase Storage**
(sejak 30 Jun 2026 — menggantikan Vercel Blob yang kena limit Hobby). Free tier:
1 GB storage, 5 GB transfer/bln, tanpa kartu kredit, boleh komersial.

> Prinsip brand tetap dijaga: tampil sebagai "Kabar & Sorotan" yang anggun, bukan
> spanduk diskon. Lihat CLAUDE.md.

---

## Apa yang didapat

| Untuk pengunjung | Untuk admin (Rama) |
|---|---|
| Section **Sorotan** di beranda (1 post unggulan) | `/admin` — daftar semua postingan |
| Halaman **/kabar** (semua post + filter kategori) | `/admin/posts/new` — buat postingan |
| Halaman detail **/kabar/[slug]** | `/admin/posts/[id]` — edit / hapus |
| Tombol aksi tiap post → WhatsApp Ida Raodah | Upload foto, atur terbit/draft & sorotan |

4 kategori: **promo · campaign (Momen Spesial) · menu (Menu Musiman) · kabar**.

---

## Cara pakai (sehari-hari)

1. Buka **tiskacatering.com/admin** → masukkan kata sandi.
2. Klik **+ Tambah** → isi judul, ringkasan, kategori, unggah foto. Opsional: isi
   lengkap, periode (mis. "Berlaku Juni 2026"), teks/link tombol.
3. Centang **Terbitkan** agar tampil di website. Centang **Jadikan sorotan di beranda**
   bila ingin jadi sorotan utama (yang dicentang paling baru yang menang).
4. **Simpan** → langsung tayang. Edit/hapus kapan saja dari `/admin`.

Kalau tidak ada postingan terbit, section Sorotan di beranda otomatis hilang dan
/kabar menampilkan pesan kosong yang rapi — tidak ada tampilan rusak.

---

## Setup PRODUKSI (sekali saja, di dashboard — TANPA CLI)

Tanpa langkah ini, `/admin` belum bisa dipakai di produksi (by default aman: login ditolak).

### 1. Buat bucket di Supabase

Supabase → project Tiska → **Storage** → **New bucket** → nama `tiska-media`,
set **Public** (agar foto bisa dibaca langsung lewat URL publik). Ambil
**Project URL** & **service_role key** di **Settings → API**.

### 2. Tambah environment variable di Vercel

Vercel → project **tiska-catering** → **Settings → Environment Variables**
(scope: Production + Preview):

| Name | Value |
|---|---|
| `SUPABASE_URL` | Project URL Supabase (mis. `https://xxxx.supabase.co`) |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key — **rahasia**, jangan pernah masuk repo |
| `SUPABASE_BUCKET` | `tiska-media` (opsional; ini nilai default) |
| `ADMIN_PASSWORD` | kata sandi login admin (pilih yang kuat) |
| `ADMIN_SESSION_SECRET` | string acak panjang — generate: `openssl rand -hex 32` |

Tanpa `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` lengkap, sistem jatuh ke
filesystem — di Vercel itu read-only, jadi simpan post akan GAGAL.

### 3. Redeploy

Perubahan env baru aktif setelah deploy berikutnya. Karena deploy lewat **git push**
(lihat memory `deploy.md` — JANGAN pakai Vercel CLI), cukup push commit berikutnya,
atau trigger ulang dari dashboard. Setelah live, buka `/admin` dan login.

---

## Catatan teknis

- **Lokal/dev:** tanpa env Supabase, sistem otomatis pakai filesystem (`data/posts.json` +
  `public/uploads/`) supaya bisa dicoba lokal. Keduanya di-`.gitignore` (tidak ikut
  ke produksi). Kata sandi dev default: `tiska-dev`.
- **Keamanan:** sesi = cookie httpOnly bertanda-tangan HMAC (kunci `ADMIN_SESSION_SECRET`),
  berlaku 7 hari. Ganti `ADMIN_SESSION_SECRET` = semua sesi lama langsung gugur.
- **Foto:** maksimal 8 MB, harus file gambar. Di produksi diunggah ke bucket Supabase;
  saat post dihapus, fotonya ikut dihapus (best-effort).
- **Anti-pause Supabase:** project free di-pause bila 7 hari tanpa aktivitas. Cron
  harian `/api/cron/special-days` menyentuh storage tiap hari supaya tetap aktif.
- **Kesegaran:** halaman publik di-revalidate otomatis tiap simpan/hapus, jadi update
  tampil hampir seketika.
- **File terkait:** `lib/storage.ts` (abstraksi Supabase Storage),
  `lib/posts/{types,store,actions}.ts`, `lib/auth.ts`,
  `app/admin/**`, `app/kabar/**`, `components/admin/**`,
  `components/sections/{Sorotan,KabarGrid}.tsx`.
