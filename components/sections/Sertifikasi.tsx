import { t, type Lang } from "@/lib/i18n";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/motion/Reveal";
import BlurToFocus from "@/components/motion/BlurToFocus";
import WordReveal from "@/components/motion/WordReveal";

/**
 * Sertifikasi — trust strip sebelum CTA. Layout dua kolom: teks (kiri) + panel
 * "dark glass" bergaya piagam (kanan) berisi dua baris kredensial. Mengisi lebar
 * penuh agar tidak ada ruang kosong mubazir; tetap anggun & premium.
 *
 * Catatan aset:
 * - Halal: logo resmi Halal Indonesia (BPJPH), public domain. Di pad krem karena
 *   warna ungu solid tak terbaca di latar gelap & warna mark tidak boleh diubah.
 * - HACCP: badge "HACCP CERTIFIED" generik — rect putih & baris certifier "by
 *   Quality Assurance Services" sudah dihapus dari SVG (transparan, netral).
 */
export default function Sertifikasi({ lang = "id" }: { lang?: Lang }) {
  const { sertifikasi, ui } = t(lang);
  return (
    <section className="relative overflow-hidden border-t border-line bg-ink px-6 py-16 md:px-10 md:py-[12vh]">
      {/* Glow emas di sisi kanan — tembus kaca panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[2%] top-1/2 -z-0 h-[620px] w-[900px] max-w-[110vw] -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(196,160,90,0.15),transparent_65%)]"
      />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[0.82fr_1fr] lg:gap-20">
        {/* ── Kolom kiri: teks ── */}
        <div>
          <Reveal>
            <Eyebrow tone="dark">{sertifikasi.eyebrow}</Eyebrow>
          </Reveal>
          <h2 className="mt-7 font-display text-[clamp(30px,4vw,50px)] font-light leading-[1.04] tracking-[-0.02em] text-paper">
            <WordReveal segments={sertifikasi.judul} accentClass="text-gold-soft" />
          </h2>
          <Reveal delay={0.18}>
            <p className="mt-6 max-w-[420px] text-[14.5px] leading-[1.85] text-[#a39b8a]">
              {sertifikasi.deskripsi}
            </p>
          </Reveal>
        </div>

        {/* ── Kolom kanan: panel dark-glass ── */}
        <BlurToFocus delay={0.12}>
          <div className="relative overflow-hidden rounded-[22px] border border-gold-soft/20 bg-[linear-gradient(155deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] shadow-[0_40px_100px_-34px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
            {/* Sapuan cahaya pada tepi atas */}
            <span aria-hidden className="absolute inset-x-0 top-0 h-px overflow-hidden">
              <span className="cert-shimmer block h-px w-1/3 bg-[linear-gradient(90deg,transparent,rgba(236,213,160,0.9),transparent)]" />
            </span>

            {/* Sudut bracket (gaya piagam) */}
            <Bracket className="left-3.5 top-3.5 rounded-tl-[7px] border-b-0 border-r-0" />
            <Bracket className="right-3.5 top-3.5 rounded-tr-[7px] border-b-0 border-l-0" />
            <Bracket className="bottom-3.5 left-3.5 rounded-bl-[7px] border-r-0 border-t-0" />
            <Bracket className="bottom-3.5 right-3.5 rounded-br-[7px] border-l-0 border-t-0" />

            {sertifikasi.items.map((item, i) => (
              <BlurToFocus key={item.kind} delay={0.24 + i * 0.14}>
                <div
                  className={`group flex items-center gap-5 px-7 py-8 sm:gap-6 sm:px-9 ${
                    i === 0 ? "border-b border-gold-soft/12" : ""
                  }`}
                >
                  {/* Pad krem berisi logo */}
                  <div className="flex size-[92px] shrink-0 items-center justify-center rounded-[16px] bg-[linear-gradient(160deg,#f7f2e9,#e7ddca)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(160,124,52,0.18)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]">
                    {item.kind === "halal" ? (
                      // eslint-disable-next-line @next/next/no-img-element -- logo SVG statis, next/image tak mengoptimasi SVG
                      <img
                        src="/logos/sertifikasi/halal-indonesia.svg"
                        alt={ui.logoHalal}
                        className="h-[64px] w-auto"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element -- logo SVG statis, next/image tak mengoptimasi SVG
                      <img
                        src="/logos/sertifikasi/haccp-certified.svg"
                        alt={ui.logoHaccp}
                        className="h-[34px] w-auto"
                      />
                    )}
                  </div>

                  {/* Teks kredensial */}
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold-soft">
                      {item.tag}
                    </p>
                    <p className="mt-1.5 flex items-center gap-2 font-display text-[clamp(19px,2.2vw,23px)] font-light text-paper">
                      {item.judul}
                      <CheckMark />
                    </p>
                    <p className="mt-2 text-[12.5px] leading-[1.6] text-[#9a9180]">
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
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
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
