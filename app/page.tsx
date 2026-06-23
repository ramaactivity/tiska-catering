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
import Klien from "@/components/sections/Klien";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";
import { getActiveBanners } from "@/lib/banners/store";
import { getSiteImages } from "@/lib/site-images";

/* Beranda — 12 section lengkap sesuai urutan & ritme terang-gelap docs/04. */

// Selalu render segar agar banner & foto yang diganti dari /admin langsung tampil.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [banners, si] = await Promise.all([getActiveBanners(), getSiteImages()]);

  return (
    <>
      <Loader />
      <Nav />
      <main>
        <Hero photo={si.hero} />
        <CampaignCarousel banners={banners} />
        <Profil photos={si.profil} />
        <MengapaTiska />
        <Klien />
        <Sejarah photo={si.sejarah} />
        <Layanan photos={si.layanan} />
        <Filosofi />
        <MenuRingkas photos={si.menuRingkas} />
        <Testimoni />
        <CTA photo={si.cta} />
      </main>
      <Footer />
    </>
  );
}
