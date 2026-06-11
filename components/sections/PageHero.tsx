import type { RichText } from "@/lib/content";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";

type PageHeroProps = {
  eyebrow: string;
  judul: RichText;
  intro: string;
};

/** Hero ringkas untuk halaman sekunder (/menu, /galeri). */
export default function PageHero({ eyebrow, judul, intro }: PageHeroProps) {
  return (
    <section className="bg-ink px-6 pb-[10vh] pt-[26vh] text-center md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="mb-7 flex items-center justify-center gap-4 text-[11px] uppercase tracking-[0.34em] text-gold-soft">
            <span aria-hidden className="h-px w-10 bg-gold" />
            {eyebrow}
            <span aria-hidden className="h-px w-10 bg-gold" />
          </p>
        </Reveal>
        <h1
          style={{ fontVariationSettings: "'opsz' 144" }}
          className="font-display text-[clamp(44px,7vw,110px)] font-light leading-[0.94] text-paper"
        >
          <WordReveal segments={judul} stagger={0.09} />
        </h1>
        <Reveal delay={0.24}>
          <p className="mx-auto mt-8 max-w-[520px] text-[clamp(14px,1.6vw,16px)] leading-[1.8] text-[#cbc5b8]">
            {intro}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
