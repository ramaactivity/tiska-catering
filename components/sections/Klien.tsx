import { klien } from "@/lib/content";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";

/**
 * Penyetaraan optik: logo bundar/kuadrat butuh tinggi lebih agar bobot
 * visualnya setara wordmark lebar. Default (tanpa entri) = 34px.
 */
const OPTIK: Record<string, string> = {
  // kuadrat (rasio ~1:1)
  BMW: "max-h-[52px]",
  PLN: "max-h-[52px]",
  WCS: "max-h-[52px]",
  AQUA: "max-h-[52px]",
  // medium (rasio ~1.5–2)
  Telkom: "max-h-[48px]",
  "Bank Raya": "max-h-[46px]",
  "Pocari Sweat": "max-h-[42px]",
  // sangat lebar (rasio > 5)
  "Royal Enfield": "max-h-[24px]",
  "Bank Indonesia": "max-h-[27px]",
  Philips: "max-h-[26px]",
  Ecolab: "max-h-[27px]",
  Codashop: "max-h-[25px]",
};

/** Klien: logo wall terbuka di latar terang (docs/04 #9). */
export default function Klien() {
  return (
    <section id="klien" className="bg-paper-bg px-6 py-20 md:px-10 md:py-[16vh]">
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

        {/* Logo wall tanpa plate: garis hairline editorial atas-bawah, logo
            full-color langsung di latar krem (semua aset berlatar transparan). */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-10 border-y border-line-d/70 py-14 md:gap-x-14 md:py-16">
          {klien.daftar.map(({ nama, logo }, i) => (
            <Reveal key={nama} delay={(i % 6) * 0.06} duration={0.7} y={14}>
              <div className="flex h-16 w-[124px] items-center justify-center md:w-[148px]">
                {/* eslint-disable-next-line @next/next/no-img-element -- logo SVG/PNG statis, next/image tak mengoptimasi SVG */}
                <img
                  src={logo}
                  alt={`Logo ${nama}`}
                  loading="lazy"
                  className={`${OPTIK[nama] ?? "max-h-[34px]"} w-auto max-w-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.06]`}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
