import Loader from "@/components/layout/Loader";
import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import Profil from "@/components/sections/Profil";
import MengapaTiska from "@/components/sections/MengapaTiska";
import Sejarah from "@/components/sections/Sejarah";
import Layanan from "@/components/sections/Layanan";
import Filosofi from "@/components/sections/Filosofi";
import MenuRingkas from "@/components/sections/MenuRingkas";
import Sorotan from "@/components/sections/Sorotan";
import Testimoni from "@/components/sections/Testimoni";
import Klien from "@/components/sections/Klien";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

/* Beranda — 12 section lengkap sesuai urutan & ritme terang-gelap docs/04. */

export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <main>
        <Hero />
        <Profil />
        <MengapaTiska />
        <Klien />
        <Sejarah />
        <Layanan />
        <Filosofi />
        <MenuRingkas />
        <Sorotan />
        <Testimoni />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
