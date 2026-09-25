import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/sections/CTA";
import Reveal from "@/components/motion/Reveal";
import { t, type Lang } from "@/lib/i18n";
import { getPublishedPostBySlug, getPublishedPosts } from "@/lib/posts/store";
import { postInEnglish, type Post } from "@/lib/posts/types";
import { getSiteImages } from "@/lib/site-images";

const base = (lang: Lang) => (lang === "en" ? "/en/news" : "/kabar");

/** Kabar sesuai bahasa; versi EN null bila belum diterjemahkan. */
async function findPost(slug: string, lang: Lang): Promise<Post | null> {
  const post = await getPublishedPostBySlug(slug);
  if (!post) return null;
  return lang === "en" ? postInEnglish(post) : post;
}

export async function kabarDetailMetadata(slug: string, lang: Lang): Promise<Metadata> {
  const raw = await getPublishedPostBySlug(slug);
  const post = raw && (lang === "en" ? postInEnglish(raw) : raw);
  if (!post) return { title: lang === "en" ? "News not found" : "Kabar tidak ditemukan" };
  const url = `${base(lang)}/${post.slug}`;
  return {
    title: post.judul,
    description: post.ringkasan,
    alternates: {
      canonical: url,
      // hreflang hanya bila kabar punya versi Inggris
      ...(raw.en?.judul && {
        languages: { id: `/kabar/${post.slug}`, en: `/en/news/${post.slug}`, "x-default": `/kabar/${post.slug}` },
      }),
    },
    openGraph: {
      type: "article",
      url,
      locale: lang === "en" ? "en_US" : "id_ID",
      title: post.judul,
      description: post.ringkasan,
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      images: [{ url: post.imageUrl, alt: post.imageAlt }],
    },
  };
}

export default async function KabarDetail({ slug, lang }: { slug: string; lang: Lang }) {
  const post = await findPost(slug, lang);
  if (!post) {
    // Kabar ada tapi belum diterjemahkan → arahkan ke daftar kabar EN.
    if (lang === "en" && (await getPublishedPostBySlug(slug))) redirect("/en/news");
    notFound();
  }
  const { kabarPage, ui } = t(lang);

  const [lainnyaAll, si] = await Promise.all([getPublishedPosts(), getSiteImages()]);
  const lainnya = lainnyaAll
    .map((p) => (lang === "en" ? postInEnglish(p) : p))
    .filter((p): p is Post => !!p && p.id !== post.id)
    .slice(0, 3);
  const isi = post.isi?.trim() ?? "";
  const isHTML = /<[a-z][\s\S]*>/i.test(isi);
  const paragraf = isHTML
    ? []
    : isi.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.judul,
    description: post.ringkasan,
    image: [post.imageUrl],
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    inLanguage: lang,
    author: { "@type": "Organization", name: "Tiska Catering" },
    publisher: { "@type": "Organization", name: "Tiska Catering" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Nav lang={lang} />
      <main>
        <article className="bg-ink px-6 pt-[24vh] pb-[12vh] md:px-10">
          <div className="mx-auto max-w-[820px]">
            <Reveal>
              <p className="mb-6 flex items-center justify-center gap-3.5 text-[11px] uppercase tracking-[0.28em] text-gold-soft">
                <span aria-hidden className="h-px w-10 bg-gold" />
                {kabarPage.kategoriLabel[post.kategori]}
                {post.periode && (
                  <>
                    <span className="text-paper/55">·</span>
                    <span className="text-paper/70">{post.periode}</span>
                  </>
                )}
                <span aria-hidden className="h-px w-10 bg-gold" />
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="text-center font-display text-[clamp(34px,5.5vw,68px)] font-light leading-[1.02] tracking-[-0.02em] text-paper">
                {post.judul}
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mx-auto mt-7 max-w-[600px] text-center text-[clamp(15px,1.8vw,18px)] leading-[1.75] text-[#cbc5b8]">
                {post.ringkasan}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mx-auto mt-12 max-w-[1080px]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl md:aspect-[16/9]">
              <Image
                src={post.imageUrl}
                alt={post.imageAlt}
                fill
                priority
                sizes="(min-width: 1080px) 1080px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          {isHTML ? (
            <Reveal className="mx-auto mt-14 max-w-[680px]">
              <div
                className="kabar-prose text-[clamp(15px,1.7vw,17px)] text-paper/80"
                dangerouslySetInnerHTML={{ __html: isi }}
              />
            </Reveal>
          ) : (
            paragraf.length > 0 && (
              <div className="mx-auto mt-14 max-w-[680px]">
                {paragraf.map((teks, i) => (
                  <Reveal key={i} delay={0.04}>
                    <p className="mb-6 text-[clamp(15px,1.7vw,17px)] leading-[1.85] text-paper/80">
                      {teks}
                    </p>
                  </Reveal>
                ))}
              </div>
            )
          )}

          <Reveal delay={0.05} className="mx-auto mt-12 max-w-[680px] text-center">
            <a
              href={post.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-gold/70 px-8 py-[14px] text-[12.5px] font-normal uppercase tracking-[0.18em] text-gold-soft transition-colors duration-500 hover:text-ink"
            >
              <span
                aria-hidden
                className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-out group-hover:translate-y-0"
              />
              <span className="relative">{post.ctaLabel}</span>
              <span
                aria-hidden
                className="relative transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            <div className="mt-8">
              <Link
                href={base(lang)}
                className="text-[12px] uppercase tracking-[0.2em] text-paper/55 transition-colors duration-300 hover:text-gold-soft"
              >
                {ui.kembaliKabar}
              </Link>
            </div>
          </Reveal>
        </article>

        {lainnya.length > 0 && (
          <section className="bg-ink px-6 pb-[14vh] md:px-10">
            <div className="mx-auto max-w-[1280px]">
              <p className="mb-9 flex items-center gap-3.5 text-[11px] uppercase tracking-[0.28em] text-gold-soft">
                <span aria-hidden className="h-px w-10 bg-gold" />
                {ui.kabarLainnya}
              </p>
              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {lainnya.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 3) * 0.08}>
                    <KabarMini
                      judul={p.judul}
                      imageUrl={p.imageUrl}
                      imageAlt={p.imageAlt}
                      kategori={kabarPage.kategoriLabel[p.kategori]}
                      href={`${base(lang)}/${p.slug}`}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTA photo={si.cta} lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}

function KabarMini({
  href,
  judul,
  imageUrl,
  imageAlt,
  kategori,
}: {
  href: string;
  judul: string;
  imageUrl: string;
  imageAlt: string;
  kategori: string;
}) {
  return (
    <Link href={href} className="group block">
      <figure className="relative aspect-[4/5] overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-[1300ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:scale-[1.06]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(14,13,10,0.82))]"
        />
        <figcaption className="absolute inset-x-5 bottom-4 text-[10.5px] uppercase tracking-[0.22em] text-gold-soft">
          {kategori}
        </figcaption>
      </figure>
      <h3 className="mt-4 font-display text-[19px] font-light leading-[1.2] text-paper transition-colors duration-300 group-hover:text-gold-soft">
        {judul}
      </h3>
    </Link>
  );
}
