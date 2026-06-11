import { mengapa, reasons } from "@/lib/content";
import Reveal from "@/components/motion/Reveal";
import BlurToFocus from "@/components/motion/BlurToFocus";
import Counter from "@/components/motion/Counter";
import WordReveal from "@/components/motion/WordReveal";

/** Mengapa Tiska: 4 reason-card dengan counter, latar gelap (docs/04 #3). */
export default function MengapaTiska() {
  return (
    <section className="bg-ink px-6 py-[16vh] md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-[clamp(34px,5.5vw,82px)] font-light leading-[0.94] tracking-[-0.025em] text-paper">
            <WordReveal segments={mengapa.judul} />
          </h2>
          <Reveal delay={0.15}>
            <p className="max-w-[360px] text-[15px] leading-[1.8] text-[#a39b8a]">
              {mengapa.deskripsi}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 border-y border-line sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, i) => (
            <BlurToFocus key={reason.label} delay={i * 0.1}>
              <article className="group relative h-full overflow-hidden border-line px-9 py-10 transition-colors duration-500 hover:bg-gold/[0.04] max-lg:border-b max-lg:last:border-b-0 lg:border-r lg:last:border-r-0">
                {/* Garis emas muncul dari kiri saat hover (docs/02) */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
                <p className="font-display text-[13px] tracking-[0.1em] text-gold-deep">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p
                  style={{ fontVariationSettings: "'opsz' 144" }}
                  className="mt-6 font-display text-[clamp(44px,4.6vw,68px)] font-light leading-[0.88] text-paper"
                >
                  <Counter value={reason.value} suffix={reason.suffix} />
                </p>
                <p className="mb-4 mt-2.5 text-[11px] uppercase tracking-[0.18em] text-gold-soft">
                  {reason.label}
                </p>
                <p className="text-[13.5px] leading-[1.75] text-[#948c7c]">
                  {reason.deskripsi}
                </p>
              </article>
            </BlurToFocus>
          ))}
        </div>
      </div>
    </section>
  );
}
