/**
 * Semua konten website Tiska Catering.
 * Sumber: docs/03-content-copy.md — copy final, JANGAN mengarang ulang.
 * Update teks cukup di file ini, tidak perlu menyentuh komponen.
 */

/** Potongan judul; bagian `italic: true` dirender Instrument Serif italic warna emas. */
export type RichText = { text: string; italic?: boolean; br?: boolean }[];

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
  // CTA utama ke WhatsApp Rita Ariyani (sebelumnya Ida Raodah, resign 2026-09; nomor tetap)
  whatsapp: "0813-8310-8103",
  whatsappNama: "Rita Ariyani",
  whatsappLink: "https://wa.me/6281383108103",
  teleponKantor: "(+62 251) 831 4442",
  email: "catering.tiska@gmail.com",
  emailAlt: "mktg@tiskacatering.com",
  website: "www.tiskacatering.com",
  instagram: "@tiskacatering",
  instagramLink: "https://www.instagram.com/tiskacatering",
  facebookLink: "https://www.facebook.com/tiskacatering/",
  tiktok: "@tiska.catering",
  tiktokLink: "https://www.tiktok.com/@tiska.catering",
  kepemimpinan: [
    { nama: "Bimo Haryo Dewanto", jabatan: "Chief of Ideation" },
    { nama: "Rita Ariyani", jabatan: "Chief Operations Officer" },
  ],
  statistik: [
    { value: 45, suffix: "+", label: "tahun pengalaman" },
    { value: 350, suffix: "+", label: "acara/perayaan per tahun" },
    { value: 8000, suffix: "+", label: "pesanan per bulan" },
    { value: 800, suffix: "+", label: "pilihan menu" },
    { value: 25, suffix: "", label: "karyawan" },
    { value: 1000, suffix: "", label: "M² area dapur" },
    { value: 2500, suffix: "+", label: "tamu dapat dilayani per hari" },
    { value: 50, suffix: "+", label: "personil tersedia per hari" },
  ] satisfies Stat[],
};

/**
 * Tautan WhatsApp dengan pesan pembuka terisi. Tanpa ini chat terbuka kosong:
 * tamu harus menjelaskan sendiri ia datang dari mana, dan tim kehilangan
 * konteks halaman asal percakapan.
 */
export function waLink(pesan: string): string {
  return `${company.whatsappLink}?text=${encodeURIComponent(pesan)}`;
}


// ─── Navigasi ───────────────────────────────────────────────────────────────

export const nav = {
  links: [
    { label: "Profil", href: "/#profil" },
    { label: "Layanan", href: "/layanan" },
    { label: "Menu", href: "/menu" },
    { label: "Kabar", href: "/kabar" },
    { label: "Klien", href: "/#klien" },
    { label: "FAQ", href: "/#faq" },
  ],
  // Keputusan Rama: tombol Kontak di nav → langsung WhatsApp (company.whatsappNama)
  cta: { label: "Kontak", href: waLink("Halo Tiska, saya ingin menanyakan layanan katering.") },
};

// ─── Hero ───────────────────────────────────────────────────────────────────

export const hero = {
  eyebrow: "Catering Service · Sejak 1980",
  judul: [
    { text: "Celebrate " },
    { text: "love", italic: true },
    { text: " with the " },
    { text: "finest ", italic: true, br: true },
    { text: "flavours", italic: true },
  ] satisfies RichText,
  subjudul:
    "Katering premium untuk acara korporat, pernikahan, dan perayaan privat di Jakarta, Bogor, dan sekitarnya — dirawat tiga generasi sejak 1980.",
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

export const visi: string =
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
    value: 45,
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
      "Dari perayaan personal seperti pernikahan dan acara privat, hingga agenda bisnis mulai dari meeting, training, launching, sampai gala korporat. Sebesar apa pun skalanya, fokus kami adalah menjadikan momen Anda berjalan istimewa.",
  },
  {
    value: 8000,
    suffix: "+",
    label: "Pesanan per bulan",
    deskripsi:
      "Skala produksi teruji menjamin ketepatan waktu, kualitas makanan, dan pelayanan yang dapat diandalkan.",
  },
  {
    value: 800,
    suffix: "+",
    label: "Pilihan menu",
    deskripsi:
      "Indonesian, Asian, Western, Mediterranean, Peranakan, Vegetarian; tiap selera dan tema dapat kami sesuaikan.",
  },
];

// ─── Sejarah (timeline — GSAP pinned scrollytelling) ────────────────────────

export const sejarah = {
  eyebrow: "Perjalanan Kami",
  judul: [
    { text: "Tiga generasi, " },
    { text: "satu dedikasi", italic: true, br: true },
  ] satisfies RichText,
};

export const timeline = [
  {
    tahun: "1980",
    judul: "Dari dapur rumahan",
    teks: "Ibu Sri Kadarwati (Ibu Titiek) bersama (alm.) Drg. Hari Poernomo merintis dengan Aneka Kue Tampah Mini, memasok ke katering-katering ternama di Jabodetabek.",
  },
  {
    tahun: "1990",
    judul: "Dari kue ke masakan",
    teks: "Tak lagi sebatas aneka kue — kini menghadirkan beragam masakan, melayani acara rumahan hingga pernikahan besar di gedung-gedung Bogor dan Jakarta.",
  },
  {
    tahun: "2017",
    judul: "Regenerasi & seni baru",
    teks: "Tongkat estafet beralih ke Bimo Haryo Dewanto & Rita Ariyani — rebranding menyeluruh, identitas baru, dan inovasi cita rasa yang lebih modern.",
  },
  {
    tahun: "2019",
    judul: "Kitchen Hub Bintaro",
    teks: "Sempat membuka Kitchen Hub di Bintaro untuk menjangkau klien Jakarta lebih dekat; kini seluruh produksi dipusatkan kembali di dapur Bogor.",
  },
  {
    tahun: "2020",
    judul: "Bertahan & berinovasi",
    teks: "Di tengah pandemi COVID-19, Tiska tetap bertahan dan berinovasi — berkembang di segmen pernikahan melalui kehadiran aneka hampers dan Nasi Keranjang.",
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
    "Dari hari sakral hingga makan siang harian — satu standar premium di setiap skala.",
  semua: { label: "Lihat semua layanan", href: "/layanan" },
};

export const layanan = [
  {
    judul: "Wedding",
    deskripsi:
      "Hari paling sakral Anda, dirancang dengan rasa dan detail yang penuh makna.",
  },
  {
    judul: "Private Event & Party",
    deskripsi:
      "Ulang tahun, syukuran, arisan, hingga perayaan keluarga yang hangat.",
  },
  {
    judul: "Corporate & Institusi",
    deskripsi:
      "Rapat, seminar, gathering, hingga perayaan spesial perusahaan & instansi.",
  },
  {
    judul: "Snack & Lunch Box",
    deskripsi:
      "Kotak praktis dengan rasa premium khas Tiska untuk acara maupun keseharian.",
  },
  {
    judul: "Hampers",
    deskripsi:
      "Bingkisan istimewa untuk berbagi kebahagiaan di momen-momen spesial.",
  },
  {
    judul: "Buffet & Banquet",
    deskripsi:
      "Prasmanan skala besar yang tertata megah untuk perayaan dan jamuan resmi.",
  },
  {
    judul: "Foodstall",
    deskripsi:
      "Stall hidangan interaktif yang menghidupkan suasana — tamu memilih langsung di tempat.",
  },
  {
    judul: "Everyday Meal Catering",
    deskripsi:
      "Makan harian untuk rumah maupun kantor — masakan rumahan yang konsisten dan terpercaya setiap hari.",
  },
  {
    judul: "Fine Dining",
    deskripsi:
      "Sajian plated berkelas dengan table service yang elegan untuk acara istimewa.",
  },
  {
    judul: "Tumpeng",
    deskripsi:
      "Nasi tumpeng untuk syukuran dan tasyakuran — simbol rasa syukur yang tersaji penuh makna.",
  },
  {
    judul: "Tampah",
    deskripsi:
      "Aneka jajan pasar dan hidangan tradisional dalam tampah anyaman bambu — hangat dan membumi.",
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
  // intro memakai copy reasons docs/03 (800+ pilihan menu)
  intro:
    "800+ pilihan menu — Indonesian, Asian, Western, Mediterranean, Peranakan, hingga Vegetarian; tiap selera dan tema dapat kami sesuaikan.",
};

// ─── Galeri Acara (beranda — featured + rail, gaya sinematik) ───────────────

export const galeriAcara = {
  eyebrow: "Portofolio",
  judul: [
    { text: "Momen yang kami " },
    { text: "rayakan", italic: true },
  ] satisfies RichText,
  deskripsi:
    "Sorotan perayaan yang kami layani — dari pernikahan hingga jamuan korporat.",
  cta: { label: "Lihat galeri lengkap", href: "/galeri" },
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

// ─── Halaman /kabar (postingan dari backoffice) ─────────────────────────────
// Daftar postingan dikelola dari /admin (disimpan di Vercel Blob), BUKAN di sini.
// Yang di sini hanya teks tetap halaman.

export const kabarPage = {
  eyebrow: "Kabar & Sorotan",
  judul: [
    { text: "Kabar " },
    { text: "terbaru", italic: true },
  ] satisfies RichText,
  intro:
    "Cerita perayaan, penawaran musiman, dan kabar terbaru dari dapur Tiska Catering.",
  semua: "Semua",
  kategoriLabel: {
    kisah: "Kisah Perayaan",
    promo: "Promo",
    campaign: "Momen Spesial",
    menu: "Menu Musiman",
    kabar: "Kabar",
  } as Record<string, string>,
  kosong: "Belum ada kabar untuk saat ini. Nantikan cerita & penawaran berikutnya.",
  ctaDefaultLabel: "Tanya via WhatsApp",
};

// Section "Sorotan" di beranda — menampilkan 1 postingan unggulan bila ada.
export const sorotan = {
  eyebrow: "Sorotan",
  judul: [
    { text: "Yang sedang " },
    { text: "berlangsung", italic: true },
  ] satisfies RichText,
  semua: "Lihat semua kabar",
  selengkapnya: "Selengkapnya",
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
    id: "mediterranean",
    nama: "Fresh Mediterranean",
    deskripsi: "Hidangan segar khas pesisir Laut Tengah.",
    items: [],
  },
  {
    id: "peranakan",
    nama: "Peranakan Heritage",
    deskripsi:
      "Hidangan hasil akulturasi budaya Tionghoa dengan tradisi Melayu–Nusantara.",
    items: [],
  },
  {
    id: "vegetarian",
    nama: "Wholesome Vegetarian",
    deskripsi: "Sajian sepenuhnya nabati untuk setiap perayaan.",
    items: [],
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
  eyebrow: "800+ Pilihan Menu",
  judul: [
    { text: "Cita rasa " },
    { text: "tanpa batas", italic: true },
  ] satisfies RichText,
  // id harus cocok dengan menuCategories & images.menuRingkas
  tiles: [
    {
      id: "indonesian",
      nama: "Flavorful Indonesian",
      highlight: "Tumpeng, Rujak Pengantin, Nasi Keranjang",
    },
    {
      id: "asian",
      nama: "Delectable Asian",
      highlight: "Dimsum, Vietnamese Pho, Wonton",
    },
    {
      id: "western",
      nama: "Pleasant Western",
      highlight: "Beef & Shrimp Grill, Pasta Special",
    },
    {
      id: "mediterranean",
      nama: "Fresh Mediterranean",
      highlight: "Hidangan segar khas pesisir Laut Tengah",
    },
    {
      id: "peranakan",
      nama: "Peranakan Heritage",
      highlight: "Akulturasi cita rasa Tionghoa & Nusantara",
    },
    {
      id: "vegetarian",
      nama: "Wholesome Vegetarian",
      highlight: "Sajian sepenuhnya nabati untuk setiap perayaan",
    },
    {
      id: "hampers",
      nama: "Festive Hampers",
      highlight: "Bingkisan istimewa untuk setiap momen",
    },
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
  // CATATAN: kutipan Bima Arya & Dedie/Yanti Rachim di bawah masih PLACEHOLDER
  // (ditandai placeholder:true) — ganti dengan kutipan asli sebelum dianggap final.
  daftar: [
    {
      kutipanRich: [
        { text: "Acaranya lancar, tamu-tamu senang. Itu yang " },
        { text: "penting buat kami.", italic: true },
      ] satisfies RichText,
      nama: "Teuku Wisnu & Shireen Sungkar",
      peran: "Acara Peluncuran",
    },
    {
      kutipanRich: [
        { text: "Pernikahan kami berjalan tenang. Buat saya, itu sudah " },
        { text: "lebih dari cukup.", italic: true },
      ] satisfies RichText,
      nama: "Bima Arya",
      peran: "Pernikahan · Bogor",
      placeholder: true,
    },
    {
      kutipanRich: [
        { text: "Open house kami selalu ramai, dan tamu-tamu pulang dengan " },
        { text: "senang.", italic: true },
      ] satisfies RichText,
      nama: "Dedie Rachim & Yanti Rachim",
      peran: "Open House Idulfitri · Bogor",
      placeholder: true,
    },
  ],
};

// ─── Klien (logo wall) ──────────────────────────────────────────────────────

export const klien = {
  eyebrow: "Dipercaya oleh institusi terkemuka",
  judul: [
    { text: "Mereka merayakannya " },
    { text: "bersama kami", italic: true },
  ] satisfies RichText,
  caption:
    "Dari perbankan hingga otomotif, energi hingga teknologi — Tiska dipercaya merayakan momen mereka.",
  daftar: [
    { nama: "BCA", logo: "/logos/klien/bca.svg" },
    { nama: "Bank BRI", logo: "/logos/klien/bank-bri.svg" },
    { nama: "Mandiri", logo: "/logos/klien/mandiri.svg" },
    { nama: "Bank Indonesia", logo: "/logos/klien/bank-indonesia.png" },
    { nama: "OCBC", logo: "/logos/klien/ocbc.svg" },
    { nama: "DBS", logo: "/logos/klien/dbs.svg" },
    { nama: "Bank Raya", logo: "/logos/klien/bank-raya.svg" },
    { nama: "Royal Enfield", logo: "/logos/klien/royal-enfield.svg" },
    { nama: "Pocari Sweat", logo: "/logos/klien/pocari-sweat.png" },
    { nama: "AQUA", logo: "/logos/klien/aqua.png" },
    { nama: "BMW", logo: "/logos/klien/bmw.svg" },
    { nama: "Philips", logo: "/logos/klien/philips.svg" },
    { nama: "Schneider", logo: "/logos/klien/schneider.svg" },
    { nama: "Coca-Cola", logo: "/logos/klien/coca-cola.svg" },
    { nama: "PLN", logo: "/logos/klien/pln.svg" },
    { nama: "Codashop", logo: "/logos/klien/codashop.png" },
    { nama: "Telkom", logo: "/logos/klien/telkom.svg" },
    { nama: "Indosat", logo: "/logos/klien/indosat.svg" },
    { nama: "Astra", logo: "/logos/klien/astra.png" },
    { nama: "Ecolab", logo: "/logos/klien/ecolab.svg" },
    { nama: "Acer", logo: "/logos/klien/acer.svg" },
    { nama: "XL Axiata", logo: "/logos/klien/xl-axiata.svg" },
    { nama: "Pertamina", logo: "/logos/klien/pertamina.svg" },
    { nama: "WCS", logo: "/logos/klien/wcs.svg" },
  ],
};

// ─── FAQ (pertanyaan umum) ──────────────────────────────────────────────────
// Sumber jawaban: catatan Rama. Copy dirapikan agar tenang & ringkas (brand: anggun,
// bukan hard-sell). Angka menu seragam "800+" di seluruh situs (statistik, reasons, menuPage).

/** Satu blok jawaban: paragraf (`p`) atau daftar berlabel (`list`). */
export type FaqBlock =
  | { p: string }
  | { list: { term?: string; text: string }[] };

export type FaqItem = { q: string; a: FaqBlock[] };
export type FaqCategory = {
  id: string;
  label: string;
  ringkas: string;
  items: FaqItem[];
};

export const faqHeader = {
  eyebrow: "Pertanyaan Umum",
  judul: [
    { text: "Hal yang sering " },
    { text: "ditanyakan", italic: true },
  ] satisfies RichText,
  deskripsi:
    "Semua yang perlu Anda tahu sebelum merayakan momen bersama kami — dari layanan dan menu hingga ketentuan biaya. Pilih topik yang Anda butuhkan.",
  ctaTanya: "Masih ada yang ingin ditanyakan?",
  cta: {
    label: "Tanya via WhatsApp",
    href: waLink("Halo Tiska, ada yang ingin saya tanyakan setelah membaca FAQ di situs."),
  },
};

export const faqCategories: FaqCategory[] = [
  {
    id: "layanan",
    label: "Layanan & Acara",
    ringkas: "Jenis acara & bentuk layanan",
    items: [
      {
        q: "Tiska melayani jenis acara apa saja?",
        a: [
          {
            p: "Dari momen privat — pernikahan, lamaran, ulang tahun, hingga syukuran keluarga — sampai agenda korporat, gathering, dan acara institusi berskala besar. Setiap skala kami tangani dengan standar yang sama.",
          },
        ],
      },
      {
        q: "Apa saja bentuk layanan kateringnya?",
        a: [
          { p: "Kami menyiapkan sebelas bentuk layanan agar sesuai kebutuhan acara Anda:" },
          {
            list: [
              { term: "Wedding", text: "Katering pernikahan menyeluruh yang elegan." },
              { term: "Private Event & Party", text: "Ulang tahun, syukuran, arisan, dan momen hangat keluarga." },
              { term: "Corporate & Institusi", text: "Rapat, seminar, gathering, hingga perayaan perusahaan." },
              { term: "Snack & Lunch Box", text: "Solusi praktis berkualitas untuk beragam kebutuhan." },
              { term: "Hampers", text: "Bingkisan eksklusif untuk berbagi kebahagiaan." },
              { term: "Buffet & Banquet", text: "Prasmanan skala besar untuk perayaan dan jamuan resmi." },
              { term: "Foodstall", text: "Stall hidangan interaktif yang menghidupkan suasana acara." },
              { term: "Everyday Meal Catering", text: "Makan harian untuk rumah maupun kantor, konsisten setiap hari." },
              { term: "Fine Dining", text: "Sajian plated berkelas dengan table service." },
              { term: "Tumpeng", text: "Nasi tumpeng untuk syukuran dan tasyakuran." },
              { term: "Tampah", text: "Aneka jajan pasar dalam tampah anyaman bambu." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "pemesanan",
    label: "Pemesanan & Pengiriman",
    ringkas: "Minimum, area, waktu, & cara pesan",
    items: [
      {
        q: "Bagaimana cara memesannya?",
        a: [
          {
            p: "Cukup hubungi tim kami via WhatsApp. Kami akan berdiskusi soal tanggal, jumlah tamu, konsep acara, kebutuhan dan pilihan menu untuk acara Anda, lalu menyiapkan penawaran yang sesuai.",
          },
        ],
      },
      {
        q: "Berapa minimum pemesanannya?",
        a: [
          {
            p: "Minimum 25 pax untuk buffet maupun meal box. Untuk acara yang lebih intim, kami juga dapat melayani mulai 20 pax dengan penyesuaian pada ketentuan Minimum Layanan Service (Service Charge).",
          },
        ],
      },
      {
        q: "Di mana lokasi Tiska, dan area mana saja yang dilayani?",
        a: [
          {
            p: "Dapur pusat kami berada di Kota Bogor — tepatnya Jl. Julang 1 No. 3, Tanah Sereal. Kami melayani pengiriman katering untuk seluruh wilayah Jabodetabek.",
          },
        ],
      },
      {
        q: "Dapur di Kota Bogor — apakah makanan tetap aman dikirim ke Jakarta dan sekitarnya?",
        a: [
          {
            p: "Tentu aman. Jarak tempuh ke area Jabodetabek umumnya 1–2 jam, dan kami menerapkan pengemasan dan logistik yang sesuai standar — makanan tiba dalam keadaan segar, higienis, dan terjaga kualitasnya.",
          },
        ],
      },
      {
        q: "Kapan sebaiknya saya memesan?",
        a: [
          {
            p: "Semakin awal semakin baik agar persiapan maksimal. Sebagai panduan, sebaiknya konfirmasi dilakukan selambat-lambatnya:",
          },
          {
            list: [
              { term: "Acara besar", text: "H-30 — mis. pernikahan atau gala berskala besar." },
              { term: "Acara sedang", text: "H-14." },
              { term: "Acara casual", text: "H-3." },
            ],
          },
          {
            p: "Untuk pesanan mendadak, silakan tetap hubungi admin kami — akan kami usahakan dan diskusikan kemungkinannya.",
          },
        ],
      },
    ],
  },
  {
    id: "menu",
    label: "Menu & Rasa",
    ringkas: "Pilihan, vegetarian, custom, & test food",
    items: [
      {
        q: "Ada berapa banyak pilihan menu, dan masakan apa saja?",
        a: [
          {
            p: "Lebih dari 800 pilihan menu, dengan ragam yang sangat luas — mulai dari hidangan khas Nusantara, Western, Asian, hingga Mediterranean.",
          },
        ],
      },
      {
        q: "Apakah ada menu vegetarian atau menu custom?",
        a: [
          {
            p: "Ada. Kami menyediakan menu vegetarian, dan Anda dapat berdiskusi dengan tim untuk menyusun menu custom sesuai selera atau tema acara.",
          },
        ],
      },
      {
        q: "Bisakah saya test food dulu sebelum memesan?",
        a: [
          {
            p: "Bisa. Demi kenyamanan Anda, hidangan test food juga dapat kami antar langsung ke rumah atau kantor.",
          },
        ],
      },
    ],
  },
  {
    id: "hospitality",
    label: "Hospitality & Live Cooking",
    ringkas: "Fine dining, banquet, & station",
    items: [
      {
        q: "Apakah Tiska melayani plating, banquet service, dan fine dining?",
        a: [
          {
            p: "Ya. Kami berpengalaman menangani fine dining dan banquet dengan standar penyajian berkelas — cocok untuk menjamu tamu VIP maupun VVIP Anda.",
          },
        ],
      },
      {
        q: "Bisakah menghadirkan live cooking seperti Egg Station, Grill, BBQ, atau Steak?",
        a: [
          {
            p: "Bisa. Kami kerap menghadirkan area live cooking interaktif yang membuat suasana santap di acara Anda terasa lebih hidup dan eksklusif.",
          },
        ],
      },
    ],
  },
  {
    id: "biaya",
    label: "Biaya & Ketentuan",
    ringkas: "Service charge, box, & pengiriman",
    items: [
      {
        q: "Apa itu Minimum Layanan Service (Service Charge), dan berapa besarnya?",
        a: [
          {
            p: "Minimum Layanan Service (Service Charge) adalah biaya layanan yang menyesuaikan kebutuhan acara — terpisah dari harga menu makanan. Besarnya mengikuti lokasi acara:",
          },
          {
            list: [
              {
                term: "Bogor & sekitarnya",
                text: "15% dari total, atau minimal Rp1.500.000 — dipilih yang lebih besar.",
              },
              {
                term: "Jabodetabek",
                text: "hingga 21% dari total, atau minimal Rp2.500.000 — dipilih yang lebih besar.",
              },
            ],
          },
        ],
      },
      {
        q: "Apakah ada pajak atau biaya lain di luar harga menu?",
        a: [
          {
            p: "Ya. Seluruh harga dikenakan Pajak Restoran (PB1) 10%, dan harga menu dapat menyesuaikan sewaktu-waktu. Standar layanan berlaku untuk durasi acara 4–6 jam (terhitung sejak tiba di lokasi); untuk acara di luar Jabodetabek dikenakan tambahan bea transportasi sesuai kebutuhan.",
          },
        ],
      },
      {
        q: "Bagaimana dengan cover charge dan kerusakan peralatan?",
        a: [
          {
            p: "Bila venue di luar rekanan kami menerapkan cover charge, akan kami informasikan sesuai kebijakan venue. Kehilangan atau kerusakan peralatan selama acara dihitung sesuai tabel penggantian yang berlaku.",
          },
        ],
      },
      {
        q: "Bagaimana dengan pesanan bentuk box — ada biaya tambahan?",
        a: [
          {
            p: "Tidak ada biaya tambahan. Pesanan khusus bentuk box minimal 25 box dan dikenakan pajak PB1 sebesar 10%.",
          },
        ],
      },
      {
        q: "Apakah ada biaya pengiriman?",
        a: [
          {
            p: "Ya, biaya pengiriman berlaku untuk seluruh area, baik Bogor maupun Jakarta. Besarnya disesuaikan secara adil dengan jarak lokasi acara dan jumlah pesanan Anda.",
          },
        ],
      },
    ],
  },
];

// ─── Sertifikasi (trust strip — sebelum CTA) ────────────────────────────────
// Fakta dari Rama: Tiska bersertifikat Halal & HACCP. Tidak mengarang badan
// penerbit/nomor sertifikat. Emblem = tipografi (ganti logo resmi bila tersedia).

export const sertifikasi = {
  eyebrow: "Standar & Jaminan",
  judul: [
    { text: "Disiapkan dengan " },
    { text: "standar tertinggi", italic: true },
  ] satisfies RichText,
  deskripsi:
    "Setiap hidangan diolah di dapur yang bersertifikat Halal dan menerapkan sistem keamanan pangan HACCP — agar Anda dan para tamu menikmati setiap sajian dengan tenang.",
  items: [
    {
      kind: "halal" as const,
      tag: "Tersertifikasi",
      judul: "Halal Indonesia",
      ket: "Bahan dan seluruh proses dapur sesuai ketentuan kehalalan.",
    },
    {
      kind: "haccp" as const,
      tag: "Bersertifikat",
      judul: "Standar HACCP",
      ket: "Sistem keamanan & higienitas pangan terkontrol di tiap tahap.",
    },
  ],
};

// ─── Tim (Our Team) ─────────────────────────────────────────────────────────
// Sumber: company profile Tiska 2025 ("dewan direksi") + tambahan dari Rama.
// `id` dipakai sebagai kunci slot foto (lihat lib/images.ts → team & /admin/foto).
// Bilingual (ID/EN) menyusul; untuk sekarang konten Bahasa Indonesia.

export type TeamMember = {
  id: string;
  nama: string;
  jabatan: string;
  /** Bio singkat (berbasis peran, bukan klaim pribadi). Edit bebas oleh Rama. */
  bio?: string;
};
export type TeamGroup = {
  id: string;
  label: string;
  /** true = ditampilkan sebagai kartu besar (pimpinan) */
  featured?: boolean;
  members: TeamMember[];
};

export const teamHeader = {
  eyebrow: "Tim Kami",
  judul: [
    { text: "Orang di balik setiap " },
    { text: "perayaan", italic: true },
  ] satisfies RichText,
  // Manifesto budaya — kredibel & profesional tanpa hard-sell (aturan brand docs/03).
  deskripsi:
    "Bagi tim kami, katering adalah keahlian — bukan sekadar pekerjaan. Passionate pada rasa, telaten pada detail, dan tulus dalam setiap pelayanan; itulah yang menjaga standar Tiska selama tiga generasi.",
  /** Nilai yang dipegang tim — ditampilkan sebagai strip editorial. */
  nilai: ["Passion", "Craftsmanship", "Pelayanan tulus", "Konsistensi"],
};

export const teamGroups: TeamGroup[] = [
  {
    id: "pimpinan",
    label: "Pimpinan",
    featured: true,
    members: [
      {
        id: "bimo",
        nama: "Bimo Haryo Dewanto",
        jabatan: "Chief of Ideation",
        bio: "Menjaga arah inovasi Tiska — memastikan setiap pengembangan bisnis dan layanan selalu relevan, tanpa kehilangan nilai fundamental yang telah dijaga selama tiga generasi.",
      },
      {
        id: "rita",
        nama: "Rita Ariyani",
        jabatan: "Chief Operations Officer",
        bio: "Menjadi jiwa di balik setiap sajian Tiska. Melalui sentuhannya, inovasi menu dihidupkan, keindahan dekorasi dirangkai, dan setiap acara terasa begitu personal dengan kualitas rasa yang tak pernah kehilangan nyawanya.",
      },
    ],
  },
  {
    id: "manajemen",
    label: "Manajemen",
    members: [
      {
        id: "ariz",
        nama: "Ariz Rakhma",
        jabatan: "Junior Client Experience Partner",
        bio: "Titik temu pertama bagi setiap cerita yang datang. Mendampingi harapan klien menuju eksekusi nyata, agar mereka menyambut acara istimewanya dengan tenang.",
      },
      {
        id: "reza",
        nama: "Reza Devyan",
        jabatan: "Finance & Accounting",
        bio: "Bukan sekadar mencatat angka, melainkan menjaga standar kualitas dari balik layar. Mengelola anggaran dan bahan baku dengan teliti, memastikan klien selalu mendapatkan rasa dan pengalaman terbaik.",
      },
      {
        id: "ramadan",
        nama: "Ramadan Saputra",
        jabatan: "Creative, Digital & AI Lead",
        bio: "Menjalin kedekatan yang bermakna agar Tiska selalu terhubung dengan klien secara emosional. Melakukan adaptasi pengembangan bisnis dan komunikasi melalui platform digital untuk memastikan setiap langkah yang diambil menjadi solusi utuh bagi pengalaman dan kebutuhan klien.",
      },
    ],
  },
  {
    id: "operasional",
    label: "Dapur & Operasional",
    members: [
      {
        id: "sarinah",
        nama: "Sarinah",
        jabatan: "Head Kitchen",
        bio: "Mengelola dan memimpin tim dapur produksi, serta menjamin standar kualitas dan rasa masakan pada setiap pesanan di berbagai skala acara serta memastikan setiap anggota tim menjalankan perannya dengan semangat melayani.",
      },
      {
        id: "sulistiyowati",
        nama: "Sulistiyowati",
        jabatan: "Head Baker",
        bio: "Bertanggung jawab atas divisi pastry dan bakery, menjaga standar kualitas tekstur, rasa, dan estetika visual pada setiap sajian, sekaligus memimpin pengembangan produk baru untuk merealisasikan ide-ide segar menjadi sajian unggulan yang siap memanjakan pelanggan.",
      },
      {
        id: "yoga",
        nama: "Yoga Gusmantara",
        jabatan: "Kapten",
        bio: "Memimpin tim pelayanan di lapangan, menjaga kelancaran alur acara dari awal hingga selesai, serta memastikan setiap anggota tim bekerja dengan sigap, ramah, dan penuh semangat melayani.",
      },
      {
        id: "asep",
        nama: "Asep Saepulloh",
        jabatan: "Kapten",
        bio: "Memimpin tim pelayanan di lapangan, menjaga kelancaran alur acara dari awal hingga selesai, serta memastikan setiap anggota tim bekerja dengan sigap, ramah, dan penuh semangat melayani.",
      },
      {
        id: "sukir",
        nama: "Sukir Edi Setiyawan",
        jabatan: "Kapten",
        bio: "Memimpin tim pelayanan di lapangan, menjaga kelancaran alur acara dari awal hingga selesai, serta memastikan setiap anggota tim bekerja dengan sigap, ramah, dan penuh semangat melayani.",
      },
    ],
  },
];

// ─── CTA Penutup ────────────────────────────────────────────────────────────

export const cta = {
  eyebrow: "Let's Celebrate Love",
  judul: [
    { text: "Send your " },
    { text: "love", italic: true },
    { text: " now" },
  ] satisfies RichText,
  tombol: {
    label: "Hubungi Kami",
    href: waLink("Halo Tiska, saya ingin mendiskusikan rencana acara saya."),
  },
};

// ─── Footer ─────────────────────────────────────────────────────────────────

export const footer = {
  tagline:
    "Celebrate love with the finest flavours. Melayani perayaan Anda sejak 1980.",
  kolom: {
    navigasi: [
      { label: "Profil", href: "/#profil" },
      { label: "Layanan", href: "/layanan" },
      { label: "Menu", href: "/menu" },
      { label: "Galeri", href: "/galeri" },
      { label: "Klien", href: "/#klien" },
      { label: "FAQ", href: "/#faq" },
    ],
    hubungi: [
      {
        label: `${company.whatsapp} (${company.whatsappNama})`,
        href: company.whatsappLink,
      },
      { label: company.teleponKantor, href: "tel:+622518314442" },
      // Keputusan Rama (11 Jun 2026): kedua email aktif, tampilkan keduanya
      { label: company.email, href: `mailto:${company.email}` },
      { label: company.emailAlt, href: `mailto:${company.emailAlt}` },
      { label: company.website, href: "https://www.tiskacatering.com" },
      { label: company.alamat },
    ],
    ikuti: [
      { label: "Instagram", href: company.instagramLink },
      { label: "Facebook", href: company.facebookLink },
      { label: "TikTok", href: company.tiktokLink },
      { label: "WhatsApp", href: company.whatsappLink },
    ],
  },
  copyright: "© 2026 Tiska Catering Service · Bogor, Indonesia",
};

// ─── Teks antarmuka kecil (label tombol, aria-label, judul kolom) ───────────

export const ui = {
  navBeranda: "Beranda Tiska Catering",
  navWhatsapp: "Hubungi Tiska Catering via WhatsApp",
  navBuka: "Buka menu",
  navTutup: "Tutup menu",
  bahasa: "Bahasa",
  footerNavigasi: "Navigasi",
  footerHubungi: "Hubungi",
  footerIkuti: "Ikuti",
  footerLayanan: "Layanan",
  footerArea: "Area Layanan",
  layananGeser: "Geser atau pakai panah →",
  layananBerikut: "Layanan berikutnya",
  layananSebelum: "Layanan sebelumnya",
  layananTanya: "Tanya layanan ini",
  layananEndEyebrow: "Acara lain?",
  layananEndJudul: "Setiap perayaan punya kebutuhannya sendiri.",
  layananEndTeks: "Ceritakan acara Anda, kami rancang layanan yang paling pas.",
  layananEndCta: "Hubungi kami",
  bukaFoto: "Buka foto sorotan",
  pratinjauFoto: "Pratinjau foto",
  tutup: "Tutup",
  sebelumnya: "Sebelumnya",
  berikutnya: "Berikutnya",
  geserKiri: "Geser kiri",
  geserKanan: "Geser kanan",
  faqNav: "Kategori pertanyaan",
  pimpinan: "Pimpinan",
  jelajahiKategori: "Jelajahi kategori",
  kabarLainnya: "Kabar lainnya",
  kembaliKabar: "← Kembali ke Kabar",
  logoHalal: "Logo Halal Indonesia",
  logoHaccp: "Logo HACCP Certified",
};

// ─── Metadata SEO halaman statis ────────────────────────────────────────────

export const seo = {
  menu: {
    title: "Menu | 800+ Pilihan Hidangan",
    description:
      "Jelajahi 800+ pilihan menu Tiska Catering: Flavorful Indonesian, Delectable Asian, Pleasant Western, Pasta Special, Tumpeng, dan Festive Hampers.",
  },
  galeri: {
    title: "Galeri | Portofolio Perayaan",
    description:
      "Galeri momen perayaan bersama Tiska Catering — pernikahan, acara korporat, buffet, hingga hampers istimewa di Bogor, Jakarta, dan JaDeTaBek.",
  },
  kabar: {
    title: "Kabar | Kisah Perayaan, Promo & Menu Musiman",
    description:
      "Kisah perayaan klien, penawaran musiman, dan menu pilihan dari Tiska Catering untuk perayaan Anda di Jakarta, Bogor, dan sekitarnya.",
  },
};
