# 07 — Backoffice "Kabar" (Promo, Campaign, Menu Musiman, Kabar)

Sistem postingan yang bisa di-update berkala dari halaman admin di website sendiri —
**native, tanpa CMS pihak ketiga**. Data & foto disimpan di **Vercel Blob** (produk
first-party Vercel, satu atap akun Vercel Tiska).

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

## Setup PRODUKSI (sekali saja, di dashboard Vercel — TANPA CLI)

Tanpa langkah ini, `/admin` belum bisa dipakai di produksi (by default aman: login ditolak).

### 1. Buat Blob store

Vercel → project **tiska-catering** → tab **Storage** → **Create Database** →
**Blob** → beri nama (mis. `tiska-kabar`) → Connect ke project.
Ini otomatis menambahkan env `BLOB_READ_WRITE_TOKEN`. **Wajib** — di produksi data
disimpan di Blob, bukan filesystem.

### 2. Tambah 2 environment variable

Vercel → project → **Settings → Environment Variables** (scope: Production, boleh juga Preview):

| Name | Value |
|---|---|
| `ADMIN_PASSWORD` | kata sandi login admin (pilih yang kuat) |
| `ADMIN_SESSION_SECRET` | string acak panjang — generate: `openssl rand -hex 32` |

### 3. Redeploy

Perubahan env baru aktif setelah deploy berikutnya. Karena deploy lewat **git push**
(lihat memory `deploy.md` — JANGAN pakai Vercel CLI), cukup push commit berikutnya,
atau trigger ulang dari dashboard. Setelah live, buka `/admin` dan login.

---

## Catatan teknis

- **Lokal/dev:** tanpa env Blob, sistem otomatis pakai filesystem (`data/posts.json` +
  `public/uploads/`) supaya bisa dicoba lokal. Keduanya di-`.gitignore` (tidak ikut
  ke produksi). Kata sandi dev default: `tiska-dev`.
- **Keamanan:** sesi = cookie httpOnly bertanda-tangan HMAC (kunci `ADMIN_SESSION_SECRET`),
  berlaku 7 hari. Ganti `ADMIN_SESSION_SECRET` = semua sesi lama langsung gugur.
- **Foto:** maksimal 8 MB, harus file gambar. Di produksi diunggah ke Blob; saat post
  dihapus, fotonya ikut dihapus (best-effort).
- **Kesegaran:** halaman publik di-revalidate otomatis tiap simpan/hapus, jadi update
  tampil hampir seketika.
- **File terkait:** `lib/posts/{types,store,actions}.ts`, `lib/auth.ts`,
  `app/admin/**`, `app/kabar/**`, `components/admin/**`,
  `components/sections/{Sorotan,KabarGrid}.tsx`.
