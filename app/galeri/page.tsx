import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import GaleriGrid from "@/components/sections/GaleriGrid";
import CTA from "@/components/sections/CTA";
import { galeriPage } from "@/lib/content";
import { getSiteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Galeri — Tiska Catering | Portofolio Perayaan",
  description:
    "Galeri momen perayaan bersama Tiska Catering — pernikahan, acara korporat, buffet, hingga hampers istimewa di Bogor, Jakarta, dan JaDeTaBek.",
};

export default async function GaleriPage() {
  const si = await getSiteImages();
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow={galeriPage.eyebrow}
          judul={galeriPage.judul}
          intro={galeriPage.intro}
        />
        <GaleriGrid />
        <CTA photo={si.cta} />
      </main>
      <Footer />
    </>
  );
}
