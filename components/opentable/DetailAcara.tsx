import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { detail } from "@/lib/opentable/content";
import { googleCalUrl } from "@/lib/opentable/calendar";
import Countdown from "./Countdown";

export default function DetailAcara() {
  return (
    <section className="bg-ink-2 px-6 py-[13vh] md:px-10">
      <div className="mx-auto max-w-[880px]">
        <Reveal>
          <Eyebrow tone="dark" lines="both" className="justify-center">
            {detail.eyebrow}
          </Eyebrow>
        </Reveal>

        <h2
          style={{ fontVariationSettings: "'opsz' 144" }}
          className="mt-8 text-center font-display text-[clamp(28px,5vw,46px)] font-light leading-[1.1] tracking-[-0.02em] text-paper"
        >
          <WordReveal segments={detail.judul} />
        </h2>

        <Reveal delay={0.08} className="mt-12">
          <Countdown />
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <dl className="mx-auto max-w-[560px] divide-y divide-line">
            {detail.baris.map((b) => (
              <div key={b.label} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-8">
                <dt className="shrink-0 pt-0.5 text-[10.5px] uppercase tracking-[0.22em] text-gold-soft sm:w-[92px]">
                  {b.label}
                </dt>
                <dd className="text-[15px] leading-[1.65] text-paper/85">{b.nilai}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.12} className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href={googleCalUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-gold/70 px-7 py-[13px] text-[12px] uppercase tracking-[0.18em] text-gold-soft transition-colors duration-500 hover:text-ink"
          >
            <span
              aria-hidden
              className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-out group-hover:translate-y-0"
            />
            <span className="relative">{detail.kalenderTombol}</span>
          </a>
          <a
            href="/open-table/kalender"
            className="inline-flex items-center rounded-full border border-line px-7 py-[13px] text-[12px] uppercase tracking-[0.18em] text-paper/60 transition-colors duration-300 hover:border-gold/50 hover:text-gold-soft"
          >
            Apple / Outlook
          </a>
        </Reveal>
      </div>
    </section>
  );
}
