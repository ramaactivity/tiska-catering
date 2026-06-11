import { testimoni } from "@/lib/content";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";

/** Testimoni: kutipan tunggal, glow radial emas halus (docs/04 #8). */
export default function Testimoni() {
  return (
    <section className="relative overflow-hidden bg-ink-2 px-6 py-[18vh] md:px-10">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(196,160,90,0.09),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-[1000px] text-center">
        <Reveal>
          <p className="mb-11 text-[11px] uppercase tracking-[0.34em] text-gold">
            {testimoni.eyebrow}
          </p>
        </Reveal>
        <blockquote className="font-display text-[clamp(27px,4.2vw,58px)] font-light leading-[1.2] tracking-[-0.025em] text-paper">
          <WordReveal segments={testimoni.kutipanRich} stagger={0.045} />
        </blockquote>
        <Reveal delay={0.25}>
          <div className="mt-12">
            <p className="text-[15px] text-gold-soft">{testimoni.nama}</p>
            <p className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-[#7a7468]">
              {testimoni.peran}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
