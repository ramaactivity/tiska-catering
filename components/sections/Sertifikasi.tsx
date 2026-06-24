import { sertifikasi } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/motion/Reveal";
import BlurToFocus from "@/components/motion/BlurToFocus";
import WordReveal from "@/components/motion/WordReveal";

/**
 * Sertifikasi — trust strip sebelum CTA, disajikan sebagai panel "dark glass"
 * (glassmorphism) bergaya piagam: sudut berbingkai, sapuan cahaya emas, dan dua
 * baris kredensial editorial (logo di pad krem + teks rata-kiri).
 *
 * Catatan aset:
 * - Halal: logo resmi Halal Indonesia (BPJPH), public domain. Di pad krem karena
 *   warna ungu solid tak terbaca di latar gelap & warna mark tidak boleh diubah.
 * - HACCP: badge "HACCP CERTIFIED" generik — rect background putih & baris certifier
 *   "by Quality Assurance Services" sudah dihapus dari SVG (transparan, tak mengklaim
 *   badan tertentu).
 */
export default function Sertifikasi() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-ink px-6 py-[15vh] text-center md:px-10">
      {/* Glow emas — tembus kaca panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[60%] -z-0 h-[680px] w-[1100px] max-w-[130vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(196,160,90,0.16),transparent_66%)]"
      />

      <div className="relative mx-auto max-w-[860px]">
        <Reveal>
          <Eyebrow tone="dark" lines="both" className="justify-center">
            {sertifikasi.eyebrow}
          </Eyebrow>
        </Reveal>

        <h2 className="mx-auto mt-7 max-w-[640px] font-display text-[clamp(28px,4vw,52px)] font-light leading-[1.04] tracking-[-0.02em] text-paper">
          <WordReveal segments={sertifikasi.judul} accentClass="text-gold-soft" />
        </h2>

        <Reveal delay={0.18}>
          <p className="mx-auto mt-6 max-w-[540px] text-[14px] leading-[1.8] text-[#a39b8a]">
            {sertifikasi.deskripsi}
          </p>
        </Reveal>

        {/* Panel dark-glass */}
        <BlurToFocus delay={0.1}>
          <div className="relative mx-auto mt-[60px] max-w-[600px] overflow-hidden rounded-[22px] border border-gold-soft/20 bg-[linear-gradient(155deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] text-left shadow-[0_40px_100px_-34px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
            {/* Sapuan cahaya pada tepi atas */}
            <span aria-hidden className="absolute inset-x-0 top-0 h-px overflow-hidden">
              <span className="cert-shimmer block h-px w-1/3 bg-[linear-gradient(90deg,transparent,rgba(236,213,160,0.9),transparent)]" />
            </span>

            {/* Sudut bracket (gaya piagam) */}
            <Bracket className="left-3.5 top-3.5 border-b-0 border-r-0" />
            <Bracket className="right-3.5 top-3.5 border-b-0 border-l-0" />
            <Bracket className="bottom-3.5 left-3.5 border-r-0 border-t-0" />
            <Bracket className="bottom-3.5 right-3.5 border-l-0 border-t-0" />

            {sertifikasi.items.map((item, i) => (
              <BlurToFocus key={item.kind} delay={0.22 + i * 0.14}>
                <div
                  className={`group flex items-center gap-6 px-7 py-7 sm:gap-7 sm:px-9 ${
                    i === 0 ? "border-b border-gold-soft/12" : ""
                  }`}
                >
                  {/* Pad krem berisi logo */}
                  <div className="flex size-[88px] shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(160deg,#f7f2e9,#e7ddca)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(160,124,52,0.18)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]">
                    {item.kind === "halal" ? (
                      // eslint-disable-next-line @next/next/no-img-element -- logo SVG statis, next/image tak mengoptimasi SVG
                      <img
                        src="/logos/sertifikasi/halal-indonesia.svg"
                        alt="Logo Halal Indonesia"
                        className="h-[62px] w-auto"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element -- logo SVG statis, next/image tak mengoptimasi SVG
                      <img
                        src="/logos/sertifikasi/haccp-certified.svg"
                        alt="Logo HACCP Certified"
                        className="h-[34px] w-auto"
                      />
                    )}
                  </div>

                  {/* Teks kredensial */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.32em] text-gold-soft">
                      {item.tag}
                    </p>
                    <p className="mt-1.5 flex items-center gap-2 font-display text-[clamp(19px,2.4vw,23px)] font-light text-paper">
                      {item.judul}
                      <CheckMark />
                    </p>
                    <p className="mt-2 max-w-[260px] text-[12.5px] leading-[1.6] text-[#9a9180]">
                      {item.ket}
                    </p>
                  </div>
                </div>
              </BlurToFocus>
            ))}
          </div>
        </BlurToFocus>
      </div>
    </section>
  );
}

/* Sudut bracket emas */
function Bracket({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`absolute size-[18px] border border-gold-soft/50 ${className}`}
    />
  );
}

/* Centang emas kecil di samping nama */
function CheckMark() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <circle cx="12" cy="12" r="11" stroke="var(--gold-soft)" strokeWidth="1.2" opacity="0.5" />
      <path
        d="M7.5 12.4l3 3 6-6.4"
        stroke="var(--gold-soft)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
