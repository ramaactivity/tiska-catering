/**
 * Seluruh teks Bahasa Indonesia untuk Tiska Open Table.
 *
 * CLAUDE.md mewajibkan copy hidup di lib/content.ts, bukan di JSX. File ini
 * memisahkan copy acara dari copy website (lib/content.ts sudah ~980 baris)
 * — aturan intinya tetap: nol string Indonesia di dalam komponen.
 */

import type { RichText } from "@/lib/content";

export const acara = {
  nama: "Tiska Open Table",
  eyebrow: "Undangan Khusus",
  tanggalPanjang: "Rabu, 7 Oktober 2026",
  jam: "18.00 – 21.00 WIB",
  deadlineTampil: "30 September 2026",
  dressCode: "Business / Smart Casual",
  judul: [
    { text: "Tiska " },
    { text: "Open Table", italic: true },
  ] satisfies RichText,
} as const;

/**
 * Naskah undangan WhatsApp. Placeholder: {nama}, {link}.
 * Sengaja ringkas — halamannya yang jadi undangan, pesan ini hanya bel pintu.
 */
export const naskahWa = `Yth. {nama},

Dengan hormat, Tiska Catering mengundang Anda pada *Tiska Open Table* — sesi cicip rasa dan temu kolega yang kami selenggarakan secara terbatas.

Rabu, 7 Oktober 2026 · 18.00 WIB
Plaza Mutiara, Lantai 9 — Mega Kuningan, Jakarta Selatan

Undangan lengkap beserta konfirmasi kehadiran dapat Anda buka di:
{link}

Kami akan berbahagia menyambut kehadiran Anda.

Hormat kami,
Tiska Catering — melayani sejak 1980`;

/** Naskah pengingat untuk tamu yang belum mengonfirmasi. */
export const naskahReminder = `Yth. {nama},

Menyambung undangan kami untuk *Tiska Open Table* pada Rabu, 7 Oktober 2026, kami ingin memastikan tempat duduk Anda tetap tersedia.

Konfirmasi kehadiran dapat dilakukan melalui tautan berikut:
{link}

Terima kasih atas perhatian Anda.

Hormat kami,
Tiska Catering`;

/** Naskah yang dipakai tamu saat mengajak rekannya sendiri. Placeholder: {nama}, {link}. */
export const naskahReferral = `Halo {nama},

Saya ingin mengajak Anda ke *Tiska Open Table* — sesi cicip rasa dan temu kolega dari Tiska Catering, Rabu 7 Oktober 2026 di Plaza Mutiara, Mega Kuningan.

Undangan dan konfirmasi kehadirannya di sini:
{link}

Semoga bisa bertemu di sana.`;

/** Label kolom & tombol di backoffice yang spesifik fitur ini. */
export const adminCopy = {
  imporJudul: "Impor daftar tamu",
  imporPetunjuk:
    "Tempel dari Excel atau Google Sheets. Satu tamu per baris, kolom dipisah titik koma: nama;jabatan;perusahaan;nomor WhatsApp;email. Baris header boleh disertakan, kolom kosong boleh dilewati. Nomor yang sudah terdaftar otomatis dilewati.",
  imporContoh:
    "nama;jabatan;perusahaan;hp;email\nBudi Santoso;Direktur Utama;PT Nusantara Jaya;08123456789;budi@nusantara.co.id",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
//  Isi undangan
//  CATATAN: rundown & menu di bawah masih PLACEHOLDER — menunggu data final
//  dari Rama. Strukturnya sudah siap, tinggal ganti teksnya.
// ─────────────────────────────────────────────────────────────────────────────

export const sampul = {
  eyebrow: "Undangan Khusus",
  kepada: "Kepada Yth.",
  tamuUmum: "Bapak / Ibu Tamu Undangan",
  tombol: "Buka Undangan",
  catatan: "Undangan ini bersifat pribadi dan tidak dapat dipindahtangankan.",
} as const;

export const pembuka = {
  eyebrow: "Salam",
  judul: [
    { text: "Sebuah meja, " },
    { text: "dibuka", italic: true },
    { text: " untuk Anda" },
  ] satisfies RichText,
  paragraf: [
    "Selama lebih dari empat dekade, Tiska hadir di meja-meja perayaan keluarga Indonesia — mendampingi momen yang tidak terulang dua kali.",
    "Tahun ini kami membuka meja kami sendiri. Sebuah sore untuk mencicipi apa yang kami kerjakan, dan bertemu orang-orang yang menggerakkan Jakarta dari kursinya masing-masing.",
    "Kami mengundang Anda untuk duduk bersama kami.",
  ],
  tandaTangan: {
    nama: "Bimo Haryo Dewanto",
    jabatan: "Chief of Ideation, Tiska Catering",
  },
} as const;

export const detail = {
  eyebrow: "Detail Acara",
  judul: [
    { text: "Rabu, " },
    { text: "7 Oktober 2026", italic: true },
  ] satisfies RichText,
  baris: [
    { label: "Waktu", nilai: "18.00 – 21.00 WIB" },
    { label: "Tempat", nilai: "Plaza Mutiara, Lantai 9" },
    { label: "Alamat", nilai: "Jl. Lingkar Mega Kuningan Kav E1.2 No 1&2, Jakarta Selatan" },
    { label: "Busana", nilai: "Business / Smart Casual" },
  ],
  countdownLabel: ["Hari", "Jam", "Menit", "Detik"],
  kalenderTombol: "Simpan ke kalender",
} as const;

export const rundown = {
  eyebrow: "Susunan Acara",
  judul: [
    { text: "Tiga jam, " },
    { text: "tanpa terburu-buru", italic: true },
  ] satisfies RichText,
  item: [
    { jam: "18.00", judul: "Registrasi & Welcome Drink", isi: "Penerimaan tamu dan ramah tamah pembuka." },
    { jam: "18.30", judul: "Sambutan", isi: "Pengantar singkat dari keluarga Tiska." },
    { jam: "18.45", judul: "Open Table", isi: "Sesi cicip rasa — hidangan disajikan bertahap." },
    { jam: "19.45", judul: "Bincang & Temu Kolega", isi: "Ruang untuk berkenalan dan bertukar kabar." },
    { jam: "20.30", judul: "Penutup", isi: "Ramah tamah dan cendera mata." },
  ],
} as const;

export const menuTasting = {
  eyebrow: "Sekilas Hidangan",
  judul: [
    { text: "Yang akan " },
    { text: "kami sajikan", italic: true },
  ] satisfies RichText,
  intro:
    "Enam sajian yang kami pilih untuk mewakili cara Tiska memperlakukan bahan, api, dan waktu.",
  item: [
    { nama: "Kaldu Rempah Bening", isi: "Kaldu jernih, direbus perlahan delapan jam." },
    { nama: "Selat Solo", isi: "Warisan meja Jawa, disusun ulang dengan takaran hari ini." },
    { nama: "Gulai Kambing Muda", isi: "Rempah utuh, disangrai sesaat sebelum ditumis." },
    { nama: "Ikan Bakar Bumbu Kuning", isi: "Dibakar di atas arang, dioles hingga tiga lapis." },
    { nama: "Nasi Liwet Talas", isi: "Ditanak dalam kastrol, ditemani lauk kering." },
    { nama: "Es Cendol Duren", isi: "Penutup yang tidak berpura-pura menjadi hal lain." },
  ],
  catatan: "Susunan hidangan dapat berubah menyesuaikan ketersediaan bahan terbaik hari itu.",
} as const;

export const lokasi = {
  eyebrow: "Lokasi",
  judul: [
    { text: "Plaza Mutiara, " },
    { text: "Lantai 9", italic: true },
  ] satisfies RichText,
  alamat: "Jl. Lingkar Mega Kuningan Kav E1.2 No 1&2, Jakarta Selatan 12950",
  parkir:
    "Parkir tersedia di basement gedung. Tamu undangan dapat menggunakan layanan valet di lobi utama.",
  tombolPeta: "Buka di Google Maps",
  tombolBantuan: "Tanya lokasi ke Rita",
} as const;

export const penutup = {
  judul: [
    { text: "Sampai jumpa di " },
    { text: "meja kami", italic: true },
  ] satisfies RichText,
  isi: "Konfirmasi kehadiran kami tunggu paling lambat 30 September 2026.",
  hormat: "Hormat kami,",
  nama: "Keluarga Tiska Catering",
  sejak: "Melayani sejak 1980",
} as const;

export const rsvpCopy = {
  eyebrow: "Konfirmasi Kehadiran",
  judul: [
    { text: "Kami " },
    { text: "menunggu kabar", italic: true },
    { text: " Anda" },
  ] satisfies RichText,
  intro:
    "Mohon konfirmasi paling lambat 30 September 2026. Kursi terbatas dan kami menyiapkan hidangan sesuai jumlah yang hadir.",
  label: {
    hadir: "Apakah Anda berkenan hadir?",
    hadirYa: "Ya, saya hadir",
    hadirTidak: "Maaf, berhalangan",
    nama: "Nama lengkap",
    jabatan: "Jabatan",
    perusahaan: "Perusahaan",
    hp: "Nomor WhatsApp",
    email: "Email",
    pax: "Jumlah yang hadir",
    paxCatatan: "Termasuk Anda. Maksimal satu pendamping.",
    paxSatuan: "orang",
    pendamping: "Nama pendamping",
    preferensi: "Preferensi makanan",
    preferensiCatatan: "Boleh pilih lebih dari satu, boleh dilewati.",
    alergi: "Alergi atau pantangan",
    alergiPlaceholder: "Mis. alergi udang, tidak makan pedas",
    catatan: "Pesan untuk kami",
    catatanPlaceholder: "Opsional",
  },
  tombol: "Kirim konfirmasi",
  tombolProses: "Mengirim…",
  wajib: "wajib",
  opsional: "opsional",
  suksesHadir: "Terima kasih. Kursi Anda sudah kami siapkan — e-tiket sedang dibuka.",
  suksesWaitlist:
    "Terima kasih. Kursi untuk sesi ini sudah penuh, nama Anda kami tempatkan pada daftar tunggu dan kami kabari begitu ada tempat.",
  suksesTidak: "Terima kasih telah mengabari kami. Semoga ada kesempatan lain.",
  ditutup:
    "Masa konfirmasi telah ditutup. Bila Anda tetap berkenan hadir, silakan hubungi Rita Ariyani secara langsung.",
  lihatTiket: "Lihat e-tiket",
} as const;

export const referralCopy = {
  eyebrow: "Ajak Rekan",
  judul: [
    { text: "Ada nama yang " },
    { text: "sebaiknya ikut", italic: true },
    { text: "?" },
  ] satisfies RichText,
  intro:
    "Malam ini juga tentang siapa yang duduk bersebelahan. Bila ada kolega yang menurut Anda layak berada di meja ini, tuliskan namanya — Anda boleh mengundang sendiri, atau menitipkannya kepada kami.",
  label: {
    nama: "Nama rekan",
    jabatan: "Jabatan",
    perusahaan: "Perusahaan",
    kontak: "Nomor WhatsApp atau email",
    channel: "Siapa yang mengirim undangannya?",
    channelSendiri: "Saya kirim sendiri",
    channelSendiriCatatan: "Pesan undangan disiapkan, tinggal Anda kirim dari WhatsApp Anda.",
    channelTitip: "Titip Tiska",
    channelTitipCatatan: "Tim kami yang menghubungi secara resmi.",
  },
  tombol: "Kirim rekomendasi",
  tombolProses: "Mengirim…",
  tombolWa: "Kirim undangan via WhatsApp",
  tombolEmail: "Kirim undangan via email",
  sukses: "Terima kasih. Rekomendasi Anda sudah kami terima.",
  suksesSendiri: "Pesan undangan sudah siap. Tekan tombol di bawah untuk mengirimnya.",
  tambahLagi: "Rekomendasikan nama lain",
} as const;

export const tiketCopy = {
  eyebrow: "E-Tiket",
  judul: "Tiska Open Table",
  petunjuk: "Tunjukkan QR ini kepada petugas saat tiba di lokasi.",
  kodeLabel: "Kode tiket",
  atasNama: "Atas nama",
  jumlah: "Jumlah",
  orang: "orang",
  waitlistJudul: "Anda berada di daftar tunggu",
  waitlistIsi:
    "Kursi untuk sesi ini telah terisi penuh. Kami akan mengabari Anda secara pribadi begitu ada tempat yang tersedia.",
  declinedJudul: "Konfirmasi Anda tercatat",
  declinedIsi: "Terima kasih telah menyempatkan diri mengabari kami.",
  sudahCheckin: "Sudah check-in",
  ubah: "Ubah atau batalkan",
  kembali: "Buka undangan",
} as const;

export const checkinCopy = {
  cariPlaceholder: "Cari nama atau perusahaan…",
  kodePlaceholder: "Kode tiket, mis. 6v9uyb",
  tombolKode: "Check-in",
  tombolScan: "Pindai QR",
  tombolTutupScan: "Tutup pemindai",
  tombolFoto: "Foto QR",
  tombolCheckin: "Check-in",
  tombolBatal: "Batalkan",
  sudah: "Sudah masuk",
  kosong: "Belum ada tamu terkonfirmasi.",
  tidakKetemu: "Tidak ada yang cocok.",
  izinKamera:
    "Kamera tidak bisa dibuka. Gunakan tombol Foto QR, ketik kode manual, atau cari namanya di daftar.",
  petunjuk:
    "Cara tercepat: cari namanya di daftar lalu ketuk Check-in. Pemindai QR tersedia bila diperlukan.",
} as const;

export const referralAdminCopy = {
  kosong: "Belum ada rekomendasi tamu.",
  jadikanTamu: "Jadikan tamu undangan",
  channelSendiri: "Dikirim sendiri",
  channelTitip: "Dititipkan ke Tiska",
} as const;

export const guestAdminCopy = {
  cariPlaceholder: "Cari nama, perusahaan, atau nomor…",
  filter: {
    all: "Semua",
    "belum-kirim": "Belum dikirim",
    terkirim: "Terkirim",
    dibuka: "Dibuka",
    rsvp: "Sudah RSVP",
    nohp: "Tanpa nomor",
  },
  salinSemua: "Salin semua tautan",
  salinSemuaSelesai: "Tersalin",
  unduhCsv: "Unduh CSV",
  ubah: "Ubah",
  simpan: "Simpan",
  batal: "Batal",
  hapus: "Hapus",
  kirimWa: "Kirim WA",
  kirimEmail: "Kirim email",
  salinTautan: "Salin tautan",
  tersalin: "Tersalin",
  tidakKetemu: "Tidak ada tamu yang cocok dengan pencarian itu.",
} as const;
