import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import Klien from "@/components/sections/Klien";
import Sertifikasi from "@/components/sections/Sertifikasi";
import QuoteForm from "@/components/landing/QuoteForm";
import Reveal from "@/components/motion/Reveal";
import RichTitle from "@/components/ui/RichTitle";
import {
  areas,
  companyProfilePdf,
  landingPath,
  landingUi,
  services,
  type Landing,
  type LandingBlock,
} from "@/lib/landing";
import type { Lang } from "@/lib/i18n";

const SITE_URL = "https://tiskacatering.com";

export function landingMetadata(l: Landing, lang: Lang): Metadata {
  const c = l.copy[lang];
  const url = landingPath(l, lang);
  return {
    title: { absolute: c.metaTitle },
    description: c.metaDescription,
    // hreflang ditambahkan setelah seluruh situs punya versi EN
    alternates: { canonical: url },
    openGraph: {
      url,
      title: c.metaTitle,
      description: c.metaDescription,
      locale: lang === "en" ? "en_US" : "id_ID",
    },
  };
}

function jsonLd(l: Landing, lang: Lang) {
  const c = l.copy[lang];
  const ui = landingUi[lang];
  const url = SITE_URL + landingPath(l, lang);
  const home = lang === "en" ? `${SITE_URL}/en` : SITE_URL;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: l.label[lang],
      description: c.metaDescription,
      url,
      serviceType: l.kind === "service" ? l.label[lang] : "Catering",
      provider: { "@type": "FoodEstablishment", name: "Tiska Catering Service", url: SITE_URL },
      areaServed:
        l.kind === "area"
          ? { "@type": "Place", name: l.label[lang] }
          : ["Jakarta", "Bogor", "Depok", "Tangerang", "Bekasi"].map((name) => ({ "@type": "City", name })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: ui.beranda, item: home },
        {
          "@type": "ListItem",
          position: 2,
          name: l.kind === "service" ? ui.layanan : ui.areaCrumb,
          ...(l.kind === "service" && { item: `${home}${lang === "en" ? "/services" : "/layanan"}` }),
        },
        { "@type": "ListItem", position: 3, name: l.label[lang], item: url },
      ],
    },
  ];
}

function Block({ block }: { block: LandingBlock }) {
  const heading = (
    <h2 className="font-display text-[clamp(28px,3.6vw,50px)] font-light leading-[1.04] tracking-[-0.02em] text-paper-ink">
      <RichTitle segments={block.heading} accentClass="text-gold-deep" />
    </h2>
  );

  if (block.type === "prose") {
    return (
      <div className="grid gap-8 md:grid-cols-[0.8fr_1fr] md:gap-16">
        <Reveal>{heading}</Reveal>
        <Reveal delay={0.12}>
          <div className="space-y-5 text-[15.5px] leading-[1.9] text-paper-ink/75">
            {block.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
      </div>
    );
  }

  const steps = block.type === "steps";
  return (
    <div>
      <Reveal>{heading}</Reveal>
      {block.type === "list" && block.intro && (
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-[620px] text-[15px] leading-[1.85] text-paper-ink/70">{block.intro}</p>
        </Reveal>
      )}
      <div
        className={`mt-10 grid border-t border-line-d/70 sm:grid-cols-2 ${steps ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}
      >
        {block.items.map((item, i) => (
          <Reveal key={item.term} delay={(i % 4) * 0.06}>
            <div className="h-full border-b border-line-d/70 py-8 sm:pr-8">
              {steps && (
                <p className="mb-4 font-display text-[13px] tracking-[0.1em] text-gold-deep">
                  {String(i + 1).padStart(2, "0")}
                </p>
              )}
              <h3 className="font-display text-[21px] font-normal leading-snug text-paper-ink">{item.term}</h3>
              <p className="mt-3 text-[14px] leading-[1.8] text-paper-ink/65">{item.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function Links({ title, items, lang }: { title: string; items: Landing[]; lang: Lang }) {
  return (
    <div>
      <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-gold-deep">{title}</p>
      <ul className="flex flex-wrap gap-3">
        {items.map((l) => (
          <li key={l.slug.id}>
            <Link
              href={landingPath(l, lang)}
              className="inline-block rounded-full border border-line-d px-5 py-2.5 text-[13.5px] text-paper-ink/80 transition-colors hover:border-gold-deep hover:text-paper-ink"
            >
              {l.label[lang]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Template halaman layanan & area (SEO) — isi dari lib/landing.ts. */
export default function LandingPage({ l, lang }: { l: Landing; lang: Lang }) {
  const c = l.copy[lang];
  const ui = landingUi[lang];
  const profileHref =
    l.showCompanyProfile && existsSync(join(process.cwd(), "public", companyProfilePdf))
      ? companyProfilePdf
      : undefined;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(l, lang)) }}
      />
      <Nav />
      <main>
        <PageHero eyebrow={c.eyebrow} judul={c.h1} intro={c.intro} />

        <section className="bg-paper-bg px-6 py-20 md:px-10 md:py-[14vh]">
          <div className="mx-auto max-w-[1200px] space-y-24 md:space-y-32">
            {c.blocks.map((b, i) => (
              <Block key={i} block={b} />
            ))}
          </div>
        </section>

        {l.showKlien && <Klien />}
        {l.showSertifikasi && <Sertifikasi />}

        <section className="bg-paper-bg px-6 py-20 md:px-10 md:py-[12vh]">
          <div className="mx-auto grid max-w-[1200px] gap-14 md:grid-cols-[0.8fr_1fr] md:gap-16">
            <h2 className="font-display text-[clamp(28px,3.6vw,50px)] font-light leading-[1.04] tracking-[-0.02em] text-paper-ink">
              {ui.faq}
            </h2>
            <div className="border-t border-line-d/70">
              {c.faq.map((f) => (
                <details key={f.q} className="group border-b border-line-d/70 py-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-[19px] leading-snug text-paper-ink">
                    {f.q}
                    <span aria-hidden className="mt-1 text-gold-deep transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-[600px] text-[14.5px] leading-[1.85] text-paper-ink/70">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-24 grid max-w-[1200px] gap-12 border-t border-line-d/70 pt-14 md:grid-cols-2">
            <Links
              title={l.kind === "service" ? ui.layananLain : ui.layanan}
              items={services.filter((s) => s !== l)}
              lang={lang}
            />
            <Links title={ui.area} items={areas.filter((a) => a !== l)} lang={lang} />
          </div>
        </section>

        <QuoteForm
          lang={lang}
          corporate={l.quote === "corporate"}
          jenisDefault={l.kind === "service" ? l.label[lang] : ""}
          profileHref={profileHref}
        />
      </main>
      <Footer />
    </>
  );
}
