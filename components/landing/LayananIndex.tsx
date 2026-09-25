import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import CTA from "@/components/sections/CTA";
import Reveal from "@/components/motion/Reveal";
import { layanan } from "@/lib/content";
import { landingPath, layananIndex, services } from "@/lib/landing";
import type { Lang } from "@/lib/i18n";

/** Indeks layanan: 4 layanan utama (bertautan) + seluruh 11 bentuk layanan. */
export default function LayananIndex({ lang }: { lang: Lang }) {
  const t = layananIndex[lang];
  return (
    <>
      <Nav />
      <main>
        <PageHero eyebrow={t.eyebrow} judul={t.h1} intro={t.intro} />

        <section className="bg-paper-bg px-6 py-20 md:px-10 md:py-[14vh]">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid border-t border-line-d/70 md:grid-cols-2">
              {services.map((s, i) => (
                <Reveal key={s.slug.id} delay={(i % 2) * 0.08}>
                  <Link
                    href={landingPath(s, lang)}
                    className="group block h-full border-b border-line-d/70 py-10 md:pr-12"
                  >
                    <p className="font-display text-[13px] tracking-[0.1em] text-gold-deep">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-4 font-display text-[clamp(28px,3.4vw,44px)] font-light leading-[1.05] text-paper-ink">
                      {s.label[lang]}
                    </h2>
                    <p className="mt-4 max-w-[460px] text-[14.5px] leading-[1.8] text-paper-ink/65">
                      {s.copy[lang].intro}
                    </p>
                    <p className="mt-6 text-[12px] uppercase tracking-[0.14em] text-gold-deep">
                      {t.lihat}{" "}
                      <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>

            <h2 className="mt-28 font-display text-[clamp(26px,3vw,40px)] font-light text-paper-ink">
              {t.semua}
            </h2>
            <ul className="mt-8 grid border-t border-line-d/70 sm:grid-cols-2 lg:grid-cols-3">
              {layanan.map((item) => (
                <li key={item.judul} className="border-b border-line-d/70 py-6 sm:pr-8">
                  <h3 className="font-display text-[19px] text-paper-ink">{item.judul}</h3>
                  <p className="mt-2 text-[14px] leading-[1.75] text-paper-ink/65">{item.deskripsi}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  );
}
