import { sertifikasi } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/motion/Reveal";
import BlurToFocus from "@/components/motion/BlurToFocus";
import WordReveal from "@/components/motion/WordReveal";

/**
 * Sertifikasi — trust strip di latar ink, tepat sebelum CTA: jaminan Halal & HACCP
 * sebagai "jabat tangan terakhir" sebelum kontak.
 *
 * Catatan aset:
 * - Halal: logo resmi Halal Indonesia (BPJPH), public domain. Wajib di chip terang
 *   karena warnanya ungu solid → tak terbaca di latar gelap, dan warnanya tidak
 *   boleh diubah (mark teregulasi).
 * - HACCP: badge "HACCP CERTIFIED" generik (baris nama certifier "by Quality
 *   Assurance Services" sudah dihapus dari SVG agar tidak mengklaim badan tertentu).
 *   Ganti dengan badge certifier asli Tiska bila tersedia.
 */
export default function Sertifikasi() {
  return (
    <section className="border-t border-line bg-ink px-6 py-[14vh] text-center md:px-10">
      <div className="mx-auto max-w-[820px]">
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

        {/* Dua badge pada chip terang (seal berbingkai) */}
        <div className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-stretch">
          {sertifikasi.items.map((item, i) => (
            <BlurToFocus key={item.kind} delay={0.1 + i * 0.12}>
              <figure className="flex h-full w-[260px] flex-col items-center rounded-2xl border border-[#e3d9c3] bg-paper px-7 py-8 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.65)]">
                <div className="flex h-[80px] items-center justify-center">
                  {item.kind === "halal" ? (
                    // eslint-disable-next-line @next/next/no-img-element -- logo SVG statis, next/image tak mengoptimasi SVG
                    <img
                      src="/logos/sertifikasi/halal-indonesia.svg"
                      alt="Logo Halal Indonesia"
                      className="h-[78px] w-auto"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element -- logo SVG statis, next/image tak mengoptimasi SVG
                    <img
                      src="/logos/sertifikasi/haccp-certified.svg"
                      alt="Logo HACCP Certified"
                      className="h-[42px] w-auto"
                    />
                  )}
                </div>
                <figcaption className="mt-5">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-gold-deep">
                    {item.tag}
                  </p>
                  <p className="mt-1.5 font-display text-[17px] font-light text-paper-ink">
                    {item.judul}
                  </p>
                  <p className="mx-auto mt-2.5 max-w-[200px] text-[12px] leading-[1.6] text-paper-ink/55">
                    {item.ket}
                  </p>
                </figcaption>
              </figure>
            </BlurToFocus>
          ))}
        </div>
      </div>
    </section>
  );
}
