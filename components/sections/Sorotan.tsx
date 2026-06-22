import Link from "next/link";
import Image from "next/image";
import { sorotan, kabarPage } from "@/lib/content";
import { getFeaturedPost } from "@/lib/posts/store";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";

/**
 * Sorotan beranda (docs/04 sisipan) — 1 postingan unggulan dari /admin.
 * Tampil hanya bila ada kabar terbit; kalau kosong, section ini hilang total
 * supaya beranda tetap rapi.
 */
export default async function Sorotan() {
  const post = await getFeaturedPost();
  if (!post) return null;

  return (
    <section className="bg-ink px-6 py-[14vh] md:px-10">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 md:grid-cols-2 md:gap-16">
        <Reveal className="md:order-2">
          <Link
            href={`/kabar/${post.slug}`}
            className="group relative block aspect-[5/4] overflow-hidden rounded-xl"
          >
            <Image
              src={post.imageUrl}
              alt={post.imageAlt}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:scale-[1.05]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(14,13,10,0.55))]"
            />
          </Link>
        </Reveal>

        <div className="md:order-1">
          <Reveal>
            <p className="mb-5 flex items-center gap-3.5 text-[11px] uppercase tracking-[0.3em] text-gold-soft">
              <span aria-hidden className="h-px w-10 bg-gold" />
              {sorotan.eyebrow}
            </p>
          </Reveal>
          <h2 className="font-display text-[clamp(28px,3.6vw,50px)] font-light leading-[1.0] tracking-[-0.02em] text-paper">
            <WordReveal segments={sorotan.judul} />
          </h2>

          <Reveal delay={0.12}>
            <div className="mt-7 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-gold-soft/90">
              <span>{kabarPage.kategoriLabel[post.kategori]}</span>
              {post.periode && (
                <>
                  <span aria-hidden className="h-px w-6 bg-gold/50" />
                  <span className="text-paper/65">{post.periode}</span>
                </>
              )}
            </div>
            <h3 className="mt-3 font-display text-[clamp(22px,2.4vw,32px)] font-light leading-[1.2] text-paper">
              {post.judul}
            </h3>
            <p className="mt-3 max-w-[480px] text-[15px] leading-[1.75] text-paper/70">
              {post.ringkasan}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Link
                href={`/kabar/${post.slug}`}
                className="group inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-gold-bright"
              >
                {sorotan.selengkapnya}
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <Link
                href="/kabar"
                className="text-[12px] uppercase tracking-[0.2em] text-paper/55 transition-colors duration-300 hover:text-gold-soft"
              >
                {sorotan.semua}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
