import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import MenuKategori from "@/components/sections/MenuKategori";
import CTA from "@/components/sections/CTA";
import { menuPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Menu — Tiska Catering | 250+ Pilihan Hidangan",
  description:
    "Jelajahi 250+ pilihan menu Tiska Catering: Flavorful Indonesian, Delectable Asian, Pleasant Western, Pasta Special, Tumpeng, dan Festive Hampers.",
};

export default function MenuPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow={menuPage.eyebrow}
          judul={menuPage.judul}
          intro={menuPage.intro}
        />
        <MenuKategori />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
