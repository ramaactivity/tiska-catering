# 01 — Project Brief

## Tentang Tiska Catering

Tiska Catering adalah bisnis katering premium berbasis di Bogor, Jawa Barat, berdiri sejak 1980. Tiga generasi: dirintis Ibu Sri Kadarwati (Ibu Titiek) & Drg. Hari Poernomo dari dapur rumahan, kini diteruskan Bimo Haryo Dewanto (Chief of Ideation) & Rita Ariyani (CEO). Melayani Bogor, Jakarta, dan JaDeTaBek dari satu dapur produksi di Bogor (Kitchen Hub Bintaro sudah tutup).

**Tagline:** *Celebrate love with the finest flavours* / *Let's Celebrate Love*

## Tujuan Website

Website company profile yang:
1. **Mengangkat persepsi brand** ke kelas premium/mewah — sebanding kualitas layanan Tiska yang sebenarnya.
2. **Membangun kepercayaan** lewat sejarah, skala, dan daftar klien kelas atas.
3. **Mendorong kontak/pemesanan** — mengarahkan calon klien menghubungi tim.
4. **Menjadi etalase visual** untuk layanan, menu, dan portofolio acara.

Website ini BUKAN e-commerce, BUKAN sistem pemesanan online dengan login. Ini profil + showcase + lead generation sederhana.

## Audiens Target

- **Pasangan & keluarga** yang merencanakan pernikahan/acara private.
- **Perusahaan & instansi** yang butuh katering korporat (rapat, gathering, gala).
- **Individu** untuk hampers, lunch box, snack box.

Karakter audiens: menghargai kualitas, estetika, dan kepercayaan. Banyak yang mengakses dari mobile — **mobile experience wajib mulus.**

## Fitur (Scope)

**Termasuk:**
- Halaman utama (one-page scroll) dengan section: hero, profil, mengapa Tiska, sejarah, layanan, filosofi, menu (ringkas), testimoni, klien, CTA, footer.
- Halaman terpisah: Menu lengkap, Galeri/Portofolio.
- Smooth scroll & scroll animation (immersive experience).
- CTA kontak (default: WhatsApp ke Rakhma — **TBD: konfirmasi Muhamad**).
- Responsif penuh (desktop + mobile).
- SEO dasar (meta, judul, alt text) — penting agar "katering Bogor / Jakarta" mudah ditemukan.

**Tidak termasuk (untuk versi ini):**
- Sistem login/akun.
- Pembayaran online.
- Dashboard admin / CMS (konten di-hardcode dulu; bisa ditambah CMS nanti jika perlu).
- Blog (bisa ditambah fase berikutnya).

## Definisi Sukses

- Website terasa **elegan & mahal**, bukan template.
- Scroll terasa **smooth & immersive** (seperti referensi Microsoft AI / Lucci).
- **Foto asli Tiska** tampil sebagai bintang.
- Mudah dihubungi; CTA jelas di tiap titik.
- Cepat dimuat, mobile mulus, SEO sehat.
- Live di `tiskacatering.com` via Vercel.

## Konteks Migrasi (penting)

- Domain `tiskacatering.com` terdaftar di **Squarespace** (akun sudah diakses Muhamad; expire 23 Des 2026).
- Website lama berbasis PHP di hosting Niagahoster/Hostinger — **akan ditinggalkan**, tidak dimigrasi.
- Rencana: situs baru (Next.js) → deploy **Vercel** → DNS Squarespace diarahkan ke Vercel.
- Detail teknis migrasi → `05-technical-spec.md`.
