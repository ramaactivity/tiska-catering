# Tiska Open Table — Panduan Operasional

Undangan digital untuk **Tiska Open Table**, Rabu 7 Oktober 2026, 18.00–21.00 WIB
di Plaza Mutiara Lantai 9, Mega Kuningan.

- **Tautan undangan:** `https://tiskacatering.com/open-table`
- **Dashboard:** `https://tiskacatering.com/admin/open-table`
- **Kapasitas:** 60 kursi · **PIC:** Ida Raodah (0813-8310-8103)
- **Batas RSVP:** 30 September 2026

---

## 1. Yang sudah siap

| Bagian | Keterangan |
|---|---|
| Halaman undangan | Sampul terkunci → dibuka → surat, detail acara, hitung mundur, rundown, sekilas hidangan, lokasi, RSVP, ajak rekan, penutup |
| Simpan ke kalender | Google Calendar + berkas `.ics` untuk Apple/Outlook |
| RSVP | Hadir/tidak, jumlah orang, jabatan & perusahaan, preferensi makanan, alergi, catatan |
| Kapasitas | Otomatis: penuh → masuk daftar tunggu. Admin bisa menimpa manual |
| E-tiket + QR | Terbit otomatis setelah konfirmasi hadir |
| Check-in | Cari nama · ketik kode · foto QR · pindai kamera |
| Ajak rekan | Tamu kirim sendiri (WA/email siap pakai) atau titip ke Tiska |
| Kirim undangan | WhatsApp satu klik per tamu, dan email massal |
| Ekspor | CSV daftar RSVP lengkap |

**Database sudah dipasang** di Supabase (tabel `open_table_*`). Berkas skemanya ada
di `db/open-table.sql` bila suatu saat perlu dijalankan ulang — aman diulang.

---

## 2. Yang masih perlu dilakukan

### a) Verifikasi domain di Resend — supaya email undangan bisa terkirim

Tanpa ini, email hanya bisa masuk ke inbox pemilik akun Resend. WhatsApp tetap jalan.

1. Buka [resend.com/domains](https://resend.com/domains) → **Add Domain** → isi `tiskacatering.com`.
2. Resend menampilkan 3 record. Tambahkan di **Squarespace → Settings → Domains → DNS**:

   | Tipe | Host | Isi |
   |---|---|---|
   | `MX` | `send` | (nilai dari Resend, prioritas 10) |
   | `TXT` | `send` | `v=spf1 include:amazonses.com ~all` |
   | `TXT` | `resend._domainkey` | (kunci DKIM panjang dari Resend) |

   ⚠️ **JANGAN sentuh MX di root (`@`)** — itu Google Workspace, email
   @tiskacatering.com akan mati. Record Resend semuanya di host `send`,
   jadi tidak bentrok.
   ⚠️ **JANGAN tambah TXT SPF kedua di root.** Kalau di root sudah ada
   `v=spf1 include:_spf.google.com ~all`, biarkan apa adanya. Dua record SPF
   di host yang sama membuat keduanya invalid dan semua email gagal.

3. Tunggu Resend menandai domainnya **Verified** (biasanya menit, kadang jam).
4. Tambahkan env di **Vercel → Settings → Environment Variables** (Production):
   ```
   OPEN_TABLE_FROM=Tiska Open Table <undangan@tiskacatering.com>
   OPEN_TABLE_NOTIFY_TO=mktg@tiskacatering.com
   ```
5. Uji: kirim email undangan ke alamat sendiri dulu. Di Gmail buka
   **Show original** → pastikan SPF dan DKIM tertulis **PASS**, dan emailnya
   tidak mendarat di tab Promotions.

### b) Isi yang masih placeholder

| Item | Ada di berkas |
|---|---|
| Rundown per jam | `lib/opentable/content.ts` → `rundown` |
| Menu tasting (6 hidangan) | `lib/opentable/content.ts` → `menuTasting` |
| Teks surat pembuka & penanda tangan | `lib/opentable/content.ts` → `pembuka` |
| Detail parkir Plaza Mutiara | `lib/opentable/content.ts` → `lokasi` |
| Dress code | `lib/opentable/content.ts` → `acara.dressCode` |
| Foto sampul, hidangan, gedung | `lib/opentable/images.ts` (masih Unsplash) |
| Musik latar | Taruh berkas di `public/open-table/`, lalu isi `MUSIK_SRC` di `lib/opentable/config.ts`. Pakai trek **berlisensi** (Epidemic/Artlist), bukan lagu komersial |

### c) Daftar 50 tamu

Format satu baris per tamu, dipisah titik koma:
```
nama;jabatan;perusahaan;nomor WhatsApp;email
Budi Santoso;Direktur Utama;PT Nusantara Jaya;08123456789;budi@nusantara.co.id
```
Tempel di **Dashboard → Daftar Undangan → Impor daftar tamu**. Baris header boleh
disertakan. Nomor yang sudah terdaftar otomatis dilewati.

---

## 3. Cara pakai dashboard

**Daftar Undangan** — impor tamu, lalu tiap baris punya *Salin tautan*,
*Kirim WA* (membuka WhatsApp dengan pesan siap kirim), dan *Kirim email*.
Statusnya jalan sendiri: Belum dikirim → Terkirim → Dibuka (beserta berapa
kali) → Sudah RSVP.

**RSVP Masuk** — filter per status, ubah status manual (mis. menaikkan orang
dari daftar tunggu), *Kirim pengingat* ke yang belum konfirmasi, dan
*Unduh CSV* untuk dapur & seating.

**Referral** — nama yang direkomendasikan tamu, lengkap dengan siapa
perujuknya. Tombol *Jadikan tamu undangan* memindahkannya ke daftar resmi.

**Check-in** — buka di HP saat hari-H. Paling cepat: ketik nama di kolom cari
lalu ketuk **Check-in**. Kalau mau memindai QR, tekan *Pindai QR*. Kalau kamera
bermasalah, ada *Foto QR* dan kolom kode manual. Scan kedua kalinya tidak
menimpa jam masuk, jadi aman diulang.

---

## 4. Catatan teknis

- Halaman undangan **noindex** dan tidak ada di sitemap — hanya bisa dibuka
  lewat tautan yang dibagikan.
- Personalisasi lewat `?to=Nama&k=kode`. Tanpa parameter itu undangan tetap
  utuh, hanya sapaannya jadi umum.
- Kapasitas dihitung di dalam Postgres dengan advisory lock — dua tamu yang
  menekan Kirim di detik yang sama tidak bisa merebut kursi yang sama.
- Kalau tautan bocor dan kena spam: set `WAJIB_KODE = true` di
  `lib/opentable/config.ts`, form RSVP hanya muncul untuk pemegang kode sah.
