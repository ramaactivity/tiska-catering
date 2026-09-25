# SEO & website strategy of caterers ranking for Bogor + JaDeTaBek queries (research date: 25 Sep 2026)

Method note: rankings below come from the WebSearch tool's results (US-based search engine), used as a **proxy** for Google.co.id page 1. They are not real Google ID rankings: order and presence can differ, and location personalisation is missing. Competitor sites were checked with WebFetch and with curl for `<title>`, meta description, JSON-LD `@type` and sitemaps.

## 1. Who ranks for the target queries, and does tiskacatering.com appear?

### Takeaway
Page 1 for every query is dominated by (a) **Jagarasa's network of exact-match microsites** (kateringbogor.id, cateringbogor.or.id, kateringdepok.id, kateringtangerang.id, pernikahan.or.id, jagarasa.com), (b) the price aggregator **cateringprasmanan.com** ("Mulai 20 Ribu"), and (c) **media or blog listicles** (Popbela, WeddingMarket, KBW Love, Daily Catering's own blog). tiskacatering.com did **not** show up as an organic result for any of the 9 generic queries. It reaches page 1 only **indirectly, through listicles** (Popbela, KBW Love) and for brand queries.

### Cited Findings
**"catering pernikahan Bogor"**: weddingmarket.com/artikel/catering-pernikahan-bogor; Popbela "10 Rekomendasi Vendor Catering Wedding Bogor"; pernikahan.or.id/catering-pernikahan-bogor (Jagarasa); cateringprasmanan.com/catering-di-bogor ("Prasmanan Murah Mulai 20 Ribu 2026"); Instagram @sakha.cateringbogor; dailycatering-bogor.com blog listicle; harinikahan.net; cateringbogor.or.id (Jagarasa); catering.jagarasa.id — [WebSearch results, 25 Sep 2026](https://weddingmarket.com/artikel/catering-pernikahan-bogor)
**"catering premium Bogor wedding"**: Instagram @bogorkatering; weddingmarket.com/artikel/catering-pernikahan-di-bogor; Popbela; jagarasa.com/…/paket-wedding-bogor; kbwlove.com/catering-bogor; kateringbogor.id; dailycatering-bogor.com; bogorkatering.com; catering.jagarasa.id — [KBW Love](https://kbwlove.com/catering-bogor/). The search engine's own summary listed **Tiska as "premium-focused … MUI halal … gluten-free and vegetarian options"**, but that text comes from the Popbela listicle, not from a tiskacatering.com result.
**"catering terbaik di Bogor rekomendasi"**: Popbela; StarOfService directory; megantaracatering.com; villabango.com (Puncak villa blog, 5 caterers); cateringbogor.or.id; kbwlove.com; dailycatering-bogor.com (2 blog posts); niezarcatering.com/catering-bogor — [StarOfService](https://www.starofservice.co.id/dir/west-java/bogor/bogor/katering)
**"catering Depok pernikahan"**: weddingmarket "4 Catering Pernikahan Depok"; kateringdepok.id and cateringdepok.or.id (both Jagarasa); StarOfService; cateringprasmanan.com/catering-di-depok; spyneter.com; puspitasawargi.co.id/catering-pernikahan-depok; cateringku.com/area/depok; jagarasa.com paket-wedding-depok — [Puspita Sawargi Depok](https://puspitasawargi.co.id/catering-pernikahan-depok/)
**"catering wedding Tangerang BSD Bintaro"**: Instagram @catering_bintaro_bsd and @cateringbintarobsd; jagarasa.com catering-tangerang and paket-wedding-tangerang; kateringtangerang.id; jatiminangbintaro.com; cateringprasmanan.com/cat/area/bintaro; undangankami.com listicle; vessacatering.co.id/catering-tangerang-selatan — [Vessa](https://www.vessacatering.co.id/catering-tangerang-selatan/)
**"catering Bintaro premium wedding"**: jatiminangbintaro.com; jagarasa.com/product/paket-wedding-di-masjid-jami-bintaro-jaya-sektor-1; cateringprasmanan.com/paket-pernikahan-di-bintaro (Gedung CIMB Niaga Bintaro); walimahplanner.id/catering-pernikahan-bintaro; jagarasa.com/product/paket-wedding-di-taman-hummus-bintaro; puspitasawargi.co.id/catering-bintaro — [Jagarasa venue page](https://jagarasa.com/product/paket-wedding-di-taman-hummus-bintaro/). Jati Minang Bintaro (est. 1993) sells a "premium class" buffet from Rp200,000/pax — [Jati Minang](https://www.jatiminangbintaro.com/tag/paket-catering-murah-tangerang-selatan/)
**"catering Bekasi pernikahan"**: bridestory.com/indonesia/bekasi/catering (directory); enakjoss.com; cateringprasmanan.com/catering-bekasi; puspitasawargi.co.id catering-pernikahan-bekasi and catering-bekasi (**2 pages on page 1**); makanponyo.com (since 1970, "more than 7,400 couples"); cateringjatiasih.com; weddinghnr.com (venue package at Gedung Sartika); rabetocatering.com/catering-bekasi — [Bridestory Bekasi](https://www.bridestory.com/indonesia/bekasi/catering)
**Brand query "Tiska Catering Bogor"**: tiskacatering.com ranks, but the **old URL tiskacatering.com/index.php ("Tiska Catering Services - Home") is still indexed**, and it now returns HTTP 403 (checked with curl). Also ranking: Facebook, perkawis.kotabogor.go.id (Kota Bogor government directory), ZoomInfo, Instagram @tiska.catering, Bridestory /tiska-catering, restaurantguru, idalamat, petalokasi — [Bridestory Tiska](https://www.bridestory.com/tiska-catering); [Perkawis Kota Bogor](https://perkawis.kotabogor.go.id/tempat/tiska-catering-978)

### Inferences
- The SERP for "catering + city" leans heavily toward "murah / mulai 20 ribu" intent. For those queries Tiska should not fight head-on with cheap per-pax pages. Its realistic organic entry points are the **"pernikahan / wedding / premium / mewah" + city** modifiers, **venue-name queries**, and **listicle inclusion**.
- Instagram accounts named after the query (e.g. @cateringbintarobsd) rank directly. Keyword-bearing profile names/bios matter.
- Search-console follow-up: request removal or 301 of /index.php and other legacy PHP URLs to the new pages.

### Gaps
- No true Google.co.id rank data (no SERP API or Search Console access). Local-pack (Maps 3-pack) results were not visible to the tool.
- "catering BSD" and "catering Bogor" (bare) were not run separately. Bare-city results overlapped heavily with the Bogor results above.

## 2. Listicles (media/blog) and who they mention: inclusion as a strategy

### Takeaway
At least 4 Bogor listicles and 1 JaDeTaBek listicle rank on page 1. **Tiska is already in 2 of them (Popbela, KBW Love)** but missing from WeddingMarket and Daily Catering's list. Several listicles are written by competitors themselves (Daily Catering, Adelia, Megantara), which is a deliberate tactic.

### Cited Findings
- **Popbela, "10 Rekomendasi Vendor Catering Wedding Bogor"** (Astri Amalia, 13 Jul 2025): Fnz Catering, Vanila Catering (Tanah Sereal, est. 2020, "profesional, higienis, dan mewah"), Diva Catering (15 years), Bogor Katering (MUI halal), Sakha, LaMira, **Tiska Catering** (listed at "Jl. Waliwis No.3, RT.02/RW.06, Tanah Sereal", WA 081383108103, "premium", MUI halal, gluten-free and vegetarian options), Mumtaza, Kenanga (since 1981 per article), Adelia (since 2009 per article). No prices — [Popbela](https://www.popbela.com/relationship/married/vendor-catering-wedding-bogor-00-ck827-xxg2ls)
- **KBW Love, "Catering Bogor Murah Tapi Mewah?"** (21 Dec 2025): Fnz & Trigas (Rp30k/pax), Vanila (Rp35k), Violette, Diva (Rp32k), Bogor Katering/Asia Catering (Rp30k), Daily Catering (Rp33k), PT Aroma Langit Nusantara, LaMira, **Tiska** ("pilihan Nusantara, Western…", recommended for receptions whose guest profile "membutuhkan lebih banyak variasi dibanding buffet Nusantara standar"), Mumtaza — [KBW Love](https://kbwlove.com/catering-bogor/)
- **WeddingMarket, "7 Catering Pernikahan Bogor"** (11 Jun 2020, old but still ranking): Sal Wedding, Alihamdan, Wida Wedding, Daily Catering, Adelia ("elegant and high class"), Putri Catering (from Rp20k), Vanila — [WeddingMarket](https://weddingmarket.com/artikel/catering-pernikahan-bogor). A second WeddingMarket article, "Rekomendasi Catering Pernikahan di Bogor yang Terbaik", also ranks — [WeddingMarket 2](https://weddingmarket.com/artikel/catering-pernikahan-di-bogor)
- **Daily Catering blog, "10 Catering Top di Jabodetabek untuk Pernikahan"** (a competitor-owned listicle that puts itself at #1): Daily Catering, Alfabet (Jaksel, since 1996), Naumi (Bogor), Puspa (Jakarta, since 1984), Medina (Jaksel), Kencana Mas (Depok), Akasya (since 1991), Jagarasa, Lala (since 2010; "Rp35 juta untuk 200 porsi"), Tiga Dara — [Daily Catering blog](https://dailycatering-bogor.com/blog/ini-daftar-10-catering-top-di-jabodetabek-untuk-pernikahan-kamu)
- Other ranking lists: sekilasinfo.net "10 Rekomendasi Catering Bogor Terpercaya" — [Sekilasinfo](https://sekilasinfo.net/catering-bogor-terpercaya-dan-terbaik/); villabango.com "5 Rekomendasi Catering di Puncak Bogor" (Azzahra, Niezar, …) — [Villa Bango](https://www.villabango.com/post/catering-puncak-bogor); WeddingMarket "4 Catering Pernikahan Depok" — [WeddingMarket Depok](https://weddingmarket.com/artikel/catering-pernikahan-depok); undangankami.com "Daftar Catering Pernikahan di Tangerang" — [Undangankami](https://www.undangankami.com/daftar-catering-pernikahan-di-tangerang-dan-sekitarnya/)
- Directories on page 1: StarOfService (Bogor, Depok), Bridestory (Bekasi, and a Tiska profile exists), cateringku.com — [StarOfService Depok](https://www.starofservice.co.id/dir/west-java/depok/depok/katering)

### Inferences
- **NAP inconsistency risk:** Popbela lists Tiska at "Jl. Waliwis No.3", while other sources and the site say "Jl. Julang I No. 3 Tanah Sereal". Verify which address is correct and ask Popbela to fix it. Inconsistent NAP weakens local ranking.
- Low-effort wins: pitch WeddingMarket (its 2020 article is stale), Sekilasinfo and undangankami for an update or inclusion, with a ready-made paragraph plus photos. KBW Love's framing of Tiska ("variasi lebih dari buffet Nusantara standar") matches the brand and is worth reinforcing.

### Gaps
- Could not read the WeddingMarket #2 and Sekilasinfo article contents in full (not fetched).

## 3. Premium / serious competitors: site anatomy

### Takeaway
None of the competitors pairs a heritage-premium brand with a strong SEO structure. The SEO-strong players (Jagarasa, Puspita Sawargi, cateringprasmanan.com) use **templated city, district and venue pages**. The heritage players (Kenanga since 1984, Daily Catering) have thin sites and bulk blogs. Tiska already has the best technical base (FoodEstablishment + FAQPage JSON-LD) but only ~8 indexed URLs.

### Cited Findings
**Jagarasa Catering (the SEO leader, mid-market)**
- Runs a network of city exact-match domains: kateringbogor.id, cateringbogor.or.id, catering.jagarasa.id, kateringdepok.id, cateringdepok.or.id, kateringtangerang.id, pernikahan.or.id, jagarasa.com — [kateringbogor.id](https://kateringbogor.id/), [kateringdepok.id](https://kateringdepok.id/), [kateringtangerang.id](https://kateringtangerang.id/)
- kateringbogor.id title: "Catering Bogor — Prasmanan & Paket Wedding | Jagarasa Catering". Meta description: "…spesialis prasmanan & paket wedding untuk Bogor Kota/Kab. Gratis ongkir ≥200 pax. Cakupan Tanah Sareal, Baranangsiang, Cibinong, Sentul, Dramaga, Sukaraja…" (via curl). It is a long modular template: Ruby/Saphire/Diamond/Premium packages, a 6-question FAQ, and **published prices** (prasmanan Rp38k–75k/pax, min 100 pax; wedding packages Rp25jt–105jt) — [kateringbogor.id](https://kateringbogor.id/)
- **Venue landing pages:** "Paket Pernikahan di IPB International Convention Center Bogor" (pernikahan.or.id), "Paket Wedding di Taman Hummus Bintaro", "…di Masjid Jami Bintaro Jaya Sektor 1". Premium resort venues Pullman Ciawi Vimala Hills, Royal Tulip Gunung Geulis and R Hotel Rancamaya appear in its Bogor wedding packages (from Rp50jt) — [pernikahan.or.id IICC](https://pernikahan.or.id/paket-pernikahan-di-ipb-international-convention-center-bogor); [jagarasa Bogor packages](https://jagarasa.com/product-category/paket-wedding-all-in/paket-wedding-all-in-sejuta-rasa/paket-wedding-bogor/)

**Puspita Sawargi (positions as "premium mewah", Jakarta-centred)**
- Title: "Wedding & Catering Services Premium Mewah Terbaik di Jakarta | Puspita Sawargi". H1: "Wedding Package & Catering Services" — [Puspita Sawargi](https://puspitasawargi.co.id/)
- The page sitemap holds ~28 templated location/service pages: catering-bekasi, -bintaro, -bsd, -cibubur, -depok, -gading-serpong, -jatiasih, -kelapa-gading, -pik, jakarta-barat/pusat/selatan/timur/utara, catering-pernikahan-{bekasi,depok,jakarta,tangerang,mewah}, catering-prasmanan-{bekasi,depok,jakarta,tangerang}, plus event pages (lamaran, khitanan, syukuran, ulang-tahun). There is **no Bogor page** (curl of page-sitemap.xml). It also has a geo-sitemap — [sitemap](https://puspitasawargi.co.id/page-sitemap.xml)
- Location page H1: "Catering Pernikahan/Wedding Terbaik di Bekasi". Moderate length, templated, dish photos, FAQ, no prices, claims "since 1998", "five-star quality" — [Bekasi page](https://puspitasawargi.co.id/catering-pernikahan-bekasi/)
- Social proof: celebrity clients Ruben Onsu (2021), Raffi Ahmad (2022), Indra Bekti (2023); halal and hygiene certificates shown. Blog is only 10 posts, last modified Sep 2025. JSON-LD is WebSite/WebPage/Breadcrumb only (Yoast default) — [Puspita Sawargi](https://puspitasawargi.co.id/)

**Daily Catering (Bogor + Jakarta, Pasadena group)**
- Title: "Daily Catering | Catering Halal No. 1 di Jakarta, Bogor, Depok, Tangerang, dan Bekasi". Meta: "…catering pilihan untuk pernikahan banyak publik figur/ artis, acara akbar pemerintahan, hingga meeting perusahaan besar. Dengan harga paling bersaing di kelasnya." (curl) — [Daily Catering](https://dailycatering-bogor.com/)
- Navigation: Pricelist, Gallery, Service, Review, Blog, FAQ. No city landing pages. The sitemap has 55 URLs, mostly blog plus hampers campaign pages, last modified 23 Sep 2025. The WhatsApp lead form asks for catering type, guest count (<100 to >1000) and date. Free consultation and food tasting. Branches: Jl. Arimbi IV No.10 Bogor and Jl. Laksana I Jakarta. JSON-LD: Organization — [Daily Catering](https://dailycatering-bogor.com/)
- Uses its blog to publish "top 10" listicles that rank #1 for "catering top Jabodetabek" and "catering terenak Bogor" — [blog](https://dailycatering-bogor.com/blog/pilihan-catering-terenak-untuk-setiap-acara-di-bogor)

**Kenanga Catering (Bogor Tengah, the closest heritage rival)**
- Title: "KENANGA CATERING - Catering Halal sejak 1984". H1: "Lengkapi Setiap Momen Dengan Kenanga Catering". Meta: "…bersertifikasi halal yang melayani area Jabodetabek… sejak tahun 1984." Navigation: Layanan, About, Artikel, Request Menu, Catering Untuk Rumahan / Acara & Kantor / Lamaran & Nikahan. No prices, no testimonials. Four WhatsApp numbers. JSON-LD: LocalBusiness, Organization, WebSite — [Kenanga](https://www.kenangacatering.com/)
- Founding year conflicts: the site says 1984, while Popbela says 1981 — [Popbela](https://www.popbela.com/relationship/married/vendor-catering-wedding-bogor-00-ck827-xxg2ls)
- Blog: 30+ articles, many **batch-published on the same dates (14 and 19 Jun 2025)**, generic topics (frozen food, nasi kebuli, hampers, "catering syariah di Jakarta"), i.e. likely bulk or AI content — [Kenanga sitemap](https://www.kenangacatering.com/sitemap.xml)

**Vessa Catering (Jakarta/Tangsel, "premium")**
- Home title: "Jasa Catering Premium Berkualitas di Jakarta - Vessa Catering" — [Vessa](https://www.vessacatering.co.id/)
- Its area page "Jasa Catering Terbaik Tangerang Selatan…" is a ~1,200-word templated article with repeated keyword phrasing. It lists Bintaro, BSD, Ciputat, Serpong, Pamulang and Pondok Aren. No prices, HACCP + halal logos, free food tasting promotion. Area pages are blog posts: **~90 posts** in the post sitemap. Pages: wedding-services, event-corporate-service, reservation — [Vessa Tangsel](https://www.vessacatering.co.id/catering-tangerang-selatan/)

**Others noted**
- Alfabet Catering (Jaksel, since 1996), Puspa Catering (since 1984; publishes "Daftar Rekanan Gedung" on Bridestory), Akasya (since 1991): Jakarta heritage premium players — [Daily Catering list](https://dailycatering-bogor.com/blog/ini-daftar-10-catering-top-di-jabodetabek-untuk-pernikahan-kamu); [Puspa rekanan gedung](https://www.bridestory.com/puspa-catering/projects/daftar-rekanan-gedung-puspa-catering). alfabetcatering.com refused connections, so it could not be audited.
- Adelia Catering (Bogor) publishes venue content ("Daftar Gedung Pernikahan Indoor dan Outdoor di Bogor"), which ranked for a venue-vendor query. Domain adeliacatering.co.id did not resolve (DNS) at fetch time — [search result](https://adeliacatering.co.id/Info/daftar-gedung-pernikahan-indoor-dan-outdoor-di-bogor/)
- Rumah Makan Ponyo (since 1970, "7,400+ couples"), Jati Minang Bintaro (since 1993) — [Ponyo](https://www.makanponyo.com/catering-pernikahan-murah-di-bekasi/)

**Tiska's current state (for comparison)**
- Title: "Tiska Catering — Celebrate Love with the Finest Flavours". Meta: "Katering premium di Bogor, Jakarta, dan JaDeTaBek sejak 1980. Tiga generasi…" JSON-LD: FoodEstablishment + PostalAddress + FAQPage (curl). The sitemap has only 8 URLs (/, /menu, /galeri, /kabar + 4 kabar posts). **No city/area pages, no service/event pages, no venue pages** — [tiskacatering.com](https://tiskacatering.com/)

### Inferences
- Tiska's "since 1980" is the **oldest heritage claim among Bogor competitors found** (Kenanga 1984, Puspita 1998, Daily n/a). It should appear in the title/meta for city pages ("sejak 1980").
- The title tag "Celebrate Love with the Finest Flavours" contains no keyword (no "catering", no "Bogor"). Every ranking competitor puts "Catering + city" in the title.
- A premium-but-SEO-sound pattern would be: a small set of **rich** pages (Bogor, Bintaro/Tangsel as a real kitchen hub, Jakarta Selatan, Depok) plus **event pages** (pernikahan, korporat, lamaran/akad) plus **venue pages** for Bogor premium venues. Avoid Puspita-style 28 thin clones, which conflict with the elegant brand and risk "doorway page" treatment.
- Prices: the mid-market (Jagarasa) publishes them, but the premium/heritage players (Kenanga, Puspita, Daily, Vessa) do not. Consistent with Tiska not publishing, though a "mulai dari" starting point is optional.
- Content: competitor blogs are bulk or thin (Kenanga batch posts, Vessa's 90 templated posts). A handful of genuinely useful Bogor-specific pieces (venue guides, "berapa porsi untuk 500 tamu", adat Sunda menu) would stand out.

### Gaps
- **Google Business Profile ratings/review counts: not findable** with the available tools (Maps not exposed). Needs a manual check in Google Maps for Tiska, Kenanga, Daily Catering, Jagarasa Bogor, Adelia and Vanila.
- Blog post counts for Jagarasa sites, and Daily Catering's exact post dates, were not verified.
- Alfabet and Adelia sites could not be audited (connection/DNS failure).

## 4. Bogor wedding venues with rekanan (partner) caterer lists

### Takeaway
Several of the most popular Bogor venues **require caterers from their partner list**, so being a rekanan is both a sales channel and a visibility/backlink channel. Public online lists naming the partner caterers were not found. They are usually distributed as PDF booking guides.

### Cited Findings
- **Puri Begawan** (Jl. Raya Pajajaran No.5-7): only partner caterers are allowed; outside food is prohibited; caterer "H. Kasmu" is referenced as a partner. A booking-guide PDF circulates on Scribd — [Scribd booking guide](https://www.scribd.com/document/757095444/Booking-Guide-Ballroom-Puri-Begawan); [Bridestory Puri Begawan](https://www.bridestory.com/puri-begawan). A blogger reported catering there from Rp90,000/person — [faradiladputri.com](https://faradiladputri.com/pemilihan-vendor-gedung-di-bogor/)
- **IPB International Convention Center (Botani Square)**: catering and décor must be partner vendors, "all payments go through IICC". Up to 1,000 guests — [faradiladputri.com](https://faradiladputri.com/pemilihan-vendor-gedung-di-bogor/); [BLST](https://blst.co.id/ipb-international-convention-center/). Jagarasa has a dedicated IICC package page — [pernikahan.or.id](https://pernikahan.or.id/paket-pernikahan-di-ipb-international-convention-center-bogor)
- **Harmony Banquet Hall**: catering and décor from partner vendors required. **Klub Bogor Raya**: outside vendors allowed with an extra fee — [WeddingMarket gedung Bogor (via search summary)](https://weddingmarket.com/artikel/gedung-pernikahan-di-bogor)
- Other popular venues: Yasmin/Jasmine Harmoni, Braja Mustika Convention Center, Paradisso Wedding Hall (Bukit Cimanggu City) — [faradiladputri.com](https://faradiladputri.com/pemilihan-vendor-gedung-di-bogor/); premium resorts Pullman Ciawi Vimala Hills, Royal Tulip Gunung Geulis, R Hotel Rancamaya — [Jagarasa](https://jagarasa.com/product-category/paket-wedding-all-in/paket-wedding-all-in-sejuta-rasa/paket-wedding-bogor/)
- Precedent: Puspa Catering publishes its own "Daftar Rekanan Gedung" as a Bridestory project — [Bridestory](https://www.bridestory.com/puspa-catering/projects/daftar-rekanan-gedung-puspa-catering)

### Inferences
- Tiska should (1) ask the venues where it is already a partner to list it with a link to tiskacatering.com on their site and Bridestory/WeddingMarket profiles, and (2) publish its own "Venue rekanan" page on-site (like Puspa) with photos of real events at each venue. That captures "[venue] catering" long-tail queries, which Jagarasa is currently harvesting with package pages.

### Gaps
- No current (2026) official rekanan list for Puri Begawan, IICC, Harmony, Royal Tulip or Pullman Vimala was found online. Whether Tiska is on any of them is unknown and should be confirmed with the client.
