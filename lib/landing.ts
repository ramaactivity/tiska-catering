/**
 * Halaman layanan & area (SEO) — copy ID + EN berdampingan agar terjemahan
 * mudah dijaga sinkron. Semua fakta bersumber dari lib/content.ts (FAQ,
 * timeline, reasons) & keputusan Rama (25 Sep 2026). JANGAN menambah klaim
 * harga, "terbaik", atau fakta yang belum dikonfirmasi.
 */
import type { RichText } from "./content";
import type { Lang } from "./i18n";

export type LandingItem = { term: string; text: string };

export type LandingBlock =
  | { type: "prose"; heading: RichText; paragraphs: string[] }
  | { type: "list"; heading: RichText; intro?: string; items: LandingItem[] }
  | { type: "steps"; heading: RichText; items: LandingItem[] };

export type LandingCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: RichText;
  intro: string;
  blocks: LandingBlock[];
  faq: { q: string; a: string }[];
};

export type Landing = {
  kind: "service" | "area";
  slug: Record<Lang, string>;
  /** Label pendek untuk tautan internal & breadcrumb */
  label: Record<Lang, string>;
  showKlien?: boolean;
  showSertifikasi?: boolean;
  showCompanyProfile?: boolean;
  /** Formulir penawaran: korporat menanyakan nama perusahaan */
  quote: "corporate" | "event";
  copy: Record<Lang, LandingCopy>;
};

/** Taruh PDF di public/ dengan nama ini — tombol unduh muncul otomatis. */
export const companyProfilePdf = "/dokumen/company-profile-tiska-catering.pdf";

// ─── Blok bersama ───────────────────────────────────────────────────────────

const langkah: Record<Lang, LandingBlock> = {
  id: {
    type: "steps",
    heading: [{ text: "Cara kami " }, { text: "bekerja", italic: true }],
    items: [
      {
        term: "Konsultasi",
        text: "Ceritakan tanggal, jumlah tamu, lokasi, dan konsep acara melalui WhatsApp. Tim kami mendengarkan dulu sebelum menyarankan menu.",
      },
      {
        term: "Penawaran & menu",
        text: "Kami menyusun penawaran dan pilihan menu dari lebih dari 800 hidangan — Nusantara, Asian, Western, Mediterranean, Peranakan, hingga vegetarian — atau menu custom sesuai tema.",
      },
      {
        term: "Test food",
        text: "Cicipi dulu sebelum memutuskan. Hidangan test food dapat kami antar langsung ke rumah atau kantor Anda.",
      },
      {
        term: "Hari acara",
        text: "Tim kami tiba lebih awal, menata, menyajikan, dan menjaga alur hidangan selama acara — standar layanan 4–6 jam sejak tiba di lokasi.",
      },
    ],
  },
  en: {
    type: "steps",
    heading: [{ text: "How we " }, { text: "work", italic: true }],
    items: [
      {
        term: "Consultation",
        text: "Share your date, guest count, venue, and concept with us on WhatsApp. We listen first, then suggest a menu.",
      },
      {
        term: "Proposal & menu",
        text: "We prepare a proposal and menu from more than 800 dishes — Indonesian, Asian, Western, Mediterranean, Peranakan, and vegetarian — or a custom menu built around your theme.",
      },
      {
        term: "Food tasting",
        text: "Taste before you decide. We can deliver the tasting menu directly to your home or office.",
      },
      {
        term: "On the day",
        text: "Our team arrives early to set up, serve, and pace the service throughout the event — our standard service runs 4–6 hours from arrival.",
      },
    ],
  },
};

const faqWaktu: Record<Lang, { q: string; a: string }> = {
  id: {
    q: "Berapa lama sebelumnya saya perlu memesan?",
    a: "Sebagai panduan: H-30 untuk acara besar seperti pernikahan atau gala, H-14 untuk acara sedang, dan H-3 untuk acara casual. Untuk kebutuhan mendadak, tetap hubungi kami — akan kami usahakan.",
  },
  en: {
    q: "How far in advance should I book?",
    a: "As a guide: 30 days ahead for large events such as weddings or galas, 14 days for mid-sized events, and 3 days for casual gatherings. For short-notice requests, please still reach out — we will do our best.",
  },
};

const faqMinimum: Record<Lang, { q: string; a: string }> = {
  id: {
    q: "Berapa minimum pemesanannya?",
    a: "Minimum 25 pax untuk buffet maupun meal box. Untuk acara yang lebih intim, kami dapat melayani mulai 20 pax dengan penyesuaian ketentuan service charge.",
  },
  en: {
    q: "What is the minimum order?",
    a: "A minimum of 25 guests for buffet or meal boxes. For more intimate gatherings we can serve from 20 guests, with an adjusted service charge.",
  },
};

const faqTestFood: Record<Lang, { q: string; a: string }> = {
  id: {
    q: "Bisakah test food sebelum memesan?",
    a: "Bisa. Hidangan test food dapat kami antar langsung ke rumah atau kantor Anda.",
  },
  en: {
    q: "Can we arrange a food tasting first?",
    a: "Yes. We can deliver the tasting menu directly to your home or office.",
  },
};

// ─── Halaman layanan ────────────────────────────────────────────────────────

export const services: Landing[] = [
  {
    kind: "service",
    slug: { id: "katering-korporat", en: "corporate-catering" },
    label: { id: "Katering Korporat", en: "Corporate Catering" },
    showKlien: true,
    showSertifikasi: true,
    showCompanyProfile: true,
    quote: "corporate",
    copy: {
      id: {
        metaTitle: "Catering Korporat & Perusahaan di Jakarta | Tiska Catering",
        metaDescription:
          "Catering korporat untuk rapat, training, seminar, launching, gathering, hingga gala dinner di Jakarta, Bogor & JaDeTaBek. 350+ acara per tahun, dapur Halal & HACCP, sejak 1980.",
        eyebrow: "Layanan · Korporat & Institusi",
        h1: [
          { text: "Katering korporat " },
          { text: "untuk Jakarta & sekitarnya", italic: true },
        ],
        intro:
          "Dari rapat pagi hingga gala malam — hidangan yang tiba tepat waktu, tersaji rapi, dan membuat tamu perusahaan Anda merasa dihargai.",
        blocks: [
          {
            type: "prose",
            heading: [
              { text: "Agenda yang " },
              { text: "tidak boleh meleset", italic: true },
            ],
            paragraphs: [
              "Acara perusahaan jarang memberi ruang untuk kesalahan: jadwal ketat, tamu penting, dan nama baik institusi dipertaruhkan. Karena itu kami bekerja dengan skala dan sistem yang teruji — lebih dari 350 acara per tahun dan lebih dari 8.000 pesanan setiap bulan, semuanya dari dapur kami di Bogor.",
              "Perbankan, energi, otomotif, telekomunikasi, hingga lembaga negara telah mempercayakan jamuan mereka kepada Tiska. Kami memahami bahwa di acara korporat, hidangan yang baik adalah hidangan yang tidak mengalihkan perhatian dari tujuan acara — tepat waktu, konsisten, dan tertata.",
            ],
          },
          {
            type: "list",
            heading: [{ text: "Agenda yang " }, { text: "kami layani", italic: true }],
            items: [
              {
                term: "Rapat & training",
                text: "Coffee break, snack box, dan lunch box untuk agenda harian maupun pelatihan beberapa hari.",
              },
              {
                term: "Seminar & konferensi",
                text: "Buffet dan jamuan untuk ratusan peserta dengan alur penyajian yang cepat dan tertib.",
              },
              {
                term: "Peluncuran produk",
                text: "Hidangan yang menyatu dengan konsep acara, dari finger food hingga foodstall bertema.",
              },
              {
                term: "Gathering & family day",
                text: "Foodstall dan live cooking — egg station, grill, BBQ, hingga steak — yang menghidupkan suasana.",
              },
              {
                term: "Gala dinner & jamuan VIP",
                text: "Fine dining plated dan banquet service berstandar tinggi untuk tamu VIP maupun VVIP.",
              },
              {
                term: "Katering harian kantor",
                text: "Everyday meal catering yang konsisten setiap hari untuk karyawan dan tim operasional.",
              },
              {
                term: "Hampers relasi bisnis",
                text: "Bingkisan istimewa untuk klien dan mitra di momen hari raya maupun perayaan perusahaan.",
              },
            ],
          },
          langkah.id,
        ],
        faq: [
          faqMinimum.id,
          faqTestFood.id,
          faqWaktu.id,
          {
            q: "Apakah dapur Tiska bersertifikat?",
            a: "Ya. Setiap hidangan diolah di dapur bersertifikat Halal yang menerapkan sistem keamanan pangan HACCP.",
          },
          {
            q: "Apakah makanan tetap segar dikirim ke kantor di Jakarta?",
            a: "Ya. Hidangan disiapkan di dapur kami di Bogor dan dikirim ke kantor Anda di Jakarta dengan pengemasan dan logistik yang menjaga hidangan tetap segar dan higienis.",
          },
        ],
      },
      en: {
        metaTitle: "Corporate Catering in Jakarta | Tiska Catering",
        metaDescription:
          "Corporate catering for meetings, trainings, seminars, product launches, gatherings, and gala dinners across Jakarta, Bogor & Greater Jakarta. 350+ events a year, Halal & HACCP kitchen, since 1980.",
        eyebrow: "Services · Corporate & Institutions",
        h1: [
          { text: "Corporate catering " },
          { text: "for Jakarta and beyond", italic: true },
        ],
        intro:
          "From morning meetings to evening galas — food that arrives on time, is served with care, and makes your company's guests feel valued.",
        blocks: [
          {
            type: "prose",
            heading: [
              { text: "Agendas that " },
              { text: "cannot slip", italic: true },
            ],
            paragraphs: [
              "Corporate events leave little room for error: tight schedules, important guests, and an institution's reputation on the line. That is why we work with proven scale and systems — more than 350 events a year and over 8,000 orders every month, all from our kitchen in Bogor.",
              "Banks, energy and automotive companies, telecoms, and state institutions have entrusted their functions to Tiska. At a corporate event, good food is food that never distracts from the purpose of the day — punctual, consistent, and well presented.",
            ],
          },
          {
            type: "list",
            heading: [{ text: "Occasions " }, { text: "we cater", italic: true }],
            items: [
              {
                term: "Meetings & trainings",
                text: "Coffee breaks, snack boxes, and lunch boxes for daily agendas or multi-day trainings.",
              },
              {
                term: "Seminars & conferences",
                text: "Buffets and receptions for hundreds of attendees, served quickly and in good order.",
              },
              {
                term: "Product launches",
                text: "Food that fits the concept of the event, from finger food to themed food stalls.",
              },
              {
                term: "Gatherings & family days",
                text: "Food stalls and live cooking — egg station, grill, BBQ, and steak — that bring the room to life.",
              },
              {
                term: "Gala dinners & VIP functions",
                text: "Plated fine dining and banquet service to a high standard for VIP and VVIP guests.",
              },
              {
                term: "Daily office catering",
                text: "Everyday meal catering, consistent day after day, for employees and operational teams.",
              },
              {
                term: "Corporate hampers",
                text: "Thoughtful hampers for clients and partners during festive seasons and company celebrations.",
              },
            ],
          },
          langkah.en,
        ],
        faq: [
          faqMinimum.en,
          faqTestFood.en,
          faqWaktu.en,
          {
            q: "Is Tiska's kitchen certified?",
            a: "Yes. Every dish is prepared in a Halal-certified kitchen that applies the HACCP food safety system.",
          },
          {
            q: "Does the food stay fresh when delivered to offices in Jakarta?",
            a: "Yes. Every dish is prepared in our kitchen in Bogor and delivered to your office in Jakarta with packaging and logistics that keep it fresh and hygienic.",
          },
        ],
      },
    },
  },
  {
    kind: "service",
    slug: { id: "katering-pernikahan", en: "wedding-catering" },
    label: { id: "Katering Pernikahan", en: "Wedding Catering" },
    showSertifikasi: true,
    quote: "event",
    copy: {
      id: {
        metaTitle: "Catering Pernikahan Jakarta & Bogor | Tiska Catering",
        metaDescription:
          "Catering pernikahan untuk akad, lamaran, resepsi, hingga intimate wedding di Jakarta, Bogor & JaDeTaBek. 800+ pilihan menu, test food, rekanan Puri Begawan. Sejak 1980.",
        eyebrow: "Layanan · Pernikahan",
        h1: [
          { text: "Katering pernikahan, " },
          { text: "untuk hari milik Anda", italic: true },
        ],
        intro:
          "Kami menyiapkan hidangannya, agar Anda dan keluarga bisa sepenuhnya hadir di hari itu.",
        blocks: [
          {
            type: "prose",
            heading: [
              { text: "Sejak 1990 di " },
              { text: "gedung-gedung Bogor & Jakarta", italic: true },
            ],
            paragraphs: [
              "Tiska mulai melayani pernikahan besar di gedung-gedung Bogor dan Jakarta sejak 1990, setelah satu dekade merintis dari dapur rumahan. Tiga generasi kemudian, prinsipnya tetap sama: hidangan yang membuat tamu merasa diistimewakan, sementara sorotan tetap milik kedua mempelai.",
              "Menu dapat disusun dari lebih dari 800 pilihan — hidangan Nusantara, Peranakan, Asian, Western, hingga Mediterranean — atau dirancang khusus mengikuti tema dan tradisi keluarga Anda. Semua dimulai dengan percakapan, lalu test food yang bisa kami antar ke rumah.",
            ],
          },
          {
            type: "list",
            heading: [{ text: "Setiap rangkaian, " }, { text: "satu standar", italic: true }],
            items: [
              {
                term: "Lamaran & pengajian",
                text: "Jamuan hangat untuk pertemuan dua keluarga, dari hidangan utama hingga jajan pasar dalam tampah.",
              },
              {
                term: "Akad & pemberkatan",
                text: "Sajian yang tertata tenang untuk momen paling sakral, dengan keluarga dan tamu terdekat.",
              },
              {
                term: "Resepsi buffet & banquet",
                text: "Prasmanan skala besar yang tertata megah, dengan alur penyajian yang terjaga dari awal hingga akhir.",
              },
              {
                term: "Foodstall & live cooking",
                text: "Egg station, grill, BBQ, hingga steak — stall interaktif yang menghidupkan suasana resepsi.",
              },
              {
                term: "Intimate wedding & fine dining",
                text: "Sajian plated dengan table service untuk perayaan yang lebih personal, mulai 20 pax.",
              },
              {
                term: "Hampers & nasi keranjang",
                text: "Bingkisan untuk keluarga dan tamu yang tidak dapat hadir langsung.",
              },
            ],
          },
          {
            type: "list",
            heading: [{ text: "Venue " }, { text: "rekanan", italic: true }],
            intro:
              "Tiska adalah katering rekanan resmi di venue berikut. Untuk venue lain, kami menyesuaikan dengan kebijakan masing-masing venue, termasuk bila berlaku cover charge.",
            items: [
              {
                term: "Puri Begawan, Bogor",
                text: "Venue pernikahan di Bogor yang hanya bekerja sama dengan katering rekanannya — Tiska termasuk di dalamnya.",
              },
            ],
          },
          langkah.id,
        ],
        faq: [
          faqWaktu.id,
          faqTestFood.id,
          {
            q: "Bisakah menyusun menu sesuai adat atau tema keluarga?",
            a: "Bisa. Selain 800+ pilihan menu, tim kami dapat menyusun menu custom mengikuti tradisi, tema, maupun selera keluarga Anda, termasuk pilihan vegetarian.",
          },
          {
            q: "Apakah Tiska bisa melayani di venue yang bukan rekanan?",
            a: "Bisa. Bila venue menerapkan cover charge untuk katering luar, kami informasikan sejak awal sesuai kebijakan venue.",
          },
          faqMinimum.id,
        ],
      },
      en: {
        metaTitle: "Wedding Catering in Jakarta & Bogor | Tiska Catering",
        metaDescription:
          "Wedding catering for engagements, ceremonies, receptions, and intimate weddings across Jakarta, Bogor & Greater Jakarta. 800+ dishes, food tasting, partner caterer at Puri Begawan. Since 1980.",
        eyebrow: "Services · Weddings",
        h1: [
          { text: "Wedding catering, " },
          { text: "for a day that is yours", italic: true },
        ],
        intro:
          "We take care of the food, so you and your family can be fully present on the day.",
        blocks: [
          {
            type: "prose",
            heading: [
              { text: "Since 1990 in the " },
              { text: "halls of Bogor & Jakarta", italic: true },
            ],
            paragraphs: [
              "Tiska began catering large weddings in the reception halls of Bogor and Jakarta in 1990, after a decade growing from a home kitchen. Three generations on, the principle has not changed: food that makes every guest feel honoured, while the spotlight stays on the couple.",
              "Menus can be drawn from more than 800 dishes — Indonesian, Peranakan, Asian, Western, and Mediterranean — or designed around your theme and family traditions. It all begins with a conversation, followed by a food tasting we can deliver to your home.",
            ],
          },
          {
            type: "list",
            heading: [{ text: "Every ceremony, " }, { text: "one standard", italic: true }],
            items: [
              {
                term: "Engagement & pengajian",
                text: "A warm table for two families meeting, from main dishes to traditional snacks served on woven tampah trays.",
              },
              {
                term: "Akad & holy matrimony",
                text: "Quietly composed service for the most sacred moment, with family and closest guests.",
              },
              {
                term: "Buffet & banquet receptions",
                text: "Large-scale buffets, elegantly arranged, with service paced from the first guest to the last.",
              },
              {
                term: "Food stalls & live cooking",
                text: "Egg station, grill, BBQ, and steak — interactive stalls that bring the reception to life.",
              },
              {
                term: "Intimate weddings & fine dining",
                text: "Plated dining with table service for more personal celebrations, from 20 guests.",
              },
              {
                term: "Hampers & nasi keranjang",
                text: "Gifts for family and guests who cannot attend in person.",
              },
            ],
          },
          {
            type: "list",
            heading: [{ text: "Partner " }, { text: "venues", italic: true }],
            intro:
              "Tiska is an official partner caterer at the venues below. At other venues we follow each venue's policies, including any cover charge that applies.",
            items: [
              {
                term: "Puri Begawan, Bogor",
                text: "A wedding venue in Bogor that works only with its partner caterers — Tiska among them.",
              },
            ],
          },
          langkah.en,
        ],
        faq: [
          faqWaktu.en,
          faqTestFood.en,
          {
            q: "Can the menu follow our family's traditions or theme?",
            a: "Yes. Beyond our 800+ dishes, our team can design a custom menu around your traditions, theme, and preferences, including vegetarian options.",
          },
          {
            q: "Can Tiska cater at venues that are not partners?",
            a: "Yes. If the venue applies a cover charge for outside caterers, we will let you know from the start, in line with the venue's policy.",
          },
          faqMinimum.en,
        ],
      },
    },
  },
  {
    kind: "service",
    slug: { id: "acara-privat", en: "private-events" },
    label: { id: "Acara Privat", en: "Private Events" },
    quote: "event",
    copy: {
      id: {
        metaTitle: "Catering Acara Privat, Syukuran & Ulang Tahun | Tiska Catering",
        metaDescription:
          "Catering untuk ulang tahun, syukuran, arisan, open house, dan jamuan di rumah — Jakarta, Bogor & JaDeTaBek. Mulai 20 pax, fine dining hingga live cooking. Sejak 1980.",
        eyebrow: "Layanan · Acara Privat",
        h1: [
          { text: "Acara privat, " },
          { text: "dijamu dengan hangat", italic: true },
        ],
        intro:
          "Ulang tahun, syukuran, arisan, hingga jamuan di rumah — perayaan yang lebih dekat, dengan perhatian yang sama besarnya.",
        blocks: [
          {
            type: "prose",
            heading: [{ text: "Tuan rumah yang " }, { text: "ikut menikmati", italic: true }],
            paragraphs: [
              "Di acara keluarga, tuan rumah sering justru paling sibuk. Kami ingin sebaliknya: Anda duduk bersama tamu, sementara tim kami menata, menyajikan, dan menjaga hidangan tetap hangat hingga acara selesai.",
              "Tiska berawal dari dapur rumahan pada 1980 — dari aneka kue tampah hingga masakan untuk acara rumahan. Kehangatan itu yang kami bawa ke setiap jamuan privat, kini dengan standar layanan yang teruji di ratusan acara setiap tahun.",
            ],
          },
          {
            type: "list",
            heading: [{ text: "Perayaan yang " }, { text: "kami layani", italic: true }],
            items: [
              {
                term: "Ulang tahun & anniversary",
                text: "Dari makan malam keluarga hingga pesta dengan foodstall dan live cooking.",
              },
              {
                term: "Syukuran & tasyakuran",
                text: "Tumpeng, hidangan Nusantara, dan jajan pasar dalam tampah untuk momen penuh syukur.",
              },
              {
                term: "Arisan & jamuan sore",
                text: "Kudapan, snack, dan hidangan ringan yang tertata cantik untuk pertemuan yang santai.",
              },
              {
                term: "Open house hari raya",
                text: "Jamuan untuk tamu yang datang silih berganti, dengan hidangan yang tetap terjaga sepanjang hari.",
              },
              {
                term: "Private dinner & fine dining",
                text: "Sajian plated dengan table service untuk jamuan intim di rumah maupun venue pilihan Anda.",
              },
            ],
          },
          langkah.id,
        ],
        faq: [
          {
            q: "Apakah bisa untuk acara kecil di rumah?",
            a: "Bisa. Minimum 25 pax untuk buffet maupun meal box, dan untuk acara yang lebih intim kami dapat melayani mulai 20 pax dengan penyesuaian service charge.",
          },
          faqTestFood.id,
          faqWaktu.id,
          {
            q: "Apakah ada menu vegetarian?",
            a: "Ada. Kami menyediakan menu vegetarian, dan menu dapat disusun custom sesuai selera atau tema acara.",
          },
        ],
      },
      en: {
        metaTitle: "Private Event Catering in Jakarta & Bogor | Tiska Catering",
        metaDescription:
          "Catering for birthdays, thanksgiving gatherings, arisan, open houses, and dinners at home — Jakarta, Bogor & Greater Jakarta. From 20 guests, fine dining to live cooking. Since 1980.",
        eyebrow: "Services · Private Events",
        h1: [
          { text: "Private events, " },
          { text: "hosted with warmth", italic: true },
        ],
        intro:
          "Birthdays, thanksgivings, arisan, and dinners at home — closer celebrations, given just as much attention.",
        blocks: [
          {
            type: "prose",
            heading: [{ text: "A host who gets to " }, { text: "enjoy the day", italic: true }],
            paragraphs: [
              "At family gatherings, the host is often the busiest person in the room. We want the opposite: you sit with your guests, while our team sets up, serves, and keeps the food warm until the very end.",
              "Tiska began in a home kitchen in 1980 — from traditional cakes on tampah trays to home-style cooking for family gatherings. We bring that same warmth to every private function, now with service standards proven across hundreds of events a year.",
            ],
          },
          {
            type: "list",
            heading: [{ text: "Celebrations " }, { text: "we cater", italic: true }],
            items: [
              {
                term: "Birthdays & anniversaries",
                text: "From family dinners to parties with food stalls and live cooking.",
              },
              {
                term: "Syukuran & thanksgiving",
                text: "Tumpeng, Indonesian dishes, and traditional snacks on tampah trays for moments of gratitude.",
              },
              {
                term: "Arisan & afternoon gatherings",
                text: "Beautifully arranged snacks and light dishes for relaxed get-togethers.",
              },
              {
                term: "Festive open houses",
                text: "A table for guests who come and go, with food kept at its best throughout the day.",
              },
              {
                term: "Private dinners & fine dining",
                text: "Plated dining with table service for intimate dinners at home or at a venue of your choice.",
              },
            ],
          },
          langkah.en,
        ],
        faq: [
          {
            q: "Do you cater small gatherings at home?",
            a: "Yes. The minimum is 25 guests for buffet or meal boxes, and for more intimate gatherings we can serve from 20 guests with an adjusted service charge.",
          },
          faqTestFood.en,
          faqWaktu.en,
          {
            q: "Do you offer vegetarian menus?",
            a: "Yes. We offer vegetarian menus, and any menu can be customised to your taste or theme.",
          },
        ],
      },
    },
  },
  {
    kind: "service",
    slug: { id: "tumpeng-dan-hampers", en: "tumpeng-and-hampers" },
    label: { id: "Tumpeng & Hampers", en: "Tumpeng & Hampers" },
    quote: "event",
    copy: {
      id: {
        metaTitle: "Tumpeng, Hampers & Snack Box Premium | Tiska Catering",
        metaDescription:
          "Nasi tumpeng untuk syukuran, hampers hari raya untuk keluarga dan relasi bisnis, snack & lunch box, serta tampah jajan pasar — Jakarta, Bogor & JaDeTaBek. Sejak 1980.",
        eyebrow: "Layanan · Tumpeng, Hampers & Box",
        h1: [
          { text: "Tumpeng & hampers, " },
          { text: "tanda syukur yang tersaji", italic: true },
        ],
        intro:
          "Untuk syukuran, hari raya, dan ucapan terima kasih kepada orang-orang yang berarti — dari dapur yang memulai kisahnya dengan kue tampah pada 1980.",
        blocks: [
          {
            type: "prose",
            heading: [{ text: "Berawal dari " }, { text: "kue tampah", italic: true }],
            paragraphs: [
              "Kisah Tiska dimulai pada 1980 dengan Aneka Kue Tampah Mini yang dipasok ke katering-katering ternama di Jabodetabek. Tradisi menyajikan dalam tampah, tumpeng, dan bingkisan itu tetap menjadi bagian penting dari dapur kami hingga hari ini.",
              "Sejak 2020, hampers dan nasi keranjang kami hadir untuk keluarga, pasangan pengantin, dan perusahaan yang ingin berbagi kebahagiaan tanpa harus berkumpul di satu tempat.",
            ],
          },
          {
            type: "list",
            heading: [{ text: "Pilihan " }, { text: "sajian", italic: true }],
            items: [
              {
                term: "Nasi tumpeng",
                text: "Untuk syukuran, tasyakuran, peresmian, dan ulang tahun perusahaan — simbol rasa syukur yang tersaji penuh makna.",
              },
              {
                term: "Hampers hari raya",
                text: "Bingkisan istimewa untuk Idulfitri, Natal, Imlek, dan momen spesial lainnya.",
              },
              {
                term: "Hampers relasi bisnis",
                text: "Ucapan terima kasih perusahaan untuk klien, mitra, dan karyawan.",
              },
              {
                term: "Snack box & lunch box",
                text: "Kotak praktis dengan rasa premium khas Tiska, minimal 25 box, untuk acara maupun keseharian.",
              },
              {
                term: "Tampah jajan pasar",
                text: "Aneka jajan pasar dan hidangan tradisional dalam tampah anyaman bambu.",
              },
            ],
          },
        ],
        faq: [
          {
            q: "Berapa minimum pesanan box?",
            a: "Pesanan bentuk box minimal 25 box, tanpa biaya tambahan di luar pajak PB1 10%.",
          },
          {
            q: "Apakah hampers bisa dikirim ke banyak alamat?",
            a: "Silakan diskusikan daftar penerima dengan tim kami melalui WhatsApp. Biaya pengiriman menyesuaikan jarak dan jumlah pesanan.",
          },
          faqWaktu.id,
        ],
      },
      en: {
        metaTitle: "Tumpeng, Hampers & Snack Boxes | Tiska Catering",
        metaDescription:
          "Tumpeng for thanksgiving, festive hampers for family and business relations, snack & lunch boxes, and traditional tampah platters — Jakarta, Bogor & Greater Jakarta. Since 1980.",
        eyebrow: "Services · Tumpeng, Hampers & Boxes",
        h1: [
          { text: "Tumpeng & hampers, " },
          { text: "gratitude, served", italic: true },
        ],
        intro:
          "For thanksgivings, festive seasons, and thank-yous to the people who matter — from a kitchen that began with traditional cakes on tampah trays in 1980.",
        blocks: [
          {
            type: "prose",
            heading: [{ text: "It began with " }, { text: "tampah cakes", italic: true }],
            paragraphs: [
              "Tiska's story began in 1980 with Aneka Kue Tampah Mini — miniature traditional cakes supplied to well-known caterers across Greater Jakarta. Serving on tampah trays, tumpeng, and gift boxes remains an important part of our kitchen today.",
              "Since 2020, our hampers and nasi keranjang have been there for families, couples, and companies who want to share their joy without gathering in one place.",
            ],
          },
          {
            type: "list",
            heading: [{ text: "What we " }, { text: "prepare", italic: true }],
            items: [
              {
                term: "Nasi tumpeng",
                text: "For thanksgivings, inaugurations, and company anniversaries — the traditional cone of rice as a symbol of gratitude.",
              },
              {
                term: "Festive hampers",
                text: "Special hampers for Eid, Christmas, Lunar New Year, and other occasions.",
              },
              {
                term: "Corporate hampers",
                text: "A company's thank-you to clients, partners, and employees.",
              },
              {
                term: "Snack boxes & lunch boxes",
                text: "Practical boxes with Tiska's signature taste, from 25 boxes, for events and everyday needs.",
              },
              {
                term: "Tampah platters",
                text: "Traditional snacks and dishes served on woven bamboo tampah trays.",
              },
            ],
          },
        ],
        faq: [
          {
            q: "What is the minimum box order?",
            a: "Box orders start from 25 boxes, with no additional charge beyond the 10% PB1 restaurant tax.",
          },
          {
            q: "Can hampers be sent to multiple addresses?",
            a: "Please share your recipient list with our team on WhatsApp. Delivery fees depend on distance and order size.",
          },
          faqWaktu.en,
        ],
      },
    },
  },
];

// ─── Halaman area ───────────────────────────────────────────────────────────

export const areas: Landing[] = [
  {
    kind: "area",
    slug: { id: "jakarta", en: "jakarta" },
    label: { id: "Jakarta", en: "Jakarta" },
    showKlien: true,
    quote: "corporate",
    copy: {
      id: {
        metaTitle: "Catering Premium Jakarta — Korporat & Pernikahan | Tiska Catering",
        metaDescription:
          "Catering premium di Jakarta untuk acara kantor, gala, pernikahan, dan acara privat — Jakarta Selatan, Pusat, Barat, Timur & Utara. Dikirim dari dapur kami di Bogor. Sejak 1980.",
        eyebrow: "Area Layanan · Jakarta",
        h1: [{ text: "Catering premium " }, { text: "di Jakarta", italic: true }],
        intro:
          "Sebagian besar klien kami berada di Jakarta — dari kantor pusat perusahaan hingga keluarga yang merayakan momen pentingnya.",
        blocks: [
          {
            type: "prose",
            heading: [{ text: "Dekat dengan " }, { text: "klien Jakarta", italic: true }],
            paragraphs: [
              "Sejak 1990 Tiska melayani pernikahan dan acara di gedung-gedung Jakarta. Semua hidangan disiapkan di dapur kami di Bogor, lalu dikirim dengan pengemasan dan logistik yang menjaga kesegarannya sampai di lokasi acara.",
              "Kami melayani seluruh wilayah Jakarta — dari kawasan perkantoran Sudirman, Kuningan, dan TB Simatupang hingga hunian di Jakarta Selatan, Pusat, Barat, Timur, dan Utara.",
            ],
          },
          {
            type: "list",
            heading: [{ text: "Yang paling sering " }, { text: "kami layani di Jakarta", italic: true }],
            items: [
              {
                term: "Acara kantor & institusi",
                text: "Rapat, training, seminar, launching, hingga gala dinner di kantor, hotel, dan convention center.",
              },
              {
                term: "Pernikahan",
                text: "Akad, resepsi buffet & banquet, hingga intimate wedding dengan fine dining.",
              },
              {
                term: "Acara privat",
                text: "Ulang tahun, syukuran, arisan, dan open house di rumah maupun venue pilihan.",
              },
              {
                term: "Hampers & box",
                text: "Snack box, lunch box, tumpeng, dan hampers untuk klien serta relasi bisnis.",
              },
            ],
          },
          langkah.id,
        ],
        faq: [
          {
            q: "Apakah Tiska melayani seluruh Jakarta?",
            a: "Ya. Kami melayani seluruh wilayah Jakarta dan Jabodetabek. Biaya pengiriman menyesuaikan jarak lokasi acara dan jumlah pesanan.",
          },
          {
            q: "Dari mana hidangan untuk Jakarta disiapkan?",
            a: "Dari dapur kami di Bogor, dengan pengemasan dan logistik yang menjaga hidangan tetap segar dan higienis.",
          },
          faqTestFood.id,
          faqWaktu.id,
        ],
      },
      en: {
        metaTitle: "Premium Catering in Jakarta — Corporate & Weddings | Tiska Catering",
        metaDescription:
          "Premium catering in Jakarta for office events, galas, weddings, and private functions — South, Central, West, East & North Jakarta. Delivered from our kitchen in Bogor. Since 1980.",
        eyebrow: "Service Area · Jakarta",
        h1: [{ text: "Premium catering " }, { text: "in Jakarta", italic: true }],
        intro:
          "Most of our clients are in Jakarta — from corporate headquarters to families celebrating their most important moments.",
        blocks: [
          {
            type: "prose",
            heading: [{ text: "Close to our " }, { text: "Jakarta clients", italic: true }],
            paragraphs: [
              "Tiska has catered weddings and events in Jakarta's reception halls since 1990. Every dish is prepared in our kitchen in Bogor, then delivered with packaging and logistics that keep it fresh all the way to the venue.",
              "We serve all of Jakarta — from the business districts of Sudirman, Kuningan, and TB Simatupang to homes across South, Central, West, East, and North Jakarta.",
            ],
          },
          {
            type: "list",
            heading: [{ text: "What we cater " }, { text: "most in Jakarta", italic: true }],
            items: [
              {
                term: "Corporate & institutional events",
                text: "Meetings, trainings, seminars, launches, and gala dinners at offices, hotels, and convention centres.",
              },
              {
                term: "Weddings",
                text: "Ceremonies, buffet and banquet receptions, and intimate weddings with fine dining.",
              },
              {
                term: "Private events",
                text: "Birthdays, thanksgivings, arisan, and open houses at home or at a venue of your choice.",
              },
              {
                term: "Hampers & boxes",
                text: "Snack boxes, lunch boxes, tumpeng, and hampers for clients and business relations.",
              },
            ],
          },
          langkah.en,
        ],
        faq: [
          {
            q: "Does Tiska cover all of Jakarta?",
            a: "Yes. We serve all of Jakarta and Greater Jakarta. Delivery fees depend on the distance to the venue and the size of the order.",
          },
          {
            q: "Where is the food for Jakarta prepared?",
            a: "In our kitchen in Bogor, with packaging and logistics that keep every dish fresh and hygienic.",
          },
          faqTestFood.en,
          faqWaktu.en,
        ],
      },
    },
  },
  {
    kind: "area",
    slug: { id: "bogor", en: "bogor" },
    label: { id: "Bogor", en: "Bogor" },
    showSertifikasi: true,
    quote: "event",
    copy: {
      id: {
        metaTitle: "Catering Bogor sejak 1980 — Pernikahan & Korporat | Tiska Catering",
        metaDescription:
          "Catering di Kota & Kabupaten Bogor sejak 1980 — pernikahan, acara kantor, syukuran, tumpeng & hampers. Dapur pusat di Tanah Sereal, rekanan resmi Puri Begawan.",
        eyebrow: "Area Layanan · Bogor",
        h1: [{ text: "Catering di Bogor, " }, { text: "sejak 1980", italic: true }],
        intro:
          "Bogor adalah rumah kami. Di sinilah tiga generasi Tiska memasak untuk perayaan keluarga, pernikahan, dan acara kantor.",
        blocks: [
          {
            type: "prose",
            heading: [{ text: "Dari dapur rumahan " }, { text: "di Bogor", italic: true }],
            paragraphs: [
              "Tiska dirintis pada 1980 oleh Ibu Sri Kadarwati (Ibu Titiek) bersama (alm.) Drg. Hari Poernomo, berawal dari Aneka Kue Tampah Mini. Satu dekade kemudian, kami mulai melayani pernikahan besar di gedung-gedung Bogor. Dapur pusat kami tetap di Kota Bogor — Jl. Julang 1 No. 3, Tanah Sereal.",
              "Dekat dengan dapur berarti hidangan tiba lebih cepat dan tim kami mengenal venue-venue di Bogor dengan baik — dari gedung pernikahan, hotel, hingga rumah keluarga.",
            ],
          },
          {
            type: "list",
            heading: [{ text: "Venue " }, { text: "rekanan", italic: true }],
            intro:
              "Tiska adalah katering rekanan resmi di Puri Begawan. Di venue lain, kami menyesuaikan dengan kebijakan masing-masing venue.",
            items: [
              {
                term: "Puri Begawan",
                text: "Venue pernikahan di Bogor yang hanya bekerja sama dengan katering rekanannya — Tiska termasuk di dalamnya.",
              },
            ],
          },
          {
            type: "list",
            heading: [{ text: "Yang kami layani " }, { text: "di Bogor", italic: true }],
            items: [
              {
                term: "Pernikahan",
                text: "Lamaran, akad, dan resepsi buffet maupun banquet di gedung, hotel, dan rumah.",
              },
              {
                term: "Acara kantor & instansi",
                text: "Rapat, training, seminar, dan perayaan perusahaan maupun instansi pemerintahan.",
              },
              {
                term: "Syukuran & acara keluarga",
                text: "Tumpeng, tampah jajan pasar, dan hidangan Nusantara untuk momen penuh syukur.",
              },
              {
                term: "Hampers & box",
                text: "Snack box, lunch box, dan hampers hari raya.",
              },
            ],
          },
        ],
        faq: [
          {
            q: "Di mana lokasi dapur Tiska di Bogor?",
            a: "Dapur pusat kami berada di Jl. Julang 1 No. 3, Tanah Sereal, Kota Bogor.",
          },
          {
            q: "Apakah melayani Kabupaten Bogor?",
            a: "Ya. Kami melayani Kota dan Kabupaten Bogor, termasuk Sentul, Cibinong, dan sekitarnya.",
          },
          faqTestFood.id,
          faqMinimum.id,
        ],
      },
      en: {
        metaTitle: "Catering in Bogor since 1980 — Weddings & Corporate | Tiska Catering",
        metaDescription:
          "Catering across Bogor city and regency since 1980 — weddings, office events, thanksgivings, tumpeng & hampers. Central kitchen in Tanah Sereal, official partner caterer at Puri Begawan.",
        eyebrow: "Service Area · Bogor",
        h1: [{ text: "Catering in Bogor, " }, { text: "since 1980", italic: true }],
        intro:
          "Bogor is home. This is where three generations of Tiska have cooked for family celebrations, weddings, and office events.",
        blocks: [
          {
            type: "prose",
            heading: [{ text: "From a home kitchen " }, { text: "in Bogor", italic: true }],
            paragraphs: [
              "Tiska was founded in 1980 by Ibu Sri Kadarwati (Ibu Titiek) and the late Drg. Hari Poernomo, beginning with Aneka Kue Tampah Mini. A decade later, we began catering large weddings in Bogor's reception halls. Our central kitchen remains in Bogor — Jl. Julang 1 No. 3, Tanah Sereal.",
              "Being close to our kitchen means food arrives sooner, and our team knows Bogor's venues well — from wedding halls and hotels to family homes.",
            ],
          },
          {
            type: "list",
            heading: [{ text: "Partner " }, { text: "venues", italic: true }],
            intro:
              "Tiska is an official partner caterer at Puri Begawan. At other venues, we follow each venue's policies.",
            items: [
              {
                term: "Puri Begawan",
                text: "A wedding venue in Bogor that works only with its partner caterers — Tiska among them.",
              },
            ],
          },
          {
            type: "list",
            heading: [{ text: "What we cater " }, { text: "in Bogor", italic: true }],
            items: [
              {
                term: "Weddings",
                text: "Engagements, ceremonies, and buffet or banquet receptions at halls, hotels, and homes.",
              },
              {
                term: "Office & institutional events",
                text: "Meetings, trainings, seminars, and celebrations for companies and government institutions.",
              },
              {
                term: "Thanksgivings & family gatherings",
                text: "Tumpeng, tampah platters, and Indonesian dishes for moments of gratitude.",
              },
              {
                term: "Hampers & boxes",
                text: "Snack boxes, lunch boxes, and festive hampers.",
              },
            ],
          },
        ],
        faq: [
          {
            q: "Where is Tiska's kitchen in Bogor?",
            a: "Our central kitchen is at Jl. Julang 1 No. 3, Tanah Sereal, Bogor City.",
          },
          {
            q: "Do you serve Bogor Regency?",
            a: "Yes. We serve both Bogor City and Bogor Regency, including Sentul, Cibinong, and the surrounding area.",
          },
          faqTestFood.en,
          faqMinimum.en,
        ],
      },
    },
  },
  {
    kind: "area",
    slug: { id: "tangerang-selatan", en: "tangerang-selatan" },
    label: { id: "Bintaro, BSD & Tangsel", en: "Bintaro, BSD & South Tangerang" },
    quote: "event",
    copy: {
      id: {
        metaTitle: "Catering Bintaro, BSD & Tangerang Selatan | Tiska Catering",
        metaDescription:
          "Catering premium di Bintaro, BSD, Alam Sutera & Tangerang Selatan — acara kantor, pernikahan, dan acara privat. Dikirim dari dapur kami di Bogor. Sejak 1980.",
        eyebrow: "Area Layanan · Tangerang Selatan",
        h1: [
          { text: "Catering Bintaro, BSD " },
          { text: "& Tangerang Selatan", italic: true },
        ],
        intro:
          "Klien kami di Bintaro, BSD, dan Tangerang Selatan dilayani dari dapur Tiska di Bogor — dapur yang sama yang menjaga rasa tiga generasi sejak 1980.",
        blocks: [
          {
            type: "prose",
            heading: [{ text: "Satu dapur, " }, { text: "satu standar", italic: true }],
            paragraphs: [
              "Semua hidangan Tiska disiapkan di dapur kami di Bogor, lalu dikirim ke Bintaro, BSD, Alam Sutera, Pamulang, maupun Ciputat dengan pengemasan dan logistik yang menjaga kesegarannya.",
              "Standarnya sama untuk setiap pesanan — resep tiga generasi, dapur bersertifikat Halal, dan sistem keamanan pangan HACCP.",
            ],
          },
          {
            type: "list",
            heading: [{ text: "Yang kami layani " }, { text: "di Tangerang Selatan", italic: true }],
            items: [
              {
                term: "Acara kantor",
                text: "Rapat, training, gathering, dan launching di kawasan perkantoran BSD, Alam Sutera, dan Bintaro.",
              },
              {
                term: "Pernikahan",
                text: "Akad, resepsi, dan intimate wedding di gedung, hotel, maupun rumah.",
              },
              {
                term: "Acara privat",
                text: "Ulang tahun, syukuran, arisan, dan open house.",
              },
              {
                term: "Hampers & box",
                text: "Snack box, lunch box, tumpeng, dan hampers hari raya.",
              },
            ],
          },
          langkah.id,
        ],
        faq: [
          {
            q: "Area mana saja di Tangerang Selatan yang dilayani?",
            a: "Bintaro, BSD, Alam Sutera, Pamulang, Ciputat, serta Jakarta bagian selatan dan barat — dan tentu seluruh Jabodetabek.",
          },
          faqTestFood.id,
          faqMinimum.id,
        ],
      },
      en: {
        metaTitle: "Catering in Bintaro, BSD & South Tangerang | Tiska Catering",
        metaDescription:
          "Premium catering in Bintaro, BSD, Alam Sutera & South Tangerang — office events, weddings, and private functions. Delivered from our kitchen in Bogor. Since 1980.",
        eyebrow: "Service Area · South Tangerang",
        h1: [
          { text: "Catering in Bintaro, BSD " },
          { text: "& South Tangerang", italic: true },
        ],
        intro:
          "Our clients in Bintaro, BSD, and South Tangerang are served from Tiska's kitchen in Bogor — the same kitchen that has kept three generations of flavour since 1980.",
        blocks: [
          {
            type: "prose",
            heading: [{ text: "One kitchen, " }, { text: "one standard", italic: true }],
            paragraphs: [
              "Every Tiska dish is prepared in our kitchen in Bogor, then delivered to Bintaro, BSD, Alam Sutera, Pamulang, or Ciputat with packaging and logistics that keep it fresh.",
              "The same standard for every order — three generations of recipes, a Halal-certified kitchen, and the HACCP food safety system.",
            ],
          },
          {
            type: "list",
            heading: [{ text: "What we cater " }, { text: "in South Tangerang", italic: true }],
            items: [
              {
                term: "Office events",
                text: "Meetings, trainings, gatherings, and launches across the BSD, Alam Sutera, and Bintaro business districts.",
              },
              {
                term: "Weddings",
                text: "Ceremonies, receptions, and intimate weddings at halls, hotels, or homes.",
              },
              {
                term: "Private events",
                text: "Birthdays, thanksgivings, arisan, and open houses.",
              },
              {
                term: "Hampers & boxes",
                text: "Snack boxes, lunch boxes, tumpeng, and festive hampers.",
              },
            ],
          },
          langkah.en,
        ],
        faq: [
          {
            q: "Which areas in South Tangerang do you serve?",
            a: "Bintaro, BSD, Alam Sutera, Pamulang, Ciputat, and south and west Jakarta — as well as all of Greater Jakarta.",
          },
          faqTestFood.en,
          faqMinimum.en,
        ],
      },
    },
  },
  {
    kind: "area",
    slug: { id: "depok-bekasi", en: "depok-bekasi" },
    label: { id: "Depok & Bekasi", en: "Depok & Bekasi" },
    quote: "corporate",
    copy: {
      id: {
        metaTitle: "Catering Depok & Bekasi — Korporat & Pernikahan | Tiska Catering",
        metaDescription:
          "Catering premium di Depok dan Bekasi untuk acara kantor, kawasan industri, pernikahan, dan acara privat. Halal & HACCP, 800+ pilihan menu, test food. Sejak 1980.",
        eyebrow: "Area Layanan · Depok & Bekasi",
        h1: [{ text: "Catering di Depok " }, { text: "& Bekasi", italic: true }],
        intro:
          "Untuk kantor, kampus, kawasan industri, dan keluarga di Depok dan Bekasi — dengan standar yang sama seperti di Jakarta dan Bogor.",
        blocks: [
          {
            type: "prose",
            heading: [{ text: "Satu standar " }, { text: "di seluruh JaDeTaBek", italic: true }],
            paragraphs: [
              "Depok berada di jalur antara dapur pusat kami di Bogor dan Jakarta, sementara Bekasi dengan kawasan perkantoran dan industrinya membutuhkan katering yang tepat waktu untuk skala besar. Dengan lebih dari 8.000 pesanan setiap bulan, kami terbiasa menyiapkan hidangan dalam jumlah besar tanpa mengorbankan rasa.",
              "Setiap pesanan diolah di dapur bersertifikat Halal dengan sistem keamanan pangan HACCP, lalu dikirim dengan pengemasan yang menjaga hidangan tetap segar dan higienis.",
            ],
          },
          {
            type: "list",
            heading: [{ text: "Yang kami layani " }, { text: "di Depok & Bekasi", italic: true }],
            items: [
              {
                term: "Kantor & kawasan industri",
                text: "Rapat, training, family day, dan katering harian untuk karyawan.",
              },
              {
                term: "Kampus & institusi",
                text: "Seminar, wisuda, dan acara resmi dengan jamuan buffet maupun box.",
              },
              {
                term: "Pernikahan",
                text: "Lamaran, akad, dan resepsi di gedung, hotel, maupun rumah.",
              },
              {
                term: "Acara privat",
                text: "Ulang tahun, syukuran, arisan, dan open house.",
              },
            ],
          },
          langkah.id,
        ],
        faq: [
          {
            q: "Apakah ada biaya pengiriman ke Depok dan Bekasi?",
            a: "Ya, biaya pengiriman berlaku untuk seluruh area dan disesuaikan dengan jarak lokasi acara serta jumlah pesanan.",
          },
          faqMinimum.id,
          faqTestFood.id,
          faqWaktu.id,
        ],
      },
      en: {
        metaTitle: "Catering in Depok & Bekasi — Corporate & Weddings | Tiska Catering",
        metaDescription:
          "Premium catering in Depok and Bekasi for office events, industrial estates, weddings, and private functions. Halal & HACCP, 800+ dishes, food tasting. Since 1980.",
        eyebrow: "Service Area · Depok & Bekasi",
        h1: [{ text: "Catering in Depok " }, { text: "& Bekasi", italic: true }],
        intro:
          "For offices, campuses, industrial estates, and families in Depok and Bekasi — to the same standard as in Jakarta and Bogor.",
        blocks: [
          {
            type: "prose",
            heading: [{ text: "One standard " }, { text: "across Greater Jakarta", italic: true }],
            paragraphs: [
              "Depok sits between our central kitchen in Bogor and Jakarta, while Bekasi, with its business and industrial districts, needs catering that is punctual at scale. With more than 8,000 orders every month, we are used to preparing large volumes without compromising on taste.",
              "Every order is prepared in a Halal-certified kitchen with the HACCP food safety system, then delivered in packaging that keeps food fresh and hygienic.",
            ],
          },
          {
            type: "list",
            heading: [{ text: "What we cater " }, { text: "in Depok & Bekasi", italic: true }],
            items: [
              {
                term: "Offices & industrial estates",
                text: "Meetings, trainings, family days, and daily meals for employees.",
              },
              {
                term: "Campuses & institutions",
                text: "Seminars, graduations, and official events with buffets or boxed meals.",
              },
              {
                term: "Weddings",
                text: "Engagements, ceremonies, and receptions at halls, hotels, or homes.",
              },
              {
                term: "Private events",
                text: "Birthdays, thanksgivings, arisan, and open houses.",
              },
            ],
          },
          langkah.en,
        ],
        faq: [
          {
            q: "Is there a delivery fee to Depok and Bekasi?",
            a: "Yes, delivery fees apply to all areas and depend on the distance to the venue and the size of the order.",
          },
          faqMinimum.en,
          faqTestFood.en,
          faqWaktu.en,
        ],
      },
    },
  },
  {
    kind: "area",
    slug: { id: "sentul-cibinong", en: "sentul-cibinong" },
    label: { id: "Sentul & Cibinong", en: "Sentul & Cibinong" },
    quote: "event",
    copy: {
      id: {
        metaTitle: "Catering Sentul & Cibinong — Pernikahan & Acara | Tiska Catering",
        metaDescription:
          "Catering di Sentul dan Cibinong untuk pernikahan, acara kantor, gathering, dan acara keluarga — dekat dari dapur pusat Tiska di Bogor. Halal & HACCP, sejak 1980.",
        eyebrow: "Area Layanan · Sentul & Cibinong",
        h1: [{ text: "Catering di Sentul " }, { text: "& Cibinong", italic: true }],
        intro:
          "Dekat dari dapur pusat kami di Bogor — untuk pernikahan, gathering, dan acara keluarga di Sentul, Cibinong, dan sekitarnya.",
        blocks: [
          {
            type: "prose",
            heading: [{ text: "Tetangga " }, { text: "dapur kami", italic: true }],
            paragraphs: [
              "Sentul dan Cibinong berada tak jauh dari dapur pusat Tiska di Kota Bogor. Kedekatan ini memudahkan kami menyiapkan acara di venue-venue Sentul yang dikelilingi alam, maupun di perkantoran dan perumahan di Cibinong.",
              "Dari acara kantor dan gathering di luar kota hingga pernikahan dan syukuran keluarga, kami membawa standar yang sama: resep tiga generasi, dapur bersertifikat Halal, dan tim yang menjaga alur hidangan dari awal hingga akhir.",
            ],
          },
          {
            type: "list",
            heading: [{ text: "Yang kami layani " }, { text: "di Sentul & Cibinong", italic: true }],
            items: [
              {
                term: "Pernikahan",
                text: "Resepsi buffet, banquet, dan intimate wedding, termasuk di venue terbuka.",
              },
              {
                term: "Gathering & outing kantor",
                text: "Foodstall, live cooking — grill, BBQ, steak — dan jamuan untuk acara di luar kantor.",
              },
              {
                term: "Acara instansi",
                text: "Rapat dan acara resmi instansi di kawasan pemerintahan Kabupaten Bogor.",
              },
              {
                term: "Acara keluarga",
                text: "Syukuran, ulang tahun, dan arisan dengan tumpeng maupun tampah jajan pasar.",
              },
            ],
          },
          langkah.id,
        ],
        faq: [
          {
            q: "Seberapa jauh dari dapur Tiska?",
            a: "Sentul dan Cibinong termasuk wilayah terdekat dari dapur pusat kami di Kota Bogor.",
          },
          faqMinimum.id,
          faqTestFood.id,
        ],
      },
      en: {
        metaTitle: "Catering in Sentul & Cibinong — Weddings & Events | Tiska Catering",
        metaDescription:
          "Catering in Sentul and Cibinong for weddings, office events, gatherings, and family celebrations — close to Tiska's central kitchen in Bogor. Halal & HACCP, since 1980.",
        eyebrow: "Service Area · Sentul & Cibinong",
        h1: [{ text: "Catering in Sentul " }, { text: "& Cibinong", italic: true }],
        intro:
          "Close to our central kitchen in Bogor — for weddings, gatherings, and family celebrations in Sentul, Cibinong, and the surrounding area.",
        blocks: [
          {
            type: "prose",
            heading: [{ text: "Neighbours of " }, { text: "our kitchen", italic: true }],
            paragraphs: [
              "Sentul and Cibinong are a short distance from Tiska's central kitchen in Bogor. That proximity makes it easy for us to cater at Sentul's nature-surrounded venues, as well as at offices and homes in Cibinong.",
              "From company gatherings out of town to weddings and family thanksgivings, we bring the same standards: three generations of recipes, a Halal-certified kitchen, and a team that paces the service from start to finish.",
            ],
          },
          {
            type: "list",
            heading: [{ text: "What we cater " }, { text: "in Sentul & Cibinong", italic: true }],
            items: [
              {
                term: "Weddings",
                text: "Buffet, banquet, and intimate wedding receptions, including at open-air venues.",
              },
              {
                term: "Company gatherings & outings",
                text: "Food stalls, live cooking — grill, BBQ, steak — and receptions for off-site events.",
              },
              {
                term: "Institutional events",
                text: "Meetings and official events in Bogor Regency's government district.",
              },
              {
                term: "Family celebrations",
                text: "Thanksgivings, birthdays, and arisan with tumpeng or tampah platters.",
              },
            ],
          },
          langkah.en,
        ],
        faq: [
          {
            q: "How far is it from Tiska's kitchen?",
            a: "Sentul and Cibinong are among the closest areas to our central kitchen in Bogor.",
          },
          faqMinimum.en,
          faqTestFood.en,
        ],
      },
    },
  },
];

// ─── Teks antarmuka halaman landing ─────────────────────────────────────────

export const landingUi = {
  id: {
    faq: "Pertanyaan umum",
    layananLain: "Layanan lainnya",
    area: "Area layanan",
    beranda: "Beranda",
    layanan: "Layanan",
    areaCrumb: "Area",
    unduhProfil: "Unduh company profile (PDF)",
    quote: {
      eyebrow: "Mulai percakapan",
      judul: [{ text: "Ceritakan " }, { text: "acara Anda", italic: true }] as RichText,
      intro:
        "Isi seperlunya — pesan Anda akan terbuka di WhatsApp tim kami, siap dikirim.",
      nama: "Nama",
      perusahaan: "Perusahaan / instansi",
      jenis: "Jenis acara",
      tanggal: "Tanggal acara",
      tamu: "Perkiraan jumlah tamu (pax)",
      lokasi: "Lokasi / venue",
      catatan: "Catatan (opsional)",
      kirim: "Lanjutkan ke WhatsApp",
      salam: "Halo Tiska Catering, saya ingin berdiskusi tentang acara:",
    },
  },
  en: {
    faq: "Frequently asked questions",
    layananLain: "Other services",
    area: "Service areas",
    beranda: "Home",
    layanan: "Services",
    areaCrumb: "Areas",
    unduhProfil: "Download company profile (PDF)",
    quote: {
      eyebrow: "Start a conversation",
      judul: [{ text: "Tell us about " }, { text: "your event", italic: true }] as RichText,
      intro:
        "Fill in what you can — your message will open in our team's WhatsApp, ready to send.",
      nama: "Name",
      perusahaan: "Company / institution",
      jenis: "Type of event",
      tanggal: "Event date",
      tamu: "Estimated guests (pax)",
      lokasi: "Location / venue",
      catatan: "Notes (optional)",
      kirim: "Continue to WhatsApp",
      salam: "Hello Tiska Catering, I would like to discuss an event:",
    },
  },
} satisfies Record<Lang, unknown>;

/** URL publik halaman landing per bahasa. */
export function landingPath(l: Landing, lang: Lang): string {
  const seg =
    lang === "en"
      ? l.kind === "service" ? "/en/services" : "/en/areas"
      : l.kind === "service" ? "/layanan" : "/area";
  return `${seg}/${l.slug[lang]}`;
}

/** Halaman indeks /layanan · /en/services */
export const layananIndex = {
  id: {
    metaTitle: "Layanan Catering Korporat, Pernikahan & Acara | Tiska Catering",
    metaDescription:
      "Layanan Tiska Catering: katering korporat, pernikahan, acara privat, tumpeng & hampers, buffet, fine dining, foodstall, hingga katering harian — Jakarta, Bogor & JaDeTaBek.",
    eyebrow: "Tiska Catering · Sejak 1980",
    h1: [{ text: "Layanan " }, { text: "kami", italic: true }] as RichText,
    intro:
      "Dari hari sakral hingga makan siang harian — satu standar premium di setiap skala.",
    semua: "Seluruh bentuk layanan",
    lihat: "Selengkapnya",
  },
  en: {
    metaTitle: "Corporate, Wedding & Event Catering Services | Tiska Catering",
    metaDescription:
      "Tiska Catering services: corporate catering, weddings, private events, tumpeng & hampers, buffets, fine dining, food stalls, and daily meals — Jakarta, Bogor & Greater Jakarta.",
    eyebrow: "Tiska Catering · Since 1980",
    h1: [{ text: "Our " }, { text: "services", italic: true }] as RichText,
    intro:
      "From sacred days to everyday lunches — one premium standard at every scale.",
    semua: "Everything we offer",
    lihat: "Read more",
  },
} satisfies Record<Lang, unknown>;
