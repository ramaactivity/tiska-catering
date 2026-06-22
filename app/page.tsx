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

/* Beranda — 12 section lengkap sesuai urutan & ritme terang-gelap docs/04. */

export default async function Home() {
  const banners = await getActiveBanners();

  return (
    <>
      <Loader />
      <Nav />
      <main>
        <Hero />
        <CampaignCarousel banners={banners} />
        <Profil />
        <MengapaTiska />
        <Klien />
        <Sejarah />
        <Layanan />
        <Filosofi />
        <MenuRingkas />
        <Testimoni />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
