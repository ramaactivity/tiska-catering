import { sertifikasi } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/motion/Reveal";
import BlurToFocus from "@/components/motion/BlurToFocus";
import WordReveal from "@/components/motion/WordReveal";

/**
 * Sertifikasi — trust strip di latar ink, tepat sebelum CTA: jaminan Halal & HACCP
 * sebagai "jabat tangan terakhir" sebelum kontak. Disajikan sebagai satu "plat
 * sertifikat" berbingkai ganda emas (kesan piagam resmi) + glow emas halus.
 *
 * Catatan aset:
 * - Halal: logo resmi Halal Indonesia (BPJPH), public domain. Wajib di plat terang
 *   (warna ungu solid tak terbaca di latar gelap; warna mark tidak boleh diubah).
 * - HACCP: badge "HACCP CERTIFIED" generik (baris certifier "by Quality Assurance
 *   Services" sudah dihapus dari SVG agar tidak mengklaim badan tertentu).
 */
export default function Sertifikasi() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-ink px-6 py-[15vh] text-center md:px-10">
      {/* Glow emas halus untuk kedalaman */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[56%] -z-0 h-[640px] w-[1000px] max-w-[130vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(196,160,90,0.13),transparent_68%)]"
      />

      <div className="relative mx-auto max-w-[860px]">
        <Reveal>
          <Eyebrow tone="dark" lines="both" className="justify-center">
            {sertifikasi.eyebrow}
          </Eyebrow>
        </Reveal>

        <h2 className="mx-auto mt-7 max-w-[640px] font-display text-[clamp(28px,4vw,52px)] font-light leading-[1.05] tracking-[-0.02em] text-paper">
          <WordReveal segments={sertifikasi.judul} accentClass="text-gold-soft" />
        </h2>

        <Reveal delay={0.18}>
          <p className="mx-auto mt-6 max-w-[560px] text-[14.5px] leading-[1.8] text-[#a39b8a]">
            {sertifikasi.deskripsi}
          </p>
        </Reveal>

        {/* Plat sertifikat */}
        <BlurToFocus delay={0.1}>
          <div className="relative mx-auto mt-16 max-w-[680px] rounded-[20px] border border-gold/25 bg-[linear-gradient(160deg,#f7f2e9,#e9e0cf)] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.75)]">
            {/* Bingkai dalam (gaya piagam) */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-3 rounded-[12px] border border-gold-deep/30"
            />
            {/* Berlian di titik temu pembatas (desktop) */}
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 hidden size-[9px] -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold-deep/45 bg-paper sm:block"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2">
              {sertifikasi.items.map((item, i) => (
                <div
                  key={item.kind}
                  className={`flex flex-col items-center px-10 pb-[46px] pt-[52px] ${
                    i === 0
                      ? "border-gold-deep/15 max-sm:border-b sm:border-r"
                      : ""
                  }`}
                >
                  <div className="flex h-[104px] items-center justify-center">
                    {item.kind === "halal" ? (
                      // eslint-disable-next-line @next/next/no-img-element -- logo SVG statis, next/image tak mengoptimasi SVG
                      <img
                        src="/logos/sertifikasi/halal-indonesia.svg"
                        alt="Logo Halal Indonesia"
                        className="h-[100px] w-auto"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element -- logo SVG statis, next/image tak mengoptimasi SVG
                      <img
                        src="/logos/sertifikasi/haccp-certified.svg"
                        alt="Logo HACCP Certified"
                        className="h-[56px] w-auto"
                      />
                    )}
                  </div>
                  <p className="mt-[22px] text-[10.5px] uppercase tracking-[0.3em] text-gold-deep">
                    {item.tag}
                  </p>
                  <p className="mt-2 font-display text-[20px] font-light text-paper-ink">
                    {item.judul}
                  </p>
                  <p className="mx-auto mt-3 max-w-[210px] text-[12.5px] leading-[1.6] text-paper-ink/55">
                    {item.ket}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </BlurToFocus>
      </div>
    </section>
  );
}
