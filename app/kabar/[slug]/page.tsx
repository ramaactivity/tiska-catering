import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/sections/CTA";
import Reveal from "@/components/motion/Reveal";
import { kabarPage } from "@/lib/content";
import { getPublishedPostBySlug, getPublishedPosts } from "@/lib/posts/store";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: "Kabar tidak ditemukan — Tiska Catering" };
  return {
    title: `${post.judul} — Tiska Catering`,
    description: post.ringkasan,
    openGraph: {
      title: post.judul,
      description: post.ringkasan,
      images: [{ url: post.imageUrl }],
    },
  };
}

export default async function KabarDetail({ params }: Params) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const lainnya = (await getPublishedPosts())
    .filter((p) => p.id !== post.id)
    .slice(0, 3);
  const isi = post.isi?.trim() ?? "";
  const isHTML = /<[a-z][\s\S]*>/i.test(isi);
  const paragraf = isHTML
    ? []
    : isi.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  return (
    <>
      <Nav />
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
                href="/kabar"
                className="text-[12px] uppercase tracking-[0.2em] text-paper/55 transition-colors duration-300 hover:text-gold-soft"
              >
                ← Kembali ke Kabar
              </Link>
            </div>
          </Reveal>
        </article>

        {lainnya.length > 0 && (
          <section className="bg-ink px-6 pb-[14vh] md:px-10">
            <div className="mx-auto max-w-[1280px]">
              <p className="mb-9 flex items-center gap-3.5 text-[11px] uppercase tracking-[0.28em] text-gold-soft">
                <span aria-hidden className="h-px w-10 bg-gold" />
                Kabar lainnya
              </p>
              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {lainnya.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 3) * 0.08}>
                    <KabarMini
                      slug={p.slug}
                      judul={p.judul}
                      imageUrl={p.imageUrl}
                      imageAlt={p.imageAlt}
                      kategori={kabarPage.kategoriLabel[p.kategori]}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTA />
      </main>
      <Footer />
    </>
  );
}

function KabarMini({
  slug,
  judul,
  imageUrl,
  imageAlt,
  kategori,
}: {
  slug: string;
  judul: string;
  imageUrl: string;
  imageAlt: string;
  kategori: string;
}) {
  return (
    <Link href={`/kabar/${slug}`} className="group block">
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
