import { t, type Lang } from "@/lib/i18n";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";

/** Filosofi: color block emas penuh, pull quote kata-per-kata (docs/04 #6). */
export default function Filosofi({ lang = "id" }: { lang?: Lang }) {
  const { filosofi } = t(lang);
  return (
    <section className="bg-gold-deep px-6 py-24 md:px-10 md:py-[20vh]">
      <div className="mx-auto max-w-[1100px] text-center">
        <blockquote className="font-display text-[clamp(32px,5.5vw,88px)] font-light leading-[1.04] tracking-[-0.025em] text-ink">
          {/* aksen italic mewarisi warna ink */}
          <WordReveal segments={filosofi.quote} accentClass="" />
        </blockquote>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-[34px] max-w-[520px] text-[14.5px] leading-[1.8] text-ink/70">
            {filosofi.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
