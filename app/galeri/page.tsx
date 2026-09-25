import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import GaleriRails from "@/components/sections/GaleriRails";
import CTA from "@/components/sections/CTA";
import { galeriPage } from "@/lib/content";
import { getSiteImages } from "@/lib/site-images";
import { getPublicGallery } from "@/lib/gallery/store";

export const metadata: Metadata = {
  title: "Galeri | Portofolio Perayaan",
  description:
    "Galeri momen perayaan bersama Tiska Catering — pernikahan, acara korporat, buffet, hingga hampers istimewa di Bogor, Jakarta, dan JaDeTaBek.",
  alternates: { canonical: "/galeri" },
  openGraph: {
    url: "/galeri",
    title: "Galeri | Portofolio Perayaan — Tiska Catering",
    description:
      "Galeri momen perayaan bersama Tiska Catering — pernikahan, acara korporat, buffet, hingga hampers istimewa di Bogor, Jakarta, dan JaDeTaBek.",
  },
};

export const dynamic = "force-dynamic";

export default async function GaleriPage() {
  const [si, galeri] = await Promise.all([getSiteImages(), getPublicGallery()]);
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow={galeriPage.eyebrow}
          judul={galeriPage.judul}
          intro={galeriPage.intro}
        />
        <GaleriRails items={galeri} />
        <CTA photo={si.cta} />
      </main>
      <Footer />
    </>
  );
}
