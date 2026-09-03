import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { lokasi } from "@/lib/opentable/content";
import { PIC, VENUE } from "@/lib/opentable/config";
import { waLink } from "@/lib/opentable/kode";

type Foto = { src: string; alt: string };

/**
 * Peta sengaja berupa gambar + tombol, bukan iframe Google Maps: iframe
 * menyeret ~700KB, memasang cookie, dan jelek di layar kecil.
 */
export default function Lokasi({ foto }: { foto: Foto }) {
  const bantuan = waLink(
    PIC.hp,
    `Halo ${PIC.nama}, saya ingin menanyakan lokasi acara Tiska Open Table di Plaza Mutiara.`,
  );

  return (
    <section className="bg-ink px-6 py-[13vh] md:px-10">
      <div className="mx-auto max-w-[1080px]">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg lg:aspect-[5/4]">
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(14,13,10,0.6))]"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Eyebrow tone="dark">{lokasi.eyebrow}</Eyebrow>
            </Reveal>
            <h2
              style={{ fontVariationSettings: "'opsz' 144" }}
              className="mt-7 font-display text-[clamp(28px,5vw,44px)] font-light leading-[1.1] tracking-[-0.02em] text-paper"
            >
              <WordReveal segments={lokasi.judul} />
            </h2>
            <Reveal delay={0.08}>
              <p className="mt-6 text-[15px] leading-[1.85] text-paper/75">{lokasi.alamat}</p>
              <p className="mt-4 text-[14px] leading-[1.8] text-paper/55">{lokasi.parkir}</p>
            </Reveal>
            <Reveal delay={0.12} className="mt-9 flex flex-wrap gap-3">
              <a
                href={VENUE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-gold/70 px-7 py-[13px] text-[12px] uppercase tracking-[0.18em] text-gold-soft transition-colors duration-500 hover:text-ink"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-out group-hover:translate-y-0"
                />
                <span className="relative">{lokasi.tombolPeta}</span>
              </a>
              <a
                href={bantuan}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-line px-7 py-[13px] text-[12px] uppercase tracking-[0.18em] text-paper/60 transition-colors duration-300 hover:border-gold/50 hover:text-gold-soft"
              >
                {lokasi.tombolBantuan}
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
