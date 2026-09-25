import Loader from "@/components/layout/Loader";
import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import CampaignCarousel from "@/components/sections/CampaignCarousel";
import Profil from "@/components/sections/Profil";
import MengapaTiska from "@/components/sections/MengapaTiska";
import Sejarah from "@/components/sections/Sejarah";
import Layanan from "@/components/sections/Layanan";
import Filosofi from "@/components/sections/Filosofi";
import MenuRingkas from "@/components/sections/MenuRingkas";
import Testimoni from "@/components/sections/Testimoni";
import FAQ from "@/components/sections/FAQ";
import Sertifikasi from "@/components/sections/Sertifikasi";
import OurTeam from "@/components/sections/OurTeam";
import GaleriAcara from "@/components/sections/GaleriAcara";
import Klien from "@/components/sections/Klien";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";
import { getActiveBanners } from "@/lib/banners/store";
import { getSiteImages } from "@/lib/site-images";
import { getPublicGallery } from "@/lib/gallery/store";
import type { Metadata } from "next";
import { faqCategories } from "@/lib/content";

export const metadata: Metadata = { alternates: { canonical: "/" } };

// FAQ sebagai rich result di Google — teks sama persis dengan section FAQ.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqCategories.flatMap((c) =>
    c.items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a
          .map((b) =>
            "p" in b
              ? b.p
              : b.list.map((l) => (l.term ? `${l.term}: ${l.text}` : l.text)).join("; "),
          )
          .join(" "),
      },
    })),
  ),
};

/* Beranda — 12 section lengkap sesuai urutan & ritme terang-gelap docs/04. */

// Selalu render segar agar banner & foto yang diganti dari /admin langsung tampil.
// (Catatan: edge-caching/ISR butuh adopsi model "use cache" Next 16 + invalidasi
//  ber-tag — ditunda sebagai pekerjaan terpisah agar tak ada risiko konten basi.)
export const dynamic = "force-dynamic";

export default async function Home() {
  const [banners, si, galeri] = await Promise.all([
    getActiveBanners(),
    getSiteImages(),
    getPublicGallery(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Loader />
      <Nav />
      <main>
        <Hero photo={si.hero} />
        <CampaignCarousel banners={banners} />
        <Profil photos={si.profil} />
        <MengapaTiska />
        <Klien />
        <Sejarah photos={si.sejarahTimeline} />
        <Layanan photos={si.layanan} />
        <GaleriAcara items={galeri} />
        <Filosofi />
        <MenuRingkas photos={si.menuRingkas} />
        <Testimoni />
        <FAQ />
        <Sertifikasi />
        <OurTeam photos={si.team} />
        <CTA photo={si.cta} />
      </main>
      <Footer />
    </>
  );
}
