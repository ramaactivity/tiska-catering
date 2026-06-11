import Link from "next/link";
import { footer, company } from "@/lib/content";
import { NAV_LOGO } from "@/lib/logos-base64";
import Reveal from "@/components/motion/Reveal";

/** Footer: kolom navigasi/kontak/sosial + wordmark TISKA raksasa (docs/04 #11). */
export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line bg-ink-2 px-6 pb-10 pt-[11vh] md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-12 pb-16 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={NAV_LOGO}
                alt={company.namaLengkap}
                className="mb-5 h-[42px] w-auto"
              />
              <p className="max-w-[260px] text-[13px] leading-[1.8] text-[#9a9282]">
                {footer.tagline}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <p className="mb-5 text-[11px] uppercase tracking-[0.18em] text-gold">
                Navigasi
              </p>
              <ul className="flex flex-col gap-3 text-[14px] text-[#c9c2b2]">
                {footer.kolom.navigasi.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="transition-colors duration-300 hover:text-gold-soft"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div>
              <p className="mb-5 text-[11px] uppercase tracking-[0.18em] text-gold">
                Hubungi
              </p>
              <ul className="flex flex-col gap-3 text-[14px] text-[#c9c2b2]">
                {footer.kolom.hubungi.map((item) =>
                  "href" in item && item.href ? (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="transition-colors duration-300 hover:text-gold-soft"
                      >
                        {item.label}
                      </a>
                    </li>
                  ) : (
                    <li
                      key={item.label}
                      className="max-w-[260px] leading-[1.7]"
                    >
                      {item.label}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div>
              <p className="mb-5 text-[11px] uppercase tracking-[0.18em] text-gold">
                Ikuti
              </p>
              <ul className="flex flex-col gap-3 text-[14px] text-[#c9c2b2]">
                {footer.kolom.ikuti.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="transition-colors duration-300 hover:text-gold-soft"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="border-t border-line pt-8">
          <Reveal>
            <p className="text-center text-[12px] tracking-[0.05em] text-[#7a7468]">
              {footer.copyright}
            </p>
          </Reveal>
          {/* Wordmark raksasa — penutup halaman */}
          <Reveal delay={0.15} duration={1.2} y={40}>
            <p
              aria-hidden
              style={{ fontVariationSettings: "'opsz' 144" }}
              className="mt-6 select-none text-center font-display text-[clamp(90px,17vw,250px)] font-light leading-[0.8] tracking-[0.02em] text-paper/[0.045]"
            >
              TISKA
            </p>
          </Reveal>
        </div>
      </div>
    </footer>
  );
}
