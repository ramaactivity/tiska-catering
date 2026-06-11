/**
 * Semua konten website Tiska Catering.
 * Sumber: docs/03-content-copy.md — copy final, JANGAN mengarang ulang.
 * Update teks cukup di file ini, tidak perlu menyentuh komponen.
 */

/** Potongan judul; bagian `italic: true` dirender Instrument Serif italic warna emas. */
export type RichText = { text: string; italic?: boolean }[];

export type Stat = { value: number; suffix: string; label: string };

// ─── Data Perusahaan (fakta — jangan diubah) ────────────────────────────────

export const company = {
  nama: "Tiska Catering",
  namaLengkap: "Tiska Catering Service",
  berdiri: 1980,
  tagline: "Celebrate love with the finest flavours",
  taglineAlt: "Let's Celebrate Love",
  lokasi: "Bogor, Jawa Barat",
  alamat:
    "Jl. Julang 1 No.3, RT.02/RW.06, Tanah Sereal, Kota Bogor, Jawa Barat 16161",
  dapurKedua: "Kitchen Hub, Bintaro, Tangerang Selatan",
  whatsapp: "0877-8900-0968",
  whatsappNama: "Rakhma",
  // TBD (konfirmasi Rama): CTA utama diasumsikan ke WhatsApp Rakhma
  whatsappLink: "https://wa.me/6287789000968",
  teleponKantor: "(+62 251) 831 4442",
  email: "catering.tiska@gmail.com",
  emailAlt: "mktg@tiskacatering.com",
  website: "www.tiskacatering.com",
  instagram: "TISKA Catering Service",
  kepemimpinan: [
    { nama: "Bimo Haryo Dewanto", jabatan: "Chief of Ideation" },
    { nama: "Rita Ariyani", jabatan: "Chief Executive Officer" },
  ],
  statistik: [
    { value: 35, suffix: "+", label: "tahun pengalaman" },
    { value: 350, suffix: "+", label: "acara/perayaan per tahun" },
    { value: 10000, suffix: "+", label: "pesanan per bulan" },
    { value: 250, suffix: "+", label: "pilihan menu" },
    { value: 25, suffix: "", label: "karyawan" },
    { value: 1000, suffix: "", label: "M² area dapur" },
    { value: 2500, suffix: "+", label: "tamu dapat dilayani per hari" },
    { value: 50, suffix: "+", label: "personil tersedia per hari" },
  ] satisfies Stat[],
};

// ─── Navigasi ───────────────────────────────────────────────────────────────

export const nav = {
  links: [
    { label: "Profil", href: "/#profil" },
    { label: "Layanan", href: "/#layanan" },
    { label: "Menu", href: "/menu" },
    { label: "Klien", href: "/#klien" },
  ],
  cta: { label: "Kontak", href: "/#kontak" },
};

// ─── Hero ───────────────────────────────────────────────────────────────────

export const hero = {
  eyebrow: "Catering Service · Sejak 1980",
  judul: [
    { text: "Celebrate " },
    { text: "love", italic: true },
    { text: " with the finest " },
    { text: "flavours", italic: true },
  ] satisfies RichText,
  subjudul:
    "Tiga generasi menghadirkan rasa istimewa untuk perayaan Anda — di Bogor, Jakarta, dan sekitarnya.",
  cta: { label: "Jelajahi Menu", href: "/menu" },
};

// ─── Profil / Tentang ───────────────────────────────────────────────────────

export const profil = {
  eyebrow: "Tentang Tiska",
  judul: [
    { text: "Setiap perayaan adalah " },
    { text: "kisah Anda.", italic: true },
  ] satisfies RichText,
  body: "Sejak 1980, kami percaya hidangan terbaik bukan yang paling megah — melainkan yang membuat tamu Anda merasa diistimewakan. Kami menyajikan cinta dalam setiap detail, agar momen Andalah yang menjadi sorotan.",
};

export const visi =
  "Menciptakan dan memberikan pengalaman layanan katering aneka hidangan yang penuh makna — dalam merayakan cinta, mempererat ikatan, dan menyatukan setiap individu — dengan standar premium kualitas rasa dan penggunaan bahan sesungguhnya, diikuti pelayanan sepenuh hati pada setiap perayaan istimewa di mana pun acara berada.";

export const misi = [
  "Menciptakan menu berkualitas tinggi yang merayakan kekayaan kuliner Indonesia.",
  "Memberikan pelayanan hangat, profesional, dan terpercaya.",
  "Mengasah keterampilan tim lewat pelatihan berkelanjutan.",
  "Membangun lingkungan kerja positif dan kolaboratif.",
  "Menerapkan sistem & teknologi efisien untuk pelayanan yang lancar dan tepat waktu.",
];

// ─── Mengapa Tiska (reason-why) ─────────────────────────────────────────────

export const mengapa = {
  judul: [
    { text: "Mengapa memilih " },
    { text: "Tiska", italic: true },
  ] satisfies RichText,
  deskripsi:
    "Bukan sekadar angka — melainkan kepercayaan yang tumbuh selama tiga generasi.",
};

export const reasons = [
  {
    value: 35,
    suffix: "+",
    label: "Tahun pengalaman",
    deskripsi:
      "Resep warisan tiga generasi, konsisten sejak 1980; rasa yang bisa Anda percaya.",
  },
  {
    value: 350,
    suffix: "+",
    label: "Acara per tahun",
    deskripsi:
      "Dari pernikahan intim hingga gala korporat, setiap skala terasa istimewa.",
  },
  {
    value: 10000,
    suffix: "+",
    label: "Pesanan per bulan",
    deskripsi:
      "Skala produksi teruji menjamin ketepatan dan kualitas, sebanyak apa pun tamu.",
  },
  {
    value: 250,
    suffix: "+",
    label: "Pilihan menu",
    deskripsi:
      "Indonesian, Asian, Western; tiap selera dan tema dapat kami sesuaikan.",
  },
];

// ─── Sejarah (timeline — GSAP pinned scrollytelling) ────────────────────────

export const sejarah = {
  eyebrow: "Perjalanan Kami",
  judul: [
    { text: "Tiga generasi, " },
    { text: "satu dedikasi", italic: true },
  ] satisfies RichText,
};

export const timeline = [
  {
    tahun: "1980",
    judul: "Dari dapur rumahan",
    teks: "Ibu Sri Kadarwati (Ibu Titiek) bersama Drg. Hari Poernomo merintis dengan Aneka Kue Tampah Mini, memasok katering ternama di Bogor & Jakarta.",
  },
  {
    tahun: "1990",
    judul: "Era katering masakan",
    teks: "Berkembang melayani dari acara rumahan hingga pernikahan besar di gedung-gedung Bogor dan Jakarta.",
  },
  {
    tahun: "2017",
    judul: "Regenerasi & seni baru",
    teks: "Bimo Haryo Dewanto & Rita Ariyani menghadirkan sentuhan seni dan cita rasa baru, mendirikan Kitchen Hub di Bintaro.",
  },
  {
    tahun: "2020",
    judul: "Bertahan & berinovasi",
    teks: "Di tengah pandemi, pulih lewat inovasi ritel — peluncuran Hampers “Nasi Keranjang”.",
  },
  {
    tahun: "2024",
    judul: "Pertumbuhan pesat",
    teks: "Menu inovatif disambut hangat; kemitraan strategis memperluas jangkauan ke seluruh JaDeTaBek.",
  },
];

// ─── Layanan ────────────────────────────────────────────────────────────────

export const layananHeader = {
  judul: [
    { text: "Layanan " },
    { text: "kami", italic: true },
  ] satisfies RichText,
  deskripsi:
    "Empat layanan, satu standar — premium di setiap skala perayaan.",
};

export const layanan = [
  {
    judul: "Private, Wedding & Party",
    deskripsi: "Untuk setiap tawa, pelukan, dan perayaan.",
  },
  {
    judul: "Corporate & Institusi",
    deskripsi:
      "Rapat, seminar, gathering, hingga perayaan spesial perusahaan.",
  },
  {
    judul: "Buffet & Foodstall",
    deskripsi:
      "Sajian prasmanan dan foodstall interaktif yang menggugah selera.",
  },
  {
    judul: "Retail, Snack Box & Lunch Box",
    deskripsi: "Solusi praktis dengan rasa premium khas Tiska.",
  },
];

export const prioritas = [
  "Kustomisasi Menu Personal & Eksklusif",
  "Layanan Istimewa, Reliable & Professional",
  "Pemilihan Bahan Premium & Berkualitas",
  "Kemudahan & Fleksibilitas dalam Perencanaan",
];

// ─── Halaman /menu ──────────────────────────────────────────────────────────

export const menuPage = {
  eyebrow: "Tiska Catering · Sejak 1980",
  judul: [
    { text: "Menu " },
    { text: "kami", italic: true },
  ] satisfies RichText,
  // intro memakai copy reasons docs/03 (250+ pilihan menu)
  intro:
    "250+ pilihan menu — Indonesian, Asian, Western; tiap selera dan tema dapat kami sesuaikan.",
};

// ─── Halaman /galeri ────────────────────────────────────────────────────────

export const galeriPage = {
  eyebrow: "Portofolio",
  judul: [
    { text: "Galeri " },
    { text: "perayaan", italic: true },
  ] satisfies RichText,
  // intro memakai prinsip brand docs/01-03
  intro:
    "Momen-momen yang kami rayakan bersama pelanggan — pernikahan, acara korporat, hingga bingkisan istimewa.",
};

// ─── Menu (kategori lengkap untuk /menu; ringkasan dipakai di beranda) ──────

export const menuCategories = [
  {
    id: "indonesian",
    nama: "Flavorful Indonesian",
    items: [
      "Bakso",
      "Sate",
      "Asinan Sayur",
      "Nasi Keranjang",
      "Rujak Pengantin",
      "Mie Goreng",
    ],
  },
  {
    id: "asian",
    nama: "Delectable Asian",
    items: [
      "Dimsum",
      "Beef Tongue",
      "Vietnamese Beef Pho",
      "Hongkong Meatball Soup",
      "Fried Thai Spring Roll",
      "Wonton Soup",
    ],
  },
  {
    id: "western",
    nama: "Pleasant Western",
    items: [
      "Mashed Potato",
      "Beef & Shrimp Grill",
      "Chicken Quesadilla",
      "Vegetarian Platter",
      "Mix Veggies Thousand Salad",
    ],
  },
  {
    id: "pasta",
    nama: "Pasta Special",
    items: ["Lasagna", "White Spaghetti", "Macaroni Schotel", "Potato Schotel"],
  },
  {
    id: "tumpeng",
    nama: "Tumpeng",
    deskripsi: "Untuk perayaan tradisional.",
    items: [],
  },
  {
    id: "hampers",
    nama: "Festive Hampers",
    deskripsi: "Bingkisan istimewa — termasuk Nasi Keranjang.",
    items: [],
  },
];

// ─── Menu ringkas (beranda — 4 kategori unggulan, link ke /menu) ────────────

export const menuRingkas = {
  eyebrow: "250+ Pilihan Menu",
  judul: [
    { text: "Cita rasa " },
    { text: "tanpa batas", italic: true },
  ] satisfies RichText,
  tiles: [
    {
      nama: "Flavorful Indonesian",
      highlight: "Tumpeng, Rujak Pengantin, Nasi Keranjang",
    },
    { nama: "Delectable Asian", highlight: "Dimsum, Vietnamese Pho, Wonton" },
    { nama: "Pleasant Western", highlight: "Beef & Shrimp Grill, Pasta Special" },
    { nama: "Festive Hampers", highlight: "Bingkisan istimewa untuk setiap momen" },
  ],
  cta: { label: "Lihat Menu Lengkap", href: "/menu" },
};

// ─── Filosofi (pull quote — color block emas) ───────────────────────────────

export const filosofi = {
  quote: [
    { text: "Nothing brings people together " },
    { text: "like good food.", italic: true },
  ] satisfies RichText,
  body: "Makanan mempererat hubungan melalui percakapan hangat — itulah cara kami merayakan setiap momen istimewa Anda.",
};

// ─── Testimoni ──────────────────────────────────────────────────────────────
// Catatan integritas: JANGAN mengarang kutipan dramatis baru (docs/03).

export const testimoni = {
  eyebrow: "Dari mereka yang mempercayakan momennya",
  kutipan:
    "Hidangan yang mengesankan, kehangatan yang membuat hari pernikahan kami terasa sempurna.",
  kutipanRich: [
    { text: "Hidangan yang " },
    { text: "mengesankan,", italic: true },
    { text: " kehangatan yang membuat hari pernikahan kami terasa " },
    { text: "sempurna.", italic: true },
  ] satisfies RichText,
  kutipanAsli: "Puas banget, makanannya enak.",
  nama: "Teuku Wisnu & Shireen Sungkar",
  peran: "Klien Pernikahan",
};

// ─── Klien (logo wall) ──────────────────────────────────────────────────────

export const klien = {
  eyebrow: "Dipercaya oleh institusi terkemuka",
  judul: [
    { text: "Mereka merayakan " },
    { text: "bersama kami", italic: true },
  ] satisfies RichText,
  caption:
    "Dari perbankan hingga otomotif, energi hingga teknologi — Tiska dipercaya merayakan momen mereka.",
  daftar: [
    "BCA",
    "Bank BRI",
    "Mandiri",
    "Bank Indonesia",
    "OCBC",
    "DBS",
    "Bank Raya",
    "Royal Enfield",
    "Pocari Sweat",
    "AQUA",
    "BMW",
    "Philips",
    "Schneider",
    "Coca-Cola",
    "PLN",
    "Codashop",
    "Telkom",
    "Indosat",
    "Astra",
    "Ecolab",
    "Acer",
    "XL Axiata",
    "Pertamina",
    "WCS",
  ],
};

// ─── CTA Penutup ────────────────────────────────────────────────────────────

export const cta = {
  eyebrow: "Let's Celebrate Love",
  judul: [
    { text: "Send your " },
    { text: "love", italic: true },
    { text: " now" },
  ] satisfies RichText,
  tombol: { label: "Hubungi Kami", href: company.whatsappLink },
};

// ─── Footer ─────────────────────────────────────────────────────────────────

export const footer = {
  tagline:
    "Celebrate love with the finest flavours. Melayani perayaan Anda sejak 1980.",
  kolom: {
    navigasi: [
      { label: "Profil", href: "/#profil" },
      { label: "Layanan", href: "/#layanan" },
      { label: "Menu", href: "/menu" },
      { label: "Galeri", href: "/galeri" },
      { label: "Klien", href: "/#klien" },
    ],
    hubungi: [
      { label: company.whatsapp, href: company.whatsappLink },
      { label: company.teleponKantor, href: "tel:+622518314442" },
      { label: company.email, href: `mailto:${company.email}` },
      { label: company.website, href: "https://www.tiskacatering.com" },
      { label: company.alamat },
    ],
    ikuti: [
      // TBD: handle Instagram/Facebook resmi belum dikonfirmasi (docs/06)
      { label: "Instagram", href: "#" },
      { label: "Facebook", href: "#" },
      { label: "WhatsApp", href: company.whatsappLink },
    ],
  },
  copyright: "© 2026 Tiska Catering Service · Bogor, Indonesia",
};
