import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import KabarGrid from "@/components/sections/KabarGrid";
import CTA from "@/components/sections/CTA";
import { kabarPage } from "@/lib/content";
import { getPublishedPosts } from "@/lib/posts/store";
import { getSiteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Kabar — Tiska Catering | Promo, Momen & Menu Musiman",
  description:
    "Kabar terbaru Tiska Catering — penawaran musiman, momen spesial, dan menu pilihan untuk perayaan Anda di Bogor, Jakarta, dan sekitarnya.",
};

export const dynamic = "force-dynamic";

export default async function KabarPage() {
  const [posts, si] = await Promise.all([getPublishedPosts(), getSiteImages()]);

  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow={kabarPage.eyebrow}
          judul={kabarPage.judul}
          intro={kabarPage.intro}
        />
        <KabarGrid posts={posts} />
        <CTA photo={si.cta} />
      </main>
      <Footer />
    </>
  );
}
