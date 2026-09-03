import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { rundown } from "@/lib/opentable/content";

export default function Rundown() {
  return (
    <section className="bg-ink px-6 py-[13vh] md:px-10">
      <div className="mx-auto max-w-[720px]">
        <Reveal>
          <Eyebrow tone="dark">{rundown.eyebrow}</Eyebrow>
        </Reveal>

        <h2
          style={{ fontVariationSettings: "'opsz' 144" }}
          className="mt-7 font-display text-[clamp(28px,5vw,46px)] font-light leading-[1.1] tracking-[-0.02em] text-paper"
        >
          <WordReveal segments={rundown.judul} />
        </h2>

        <ol className="mt-14">
          {rundown.item.map((it, i) => (
            <Reveal key={it.jam} delay={0.05 * i}>
              <li className="group relative flex gap-6 pb-10 sm:gap-10">
                {/* Garis waktu: titik emas + batang tipis, batang terakhir dipotong. */}
                <span aria-hidden className="relative flex w-[1px] shrink-0 justify-center">
                  <span className="absolute top-[7px] size-[7px] -translate-x-[3px] rounded-full border border-gold/70 bg-ink" />
                  {i < rundown.item.length - 1 && (
                    <span className="absolute top-[18px] h-full w-px bg-line" />
                  )}
                </span>
                <div className="flex-1 pb-1">
                  <p className="font-accent text-[17px] italic text-gold-soft">{it.jam}</p>
                  <h3 className="mt-1.5 font-display text-[19px] font-light leading-snug text-paper">
                    {it.judul}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.75] text-paper/60">{it.isi}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
