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
  // Keputusan Rama (11 Jun 2026): CTA utama ke WhatsApp Ida Raodah
  whatsapp: "0813-8310-8103",
  whatsappNama: "Ida Raodah",
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
    { nama: "Rita Ariyani", jabatan: "Chief Executive Officer" },
  ],
  statistik: [
    { value: 35, suffix: "+", label: "tahun pengalaman" },
    { value: 350, suffix: "+", label: "acara/perayaan per tahun" },
    { value: 10000, suffix: "+", label: "pesanan per bulan" },
    { value: 800, suffix: "+", label: "pilihan menu" },
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
    { label: "Kabar", href: "/kabar" },
    { label: "Klien", href: "/#klien" },
    { label: "FAQ", href: "/#faq" },
  ],
  // Keputusan Rama: tombol Kontak di nav → langsung WhatsApp Ida Raodah
  cta: { label: "Kontak", href: company.whatsappLink },
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
    value: 800,
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
    "Dari hari sakral hingga makan siang harian — satu standar premium di setiap skala.",
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
    judul: "Buffet, Banquet & Foodstall",
    deskripsi:
      "Prasmanan skala besar dan foodstall interaktif yang menggugah selera.",
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
    "800+ pilihan menu — Indonesian, Asian, Western, hingga Mediterranean; tiap selera dan tema dapat kami sesuaikan.",
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
    "Semua yang perlu Anda tahu sebelum merayakan momen bersama kami — dari layanan dan menu hingga ketentuan biaya. Pilih topik di samping.",
  ctaTanya: "Masih ada yang ingin ditanyakan?",
  cta: { label: "Tanya via WhatsApp", href: company.whatsappLink },
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
          { p: "Kami menyiapkan sepuluh bentuk layanan agar sesuai kebutuhan acara Anda:" },
          {
            list: [
              { term: "Wedding", text: "Katering pernikahan menyeluruh yang elegan." },
              { term: "Private Event & Party", text: "Ulang tahun, syukuran, arisan, dan momen hangat keluarga." },
              { term: "Corporate & Institusi", text: "Rapat, seminar, gathering, hingga perayaan perusahaan." },
              { term: "Snack & Lunch Box", text: "Solusi praktis berkualitas untuk beragam kebutuhan." },
              { term: "Hampers", text: "Bingkisan eksklusif untuk berbagi kebahagiaan." },
              { term: "Everyday Meal Catering", text: "Makan harian untuk rumah maupun kantor, konsisten setiap hari." },
              { term: "Fine Dining", text: "Sajian plated berkelas dengan table service." },
              { term: "Buffet, Banquet & Foodstall", text: "Prasmanan skala besar dan area foodstall interaktif." },
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
            p: "Cukup hubungi tim kami via WhatsApp. Kami akan berdiskusi soal tanggal, jumlah tamu, dan selera acara Anda, lalu menyiapkan penawaran yang sesuai.",
          },
        ],
      },
      {
        q: "Berapa minimum pemesanannya?",
        a: [
          {
            p: "Minimum 25 pax untuk buffet maupun meal box. Untuk acara yang lebih intim, kami juga dapat melayani mulai 20 pax dengan penyesuaian pada ketentuan minimum Service Charge.",
          },
        ],
      },
      {
        q: "Di mana lokasi Tiska, dan area mana saja yang dilayani?",
        a: [
          {
            p: "Dapur pusat kami berada di Jl. Julang 1 No. 3, Tanah Sereal, Kota Bogor. Kami melayani pengiriman katering untuk seluruh wilayah Jabodetabek.",
          },
        ],
      },
      {
        q: "Dapur di Bogor — apakah makanan tetap aman dikirim ke Jakarta dan sekitarnya?",
        a: [
          {
            p: "Tentu aman. Jarak tempuh ke area Jabodetabek umumnya 1–2 jam, dan kami menerapkan standar pengemasan serta logistik yang ketat — makanan tiba dalam keadaan segar, higienis, dan terjaga kualitasnya.",
          },
        ],
      },
      {
        q: "Kapan sebaiknya saya memesan?",
        a: [
          {
            p: "Agar kami dapat mempersiapkan acara Anda dengan maksimal, sebaiknya konfirmasi pemesanan dilakukan selambat-lambatnya 14 hari sebelum hari H.",
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
        q: "Apakah ada Service Charge, dan bagaimana ketentuannya?",
        a: [
          { p: "Ketentuan biaya kami transparan, mengikuti lokasi dan profil klien:" },
          {
            list: [
              {
                term: "Korporat — Jabodetabek",
                text: "Pajak Restoran (PB1) 10% dari total tagihan makanan, ditambah Service Charge 21% (atau minimal Rp2.500.000, dipilih yang lebih besar).",
              },
              {
                term: "Pribadi — Jakarta & sekitarnya",
                text: "Service Charge 21% (atau minimal Rp2.500.000, dipilih yang lebih besar).",
              },
              {
                term: "Pribadi — Bogor",
                text: "Service Charge 15% (atau minimal Rp1.500.000, dipilih yang lebih besar).",
              },
            ],
          },
        ],
      },
      {
        q: "Bagaimana dengan pesanan bentuk box — ada biaya tambahan?",
        a: [
          {
            p: "Pesanan khusus bentuk box minimal 25 box. Untuk klien korporat, dikenakan tambahan PB1 sebesar 10%.",
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
        bio: "Menjaga arah kreatif Tiska — memastikan setiap menu dan pengalaman terasa baru tanpa kehilangan akar rasa yang dijaga tiga generasi.",
      },
      {
        id: "rita",
        nama: "Rita Ariyani",
        jabatan: "Chief Executive Officer",
        bio: "Memimpin operasional dan standar mutu Tiska, dari perencanaan di dapur hingga pelayanan tuntas di hari acara.",
      },
    ],
  },
  {
    id: "manajemen",
    label: "Manajemen",
    members: [
      {
        id: "ida",
        nama: "Ida Raodah",
        jabatan: "Finance",
        bio: "Mengelola keuangan dan perencanaan biaya agar setiap acara berjalan rapi, transparan, dan dapat diandalkan.",
      },
      {
        id: "ariz",
        nama: "Ariz Rakhma",
        jabatan: "Sales & Marketing",
        bio: "Titik temu pertama klien — mendengarkan kebutuhan acara dan menerjemahkannya menjadi rencana yang pas.",
      },
      {
        id: "reza",
        nama: "Reza Devyan",
        jabatan: "Accounting",
        bio: "Menjaga ketelitian pencatatan dan transparansi setiap pesanan, hingga detail terkecil.",
      },
      {
        id: "ramadan",
        nama: "Ramadan Saputra",
        jabatan: "Business Development",
        bio: "Membangun kemitraan dan memperluas jangkauan layanan Tiska ke lebih banyak perayaan.",
      },
    ],
  },
  {
    id: "operasional",
    label: "Dapur & Operasional",
    members: [
      {
        id: "laksmi",
        nama: "Dr. Laksmi Dewayani, M.Gizi, Sp.GK",
        jabatan: "Ahli Gizi",
        bio: "Memastikan setiap hidangan seimbang dan aman, memadukan cita rasa dengan standar gizi yang terukur.",
      },
      {
        id: "sarinah",
        nama: "Sarinah",
        jabatan: "Head Kitchen",
        bio: "Memimpin dapur produksi, menjaga konsistensi rasa di setiap skala pesanan, sekecil atau sebesar apa pun acaranya.",
      },
      {
        id: "sulistiyowati",
        nama: "Sulistiyowati",
        jabatan: "Head Baker",
        bio: "Mengepalai pastry dan bakery — telaten pada tekstur, rasa, dan tampilan setiap kue dan roti.",
      },
      {
        id: "yoga",
        nama: "Yoga Gusmantara",
        jabatan: "Kapten",
        bio: "Memimpin tim pelayanan di lapangan, memastikan acara Anda berjalan mulus dari awal hingga akhir.",
      },
      {
        id: "asep",
        nama: "Asep Saepulloh",
        jabatan: "Kapten",
        bio: "Mengkoordinasi penyajian di lokasi dengan ketelitian, agar setiap tamu terlayani dengan baik.",
      },
      {
        id: "sukir",
        nama: "Sukir Edi Setiyawan",
        jabatan: "Kapten",
        bio: "Menjaga ritme pelayanan dan detail di hari acara, dari persiapan hingga sajian terakhir.",
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
