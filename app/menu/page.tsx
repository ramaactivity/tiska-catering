import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import MenuKategori from "@/components/sections/MenuKategori";
import CTA from "@/components/sections/CTA";
import { menuPage } from "@/lib/content";
import { getSiteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Menu — Tiska Catering | 800+ Pilihan Hidangan",
  description:
    "Jelajahi 800+ pilihan menu Tiska Catering: Flavorful Indonesian, Delectable Asian, Pleasant Western, Pasta Special, Tumpeng, dan Festive Hampers.",
};

export default async function MenuPage() {
  const si = await getSiteImages();
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow={menuPage.eyebrow}
          judul={menuPage.judul}
          intro={menuPage.intro}
        />
        <MenuKategori photos={si.menuKategori} />
        <CTA photo={si.cta} />
      </main>
      <Footer />
    </>
  );
}
