import { sertifikasi } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/motion/Reveal";
import BlurToFocus from "@/components/motion/BlurToFocus";
import WordReveal from "@/components/motion/WordReveal";

/**
 * Sertifikasi — trust strip ramping di latar ink, tepat sebelum CTA.
 * Berperan sebagai "jabat tangan terakhir": jaminan Halal & HACCP sebelum kontak.
 * Emblem tipografi (ring emas + ikon) — siap diganti logo resmi bila tersedia.
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

        {/* Dua emblem, dipisah garis tipis (vertikal di desktop, horizontal di mobile) */}
        <div className="mx-auto mt-14 flex max-w-[600px] flex-col items-stretch divide-y divide-line sm:flex-row sm:divide-x sm:divide-y-0">
          {sertifikasi.items.map((item, i) => (
            <BlurToFocus
              key={item.tag}
              delay={0.1 + i * 0.12}
              className="flex flex-1 flex-col items-center px-6 py-8 sm:py-2"
            >
              <Emblem icon={item.icon} />
              <p className="mt-5 text-[11px] uppercase tracking-[0.3em] text-gold-soft">
                {item.tag}
              </p>
              <p className="mt-2 font-display text-[19px] font-light text-paper">
                {item.judul}
              </p>
              <p className="mt-2.5 max-w-[230px] text-[12.5px] leading-[1.65] text-[#8c8472]">
                {item.ket}
              </p>
            </BlurToFocus>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Emblem: ring emas + ikon (seal untuk Halal, perisai untuk HACCP) ── */
function Emblem({ icon }: { icon: "seal" | "shield" }) {
  return (
    <span className="relative grid size-[60px] place-items-center">
      {/* cincin ganda halus */}
      <span aria-hidden className="absolute inset-0 rounded-full border border-gold/40" />
      <span aria-hidden className="absolute inset-[5px] rounded-full border border-gold/20" />
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gold-soft"
        aria-hidden
      >
        {icon === "seal" ? (
          <>
            {/* Seal bergerigi + centang */}
            <path d="M12 2.6l2.1 1.5 2.5-.5 1 2.4 2.3 1.1-.5 2.5 1.5 2.1-1.5 2.1.5 2.5-2.3 1.1-1 2.4-2.5-.5L12 21.4l-2.1-1.5-2.5.5-1-2.4-2.3-1.1.5-2.5L3.1 12l1.5-2.1-.5-2.5 2.3-1.1 1-2.4 2.5.5z" />
            <path d="M9 12l2.2 2.2L15.4 10" />
          </>
        ) : (
          <>
            {/* Perisai + centang */}
            <path d="M12 2.6l7 2.7v5.5c0 4.4-3 8.1-7 9.6-4-1.5-7-5.2-7-9.6V5.3z" />
            <path d="M8.8 12l2.2 2.2 4.2-4.4" />
          </>
        )}
      </svg>
    </span>
  );
}
