import { klien } from "@/lib/content";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";

/** Klien: logo wall plate putih di latar terang (docs/04 #9). */
export default function Klien() {
  return (
    <section id="klien" className="bg-paper-bg px-6 py-[16vh] md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 text-center">
          <Reveal>
            <p className="mb-5 text-[11px] uppercase tracking-[0.34em] text-gold-deep">
              {klien.eyebrow}
            </p>
          </Reveal>
          <h2 className="font-display text-[clamp(32px,5vw,76px)] font-light leading-[0.94] tracking-[-0.025em] text-paper-ink">
            <WordReveal segments={klien.judul} accentClass="text-gold-deep" />
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-[520px] text-[14px] leading-[1.8] text-paper-ink/65">
              {klien.caption}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(148px,1fr))] gap-3.5">
          {klien.daftar.map((nama, i) => (
            <Reveal key={nama} delay={(i % 6) * 0.06} duration={0.7} y={16}>
              {/* Plate teks sementara — diganti file logo resmi di Fase 4 (docs/06) */}
              <div className="flex h-[110px] items-center justify-center border border-line-d bg-white/60 px-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_40px_rgba(42,36,24,0.1)]">
                <span className="text-center font-display text-[17px] font-medium text-paper-ink/80">
                  {nama}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
