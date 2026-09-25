/**
 * English content for the Tiska Catering website.
 * Mirrors lib/content.ts export-for-export; types come from the Indonesian file.
 * Non-text data (links, logos, numbers, names) is reused from ./content by reference.
 */

import * as id from "./content";

export type {
  RichText,
  Stat,
  FaqBlock,
  FaqItem,
  FaqCategory,
  TeamMember,
  TeamGroup,
} from "./content";

// ─── Company data ───────────────────────────────────────────────────────────

const statLabels = [
  "years of experience",
  "events & celebrations a year",
  "orders a month",
  "menu choices",
  "staff",
  "M² kitchen area",
  "guests served a day",
  "crew available a day",
];

export const company: typeof id.company = {
  ...id.company,
  lokasi: "Bogor, West Java",
  dapurKedua: "Kitchen Hub, Bintaro, South Tangerang",
  statistik: id.company.statistik.map((s, i) => ({ ...s, label: statLabels[i] })),
};

// ─── Navigation ─────────────────────────────────────────────────────────────

export const nav: typeof id.nav = {
  links: [
    { label: "About", href: "/en#profil" },
    { label: "Services", href: "/en/services" },
    { label: "Menu", href: "/en/menu" },
    { label: "News", href: "/en/news" },
    { label: "Clients", href: "/en#klien" },
    { label: "FAQ", href: "/en#faq" },
  ],
  cta: { ...id.nav.cta, label: "Contact" },
};

// ─── Hero ───────────────────────────────────────────────────────────────────

export const hero: typeof id.hero = {
  eyebrow: "Catering Service · Since 1980",
  judul: id.hero.judul,
  subjudul:
    "Three generations bringing exceptional flavour to your celebrations — in Bogor, Jakarta and beyond.",
  cta: { label: "Explore the Menu", href: "/en/menu" },
};

// ─── About ──────────────────────────────────────────────────────────────────

export const profil: typeof id.profil = {
  eyebrow: "About Tiska",
  judul: [
    { text: "Every celebration is " },
    { text: "your story.", italic: true },
  ],
  body: "Since 1980, we have believed the finest food is not the grandest — it is the food that makes your guests feel truly cared for. We serve love in every detail, so that your moment is the one in the spotlight.",
};

// id.visi is inferred as a string literal type; cast via string so the module
// shape still matches (cleaner fix: annotate `visi: string` in content.ts).
export const visi: typeof id.visi =
  "To create and deliver meaningful catering experiences across a wide range of dishes — celebrating love, strengthening bonds and bringing people together — with premium standards of flavour and genuine ingredients, matched by wholehearted service at every special celebration, wherever it takes place.";

export const misi: typeof id.misi = [
  "Create high-quality menus that celebrate the richness of Indonesian cuisine.",
  "Offer warm, professional and dependable service.",
  "Sharpen our team's skills through continuous training.",
  "Build a positive, collaborative workplace.",
  "Apply efficient systems and technology for smooth, punctual service.",
];

// ─── Why Tiska ──────────────────────────────────────────────────────────────

export const mengapa: typeof id.mengapa = {
  judul: [{ text: "Why choose " }, { text: "Tiska", italic: true }],
  deskripsi:
    "More than numbers — a trust that has grown over three generations.",
};

const reasonsText = [
  {
    label: "Years of experience",
    deskripsi:
      "Recipes handed down through three generations, consistent since 1980; flavour you can trust.",
  },
  {
    label: "Events a year",
    deskripsi:
      "From personal celebrations such as weddings and private events to business occasions — meetings, training, launches and corporate galas. Whatever the scale, our focus is making your moment run beautifully.",
  },
  {
    label: "Orders a month",
    deskripsi:
      "Proven production capacity ensures punctuality, food quality and service you can rely on.",
  },
  {
    label: "Menu choices",
    deskripsi:
      "Indonesian, Asian, Western, Mediterranean, Peranakan, Vegetarian; every taste and theme can be tailored.",
  },
];

export const reasons: typeof id.reasons = id.reasons.map((r, i) => ({
  ...r,
  ...reasonsText[i],
}));

// ─── History (timeline) ─────────────────────────────────────────────────────

export const sejarah: typeof id.sejarah = {
  eyebrow: "Our Journey",
  judul: [
    { text: "Three generations, " },
    { text: "one dedication", italic: true, br: true },
  ],
};

const timelineText = [
  {
    judul: "From a home kitchen",
    teks: "Ibu Sri Kadarwati (Ibu Titiek) and the late Drg. Hari Poernomo began with Aneka Kue Tampah Mini — assorted bite-sized cakes on bamboo trays — supplying well-known caterers across Greater Jakarta.",
  },
  {
    judul: "From cakes to cuisine",
    teks: "No longer only cakes — now a wide range of dishes, serving home gatherings through to large weddings in venues across Bogor and Jakarta.",
  },
  {
    judul: "A new generation, a new craft",
    teks: "The baton passed to Bimo Haryo Dewanto & Rita Ariyani — a complete rebrand, a new identity and a more modern take on flavour.",
  },
  {
    judul: "A new kitchen in Bintaro",
    teks: "The Kitchen Hub in Bintaro opened, bringing our service closer to clients in Jakarta and the surrounding area, with freshness better preserved.",
  },
  {
    judul: "Enduring & innovating",
    teks: "Through the COVID-19 pandemic, Tiska held steady and kept innovating — growing in the wedding segment with hampers and Nasi Keranjang (rice meals presented in woven baskets).",
  },
  {
    judul: "Rapid growth",
    teks: "Innovative menus were warmly received; strategic partnerships extended our reach across Greater Jakarta.",
  },
];

export const timeline: typeof id.timeline = id.timeline.map((t, i) => ({
  ...t,
  ...timelineText[i],
}));

// ─── Services ───────────────────────────────────────────────────────────────

export const layananHeader: typeof id.layananHeader = {
  judul: [{ text: "Our " }, { text: "services", italic: true }],
  deskripsi:
    "From sacred days to everyday lunches — one premium standard at every scale.",
  semua: { label: "View all services", href: "/en/services" },
};

export const layanan: typeof id.layanan = [
  {
    judul: "Wedding",
    deskripsi:
      "Your most sacred day, shaped with flavour and meaningful detail.",
  },
  {
    judul: "Private Event & Party",
    deskripsi:
      "Birthdays, thanksgiving gatherings, arisan and warm family celebrations.",
  },
  {
    judul: "Corporate & Institutional",
    deskripsi:
      "Meetings, seminars, gatherings and special celebrations for companies and institutions.",
  },
  {
    judul: "Snack & Lunch Box",
    deskripsi:
      "Practical boxes with Tiska's premium flavour, for events and every day.",
  },
  {
    judul: "Hampers",
    deskripsi: "Thoughtful gifts for sharing joy on special occasions.",
  },
  {
    judul: "Buffet & Banquet",
    deskripsi:
      "Large-scale buffets, beautifully arranged for celebrations and formal receptions.",
  },
  {
    judul: "Foodstall",
    deskripsi:
      "Interactive food stalls that bring the room to life — guests choose on the spot.",
  },
  {
    judul: "Everyday Meal Catering",
    deskripsi:
      "Daily meals for home or office — consistent, dependable home-style cooking every day.",
  },
  {
    judul: "Fine Dining",
    deskripsi:
      "Refined plated courses with elegant table service for special occasions.",
  },
  {
    judul: "Tumpeng",
    deskripsi:
      "Nasi tumpeng, the cone-shaped rice centrepiece for thanksgiving ceremonies — a symbol of gratitude, served with meaning.",
  },
  {
    judul: "Tampah",
    deskripsi:
      "Traditional snacks (jajan pasar) and dishes arranged on woven bamboo trays — warm and down to earth.",
  },
];

export const prioritas: typeof id.prioritas = [
  "Personal & Exclusive Menu Customisation",
  "Exceptional, Reliable & Professional Service",
  "Premium, Quality Ingredients",
  "Ease & Flexibility in Planning",
];

// ─── /menu page ─────────────────────────────────────────────────────────────

export const menuPage: typeof id.menuPage = {
  eyebrow: "Tiska Catering · Since 1980",
  judul: [{ text: "Our " }, { text: "menu", italic: true }],
  intro:
    "800+ menu choices — Indonesian, Asian, Western, Mediterranean, Peranakan and Vegetarian; every taste and theme can be tailored.",
};

// ─── Event gallery (home) ───────────────────────────────────────────────────

export const galeriAcara: typeof id.galeriAcara = {
  eyebrow: "Portfolio",
  judul: [{ text: "Moments we " }, { text: "celebrated", italic: true }],
  deskripsi:
    "Highlights from celebrations we have served — from weddings to corporate receptions.",
  cta: { label: "View the full gallery", href: "/en/gallery" },
};

// ─── /gallery page ──────────────────────────────────────────────────────────

export const galeriPage: typeof id.galeriPage = {
  eyebrow: "Portfolio",
  judul: [{ text: "A gallery of " }, { text: "celebrations", italic: true }],
  intro:
    "Moments we have celebrated with our clients — weddings, corporate events and special gifts.",
};

// ─── /news page ─────────────────────────────────────────────────────────────

export const kabarPage: typeof id.kabarPage = {
  eyebrow: "News & Highlights",
  judul: [{ text: "Latest " }, { text: "news", italic: true }],
  intro:
    "Celebration stories, seasonal offers and the latest news from the Tiska Catering kitchen.",
  semua: "All",
  kategoriLabel: {
    kisah: "Celebration Stories",
    promo: "Offers",
    campaign: "Special Moments",
    menu: "Seasonal Menu",
    kabar: "News",
  },
  kosong: "No news for now. Stories and offers will follow soon.",
  ctaDefaultLabel: "Ask via WhatsApp",
};

export const sorotan: typeof id.sorotan = {
  eyebrow: "Highlights",
  judul: [{ text: "What's " }, { text: "happening now", italic: true }],
  semua: "View all news",
  selengkapnya: "Read more",
};

// ─── Menu categories ────────────────────────────────────────────────────────

const [indonesian, asian, western, pasta, mediterranean, peranakan, vegetarian, tumpeng, hampers] =
  id.menuCategories;

export const menuCategories: typeof id.menuCategories = [
  indonesian,
  asian,
  western,
  pasta,
  { ...mediterranean, deskripsi: "Fresh dishes from the shores of the Mediterranean.", items: [] },
  {
    ...peranakan,
    deskripsi:
      "Dishes born from the blending of Chinese culture with Malay–Nusantara traditions.",
    items: [],
  },
  { ...vegetarian, deskripsi: "Fully plant-based dishes for every celebration.", items: [] },
  { ...tumpeng, deskripsi: "For traditional celebrations.", items: [] },
  { ...hampers, deskripsi: "Special gift hampers — including Nasi Keranjang.", items: [] },
];

// ─── Menu summary (home) ────────────────────────────────────────────────────

const menuHighlight: Record<string, string> = {
  mediterranean: "Fresh dishes from the Mediterranean coast",
  peranakan: "A blend of Chinese & Nusantara flavours",
  vegetarian: "Fully plant-based dishes for every celebration",
  hampers: "Special gift hampers for every occasion",
};

export const menuRingkas: typeof id.menuRingkas = {
  eyebrow: "800+ Menu Choices",
  judul: [{ text: "Flavour " }, { text: "without limits", italic: true }],
  tiles: id.menuRingkas.tiles.map((t) => ({
    ...t,
    highlight: menuHighlight[t.id] ?? t.highlight,
  })),
  cta: { label: "View the Full Menu", href: "/en/menu" },
};

// ─── Philosophy ─────────────────────────────────────────────────────────────

export const filosofi: typeof id.filosofi = {
  quote: id.filosofi.quote,
  body: "Food draws people closer through warm conversation — that is how we celebrate each of your special moments.",
};

// ─── Testimonials ───────────────────────────────────────────────────────────
// Faithful translations only — do not invent new quotes.

export const testimoni: typeof id.testimoni = {
  eyebrow: "From those who entrusted us with their moments",
  daftar: [
    {
      ...id.testimoni.daftar[0],
      kutipanRich: [
        { text: "The event ran smoothly and our guests were happy. That's " },
        { text: "what matters to us.", italic: true },
      ],
      peran: "Launch Event",
    },
    {
      ...id.testimoni.daftar[1],
      kutipanRich: [
        { text: "Our wedding went calmly. For me, that was " },
        { text: "more than enough.", italic: true },
      ],
      peran: "Wedding · Bogor",
    },
    {
      ...id.testimoni.daftar[2],
      kutipanRich: [
        { text: "Our open house is always busy, and our guests leave " },
        { text: "happy.", italic: true },
      ],
      peran: "Eid al-Fitr Open House · Bogor",
    },
  ],
};

// ─── Clients ────────────────────────────────────────────────────────────────

export const klien: typeof id.klien = {
  eyebrow: "Trusted by leading institutions",
  judul: [{ text: "They celebrated " }, { text: "with us", italic: true }],
  caption:
    "From banking to automotive, energy to technology — Tiska is trusted to celebrate their moments.",
  daftar: id.klien.daftar,
};

// ─── FAQ ────────────────────────────────────────────────────────────────────

export const faqHeader: typeof id.faqHeader = {
  eyebrow: "Frequently Asked Questions",
  judul: [{ text: "Questions we " }, { text: "often hear", italic: true }],
  deskripsi:
    "Everything you need to know before celebrating with us — from services and menus to costs and terms. Choose the topic you need.",
  ctaTanya: "Still have a question?",
  cta: { ...id.faqHeader.cta, label: "Ask via WhatsApp" },
};

export const faqCategories: typeof id.faqCategories = [
  {
    id: "layanan",
    label: "Services & Events",
    ringkas: "Event types & service formats",
    items: [
      {
        q: "What kinds of events does Tiska cater for?",
        a: [
          {
            p: "From private moments — weddings, engagements, birthdays and family thanksgivings — to corporate agendas, gatherings and large institutional events. We handle every scale to the same standard.",
          },
        ],
      },
      {
        q: "What catering formats do you offer?",
        a: [
          { p: "We offer eleven service formats to suit your event:" },
          {
            list: [
              { term: "Wedding", text: "Complete, elegant wedding catering." },
              { term: "Private Event & Party", text: "Birthdays, thanksgivings, arisan and warm family moments." },
              { term: "Corporate & Institutional", text: "Meetings, seminars, gatherings and company celebrations." },
              { term: "Snack & Lunch Box", text: "Practical, quality options for all kinds of needs." },
              { term: "Hampers", text: "Exclusive gifts for sharing joy." },
              { term: "Buffet & Banquet", text: "Large-scale buffets for celebrations and formal receptions." },
              { term: "Foodstall", text: "Interactive food stalls that bring your event to life." },
              { term: "Everyday Meal Catering", text: "Daily meals for home or office, consistent every day." },
              { term: "Fine Dining", text: "Refined plated courses with table service." },
              { term: "Tumpeng", text: "Nasi tumpeng for thanksgiving ceremonies." },
              { term: "Tampah", text: "Traditional snacks (jajan pasar) on woven bamboo trays." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "pemesanan",
    label: "Ordering & Delivery",
    ringkas: "Minimums, areas, timing & how to order",
    items: [
      {
        q: "How do I place an order?",
        a: [
          {
            p: "Simply contact our team via WhatsApp. We will discuss the date, number of guests, event concept, your needs and menu choices, then prepare a proposal to suit.",
          },
        ],
      },
      {
        q: "What is the minimum order?",
        a: [
          {
            p: "A minimum of 25 pax for both buffet and meal box. For more intimate events, we can also serve from 20 pax with an adjustment to the Minimum Service Charge.",
          },
        ],
      },
      {
        q: "Where is Tiska located, and which areas do you serve?",
        a: [
          {
            p: "Our main kitchen is in Bogor City — at Jl. Julang 1 No. 3, Tanah Sereal. We deliver catering throughout Greater Jakarta (Jabodetabek).",
          },
        ],
      },
      {
        q: "Your kitchen is in Bogor — is the food still safe to deliver to Jakarta and the surrounding area?",
        a: [
          {
            p: "Yes, it is safe. Travel time to Greater Jakarta is generally 1–2 hours, and we apply packaging and logistics to proper standards — the food arrives fresh, hygienic and with its quality intact.",
          },
        ],
      },
      {
        q: "When should I place my order?",
        a: [
          {
            p: "The earlier the better, so preparations can be thorough. As a guide, please confirm no later than:",
          },
          {
            list: [
              { term: "Large events", text: "30 days before — e.g. weddings or large-scale galas." },
              { term: "Medium events", text: "14 days before." },
              { term: "Casual events", text: "3 days before." },
            ],
          },
          {
            p: "For last-minute orders, please still contact our admin — we will do our best and discuss what is possible.",
          },
        ],
      },
    ],
  },
  {
    id: "menu",
    label: "Menu & Flavour",
    ringkas: "Choices, vegetarian, custom & food tasting",
    items: [
      {
        q: "How many menu choices are there, and which cuisines?",
        a: [
          {
            p: "More than 800 menu choices across a very wide range — from Indonesian (Nusantara) specialities to Western, Asian and Mediterranean dishes.",
          },
        ],
      },
      {
        q: "Do you offer vegetarian or custom menus?",
        a: [
          {
            p: "Yes. We offer vegetarian menus, and you can work with our team to build a custom menu around your taste or event theme.",
          },
        ],
      },
      {
        q: "Can I do a food tasting before ordering?",
        a: [
          {
            p: "Yes. For your convenience, tasting dishes can also be delivered directly to your home or office.",
          },
        ],
      },
    ],
  },
  {
    id: "hospitality",
    label: "Hospitality & Live Cooking",
    ringkas: "Fine dining, banquet & stations",
    items: [
      {
        q: "Does Tiska offer plating, banquet service and fine dining?",
        a: [
          {
            p: "Yes. We are experienced in fine dining and banquets with refined presentation standards — suited to hosting your VIP and VVIP guests.",
          },
        ],
      },
      {
        q: "Can you provide live cooking such as an Egg Station, Grill, BBQ or Steak?",
        a: [
          {
            p: "Yes. We often set up interactive live-cooking areas that make dining at your event feel livelier and more exclusive.",
          },
        ],
      },
    ],
  },
  {
    id: "biaya",
    label: "Costs & Terms",
    ringkas: "Service charge, boxes & delivery",
    items: [
      {
        q: "What is the Minimum Service Charge, and how much is it?",
        a: [
          {
            p: "The Minimum Service Charge is a service fee that reflects the needs of your event — separate from the food menu price. The amount depends on the event location:",
          },
          {
            list: [
              {
                term: "Bogor & surrounding area",
                text: "15% of the total, or a minimum of Rp1,500,000 — whichever is greater.",
              },
              {
                term: "Greater Jakarta (Jabodetabek)",
                text: "up to 21% of the total, or a minimum of Rp2,500,000 — whichever is greater.",
              },
            ],
          },
        ],
      },
      {
        q: "Are there taxes or other charges beyond the menu price?",
        a: [
          {
            p: "Yes. All prices are subject to 10% Restaurant Tax (PB1), and menu prices may change from time to time. Standard service covers an event duration of 4–6 hours (counted from arrival on site); events outside Greater Jakarta incur an additional transport fee as required.",
          },
        ],
      },
      {
        q: "What about cover charges and equipment damage?",
        a: [
          {
            p: "If a venue outside our partner network applies a cover charge, we will let you know in line with the venue's policy. Loss of or damage to equipment during the event is charged according to the applicable replacement table.",
          },
        ],
      },
      {
        q: "What about boxed orders — are there extra charges?",
        a: [
          {
            p: "There are no extra charges. Boxed orders require a minimum of 25 boxes and are subject to 10% PB1 tax.",
          },
        ],
      },
      {
        q: "Is there a delivery fee?",
        a: [
          {
            p: "Yes, a delivery fee applies to all areas, both Bogor and Jakarta. It is set fairly according to the distance to your event and the size of your order.",
          },
        ],
      },
    ],
  },
];

// ─── Certification ──────────────────────────────────────────────────────────

export const sertifikasi: typeof id.sertifikasi = {
  eyebrow: "Standards & Assurance",
  judul: [
    { text: "Prepared to the " },
    { text: "highest standards", italic: true },
  ],
  deskripsi:
    "Every dish is prepared in a Halal-certified kitchen that applies the HACCP food safety system — so you and your guests can enjoy every dish with peace of mind.",
  items: [
    {
      ...id.sertifikasi.items[0],
      tag: "Certified",
      ket: "Ingredients and every kitchen process meet halal requirements.",
    },
    {
      ...id.sertifikasi.items[1],
      tag: "Certified",
      judul: "HACCP Standard",
      ket: "Food safety and hygiene controlled at every stage.",
    },
  ],
};

// ─── Team ───────────────────────────────────────────────────────────────────

export const teamHeader: typeof id.teamHeader = {
  eyebrow: "Our Team",
  judul: [
    { text: "The people behind every " },
    { text: "celebration", italic: true },
  ],
  deskripsi:
    "For our team, catering is a craft — not simply a job. Passionate about flavour, meticulous with detail and sincere in every act of service; that is what has upheld Tiska's standards for three generations.",
  nilai: ["Passion", "Craftsmanship", "Sincere service", "Consistency"],
};

const teamGroupLabel: Record<string, string> = {
  pimpinan: "Leadership",
  manajemen: "Management",
  operasional: "Kitchen & Operations",
};

const captainBio =
  "Leads the service team on site, keeps the event flowing smoothly from start to finish, and makes sure every team member works promptly, warmly and with a genuine spirit of service.";

const teamBio: Record<string, string> = {
  bimo: "Guides the direction of Tiska's innovation — ensuring every business and service development stays relevant without losing the fundamental values upheld for three generations.",
  rita: "The soul behind every Tiska dish. Through her touch, new menus come to life, beautiful decoration takes shape, and every event feels personal, with flavour that never loses its spirit.",
  ida: "The face and the listener for every story that comes to us. Bridges clients' hopes with real execution, so they can welcome their special occasion with peace of mind.",
  ariz: "The first point of contact for every story that comes to us. Accompanies clients' hopes through to real execution, so they can welcome their special occasion with peace of mind.",
  reza: "More than recording numbers — safeguarding quality standards from behind the scenes. Manages budgets and ingredients carefully, so clients always receive the best flavour and experience.",
  ramadan:
    "Builds meaningful closeness so that Tiska stays emotionally connected with its clients. Adapts business development and communication through digital platforms, making sure every step becomes a complete solution for clients' experiences and needs.",
  sarinah:
    "Manages and leads the production kitchen team, safeguards the quality and flavour of every order at every event scale, and ensures each team member carries out their role with a spirit of service.",
  sulistiyowati:
    "Responsible for the pastry and bakery division, upholding standards of texture, flavour and visual appeal in every dish, while leading new product development to turn fresh ideas into signature creations for our clients.",
  yoga: captainBio,
  asep: captainBio,
  sukir: captainBio,
};

export const teamGroups: typeof id.teamGroups = id.teamGroups.map((g) => ({
  ...g,
  label: teamGroupLabel[g.id] ?? g.label,
  members: g.members.map((m) => ({
    ...m,
    jabatan: m.jabatan === "Kapten" ? "Captain" : m.jabatan,
    bio: teamBio[m.id] ?? m.bio,
  })),
}));

// ─── Closing CTA ────────────────────────────────────────────────────────────

export const cta: typeof id.cta = {
  ...id.cta,
  tombol: { ...id.cta.tombol, label: "Contact Us" },
};

// ─── Footer ─────────────────────────────────────────────────────────────────

export const footer: typeof id.footer = {
  ...id.footer,
  tagline:
    "Celebrate love with the finest flavours. Serving your celebrations since 1980.",
  kolom: {
    ...id.footer.kolom,
    navigasi: [
      { label: "About", href: "/en#profil" },
      { label: "Services", href: "/en/services" },
      { label: "Menu", href: "/en/menu" },
      { label: "Gallery", href: "/en/gallery" },
      { label: "Clients", href: "/en#klien" },
      { label: "FAQ", href: "/en#faq" },
    ],
  },
};

// ─── UI labels ──────────────────────────────────────────────────────────────

export const ui: typeof id.ui = {
  navBeranda: "Tiska Catering home",
  navWhatsapp: "Contact Tiska Catering via WhatsApp",
  navBuka: "Open menu",
  navTutup: "Close menu",
  bahasa: "Language",
  footerNavigasi: "Navigation",
  footerHubungi: "Contact",
  footerIkuti: "Follow",
  footerLayanan: "Services",
  footerArea: "Service Areas",
  layananGeser: "Swipe or use the arrows →",
  layananBerikut: "Next service",
  layananSebelum: "Previous service",
  layananTanya: "Ask about this service",
  layananEndEyebrow: "Another event?",
  layananEndJudul: "Every celebration has its own needs.",
  layananEndTeks: "Tell us about your event and we will shape the service that fits.",
  layananEndCta: "Contact us",
  bukaFoto: "Open highlight photo",
  pratinjauFoto: "Photo preview",
  tutup: "Close",
  sebelumnya: "Previous",
  berikutnya: "Next",
  geserKiri: "Scroll left",
  geserKanan: "Scroll right",
  faqNav: "Question categories",
  pimpinan: "Leadership",
  jelajahiKategori: "Explore categories",
  kabarLainnya: "More news",
  kembaliKabar: "← Back to News",
  logoHalal: "Halal Indonesia logo",
  logoHaccp: "HACCP Certified logo",
};

// ─── SEO metadata (layout template appends " — Tiska Catering") ─────────────

export const seo: typeof id.seo = {
  menu: {
    title: "Catering Menu Jakarta | 800+ Dishes",
    description:
      "Explore 800+ Tiska Catering menu choices: Flavorful Indonesian, Delectable Asian, Pleasant Western, Pasta Special, Tumpeng and Festive Hampers.",
  },
  galeri: {
    title: "Gallery | Catering Jakarta & Bogor Events",
    description:
      "A gallery of celebrations with Tiska Catering — weddings, corporate events, buffets and special hampers in Bogor, Jakarta and Greater Jakarta.",
  },
  kabar: {
    title: "News | Celebration Stories & Seasonal Menus",
    description:
      "Client celebration stories, seasonal offers and selected menus from Tiska Catering for your celebrations in Jakarta, Bogor and beyond.",
  },
};
