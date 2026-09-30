import type { Metadata } from "next";
import Loader from "@/components/layout/Loader";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
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
import PageHero from "@/components/sections/PageHero";
import MenuKategori from "@/components/sections/MenuKategori";
import GaleriRails from "@/components/sections/GaleriRails";
import KabarGrid from "@/components/sections/KabarGrid";
import { alternates, t, type Lang } from "@/lib/i18n";
import { getActiveBanners } from "@/lib/banners/store";
import { getSiteImages } from "@/lib/site-images";
import { getPublicGallery } from "@/lib/gallery/store";
import { getPublishedPosts } from "@/lib/posts/store";
import { postInEnglish, type Post } from "@/lib/posts/types";

/** Metadata halaman statis (menu/galeri/kabar) dari `seo` sesuai bahasa. */
export function pageMetadata(
  key: "menu" | "galeri" | "kabar" | "tentang",
  lang: Lang,
): Metadata {
  const { title, description } = t(lang).seo[key];
  const alt = alternates(`/${key}`, lang);
  return {
    title,
    description,
    alternates: alt,
    openGraph: { url: alt.canonical, title: `${title} — Tiska Catering`, description },
  };
}

// ─── Beranda — 12 section sesuai urutan & ritme terang-gelap docs/04 ────────

export async function HomePage({ lang }: { lang: Lang }) {
  const { faqCategories } = t(lang);
  const [banners, si, galeri] = await Promise.all([
    getActiveBanners(),
    getSiteImages(),
    getPublicGallery(),
  ]);

  // Di /en, banner yang belum diterjemahkan tidak ditampilkan — mengikuti
  // aturan yang sama seperti Kabar. Lebih baik satu slide hilang daripada
  // halaman berbahasa Inggris memuat teks Indonesia.
  const bannersTampil = lang === "en" ? banners.filter((b) => b.en?.judul) : banners;

  // FAQPage — teks sama persis dengan section FAQ.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Loader />
      <Nav lang={lang} />
      <main>
        <Hero photo={si.hero} lang={lang} />
        <CampaignCarousel banners={bannersTampil} lang={lang} />
        <Profil photos={si.profil} lang={lang} />
        <MengapaTiska lang={lang} />
        <Klien lang={lang} />
        <Sejarah photos={si.sejarahTimeline} lang={lang} />
        <Layanan photos={si.layanan} lang={lang} />
        <GaleriAcara items={galeri} lang={lang} />
        <Filosofi lang={lang} />
        <MenuRingkas photos={si.menuRingkas} lang={lang} />
        <Testimoni lang={lang} />
        <FAQ lang={lang} />
        <Sertifikasi lang={lang} />
        <OurTeam photos={si.team} lang={lang} />
        <CTA photo={si.cta} lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}

// ─── Halaman sekunder ───────────────────────────────────────────────────────

export async function MenuPage({ lang }: { lang: Lang }) {
  const { menuPage } = t(lang);
  const si = await getSiteImages();
  return (
    <>
      <Nav lang={lang} />
      <main>
        <PageHero eyebrow={menuPage.eyebrow} judul={menuPage.judul} intro={menuPage.intro} />
        <MenuKategori photos={si.menuKategori} lang={lang} />
        <CTA photo={si.cta} lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}

export async function GaleriPage({ lang }: { lang: Lang }) {
  const { galeriPage } = t(lang);
  const [si, galeri] = await Promise.all([getSiteImages(), getPublicGallery()]);
  return (
    <>
      <Nav lang={lang} />
      <main>
        <PageHero eyebrow={galeriPage.eyebrow} judul={galeriPage.judul} intro={galeriPage.intro} />
        <GaleriRails items={galeri} lang={lang} />
        <CTA photo={si.cta} lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}

/**
 * /tentang — sejarah, tim, dan sertifikasi selama ini hanya hidup sebagai
 * section di beranda. Tidak ada satu URL pun yang bisa dikutip sebagai sumber
 * tentang siapa Tiska; halaman ini yang menjadi sumber itu.
 */
export async function TentangPage({ lang }: { lang: Lang }) {
  const { tentangPage } = t(lang);
  const si = await getSiteImages();
  return (
    <>
      <Nav lang={lang} />
      <main>
        <PageHero
          eyebrow={tentangPage.eyebrow}
          judul={tentangPage.judul}
          intro={tentangPage.intro}
        />

        {/* Fakta ringkas dalam satu blok — bentuk yang paling mudah dikutip
            mesin pencari maupun asisten AI. */}
        <section className="bg-ink px-6 pb-[10vh] md:px-10">
          <div className="mx-auto max-w-[760px]">
            <h2 className="mb-8 text-[11px] uppercase tracking-[0.28em] text-gold-soft">
              {tentangPage.ringkasJudul}
            </h2>
            <dl className="divide-y divide-line">
              {tentangPage.ringkas.map((r) => (
                <div key={r.term} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-8">
                  <dt className="shrink-0 pt-0.5 text-[13px] text-gold-soft sm:w-[160px]">
                    {r.term}
                  </dt>
                  <dd className="text-[15px] leading-[1.75] text-paper/80">{r.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Profil photos={si.profil} lang={lang} />
        <Sejarah photos={si.sejarahTimeline} lang={lang} />
        <Sertifikasi lang={lang} />
        <OurTeam photos={si.team} lang={lang} />
        <Klien lang={lang} />
        <CTA photo={si.cta} lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}

export async function KabarPage({ lang }: { lang: Lang }) {
  const { kabarPage } = t(lang);
  const [all, si] = await Promise.all([getPublishedPosts(), getSiteImages()]);
  // Versi EN hanya menampilkan kabar yang sudah diterjemahkan.
  const posts = lang === "en" ? all.map(postInEnglish).filter((p): p is Post => !!p) : all;
  return (
    <>
      <Nav lang={lang} />
      <main>
        <PageHero eyebrow={kabarPage.eyebrow} judul={kabarPage.judul} intro={kabarPage.intro} />
        <KabarGrid posts={posts} lang={lang} />
        <CTA photo={si.cta} lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
