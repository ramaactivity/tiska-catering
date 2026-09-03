import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { menuTasting } from "@/lib/opentable/content";

type Foto = { src: string; alt: string };

/** Kartu menu — satu-satunya bagian berlatar terang, memberi jeda ritme. */
export default function MenuTasting({ foto }: { foto: Foto }) {
  return (
    <section className="bg-paper-bg px-6 py-[13vh] md:px-10">
      <div className="mx-auto max-w-[1080px]">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-[12vh]">
            <Reveal>
              <Eyebrow tone="light">{menuTasting.eyebrow}</Eyebrow>
            </Reveal>
            <h2
              style={{ fontVariationSettings: "'opsz' 144" }}
              className="mt-7 font-display text-[clamp(28px,5vw,46px)] font-light leading-[1.1] tracking-[-0.02em] text-paper-ink"
            >
              <WordReveal segments={menuTasting.judul} accentClass="text-gold-deep" />
            </h2>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-[420px] text-[15px] leading-[1.85] text-paper-ink/70">
                {menuTasting.intro}
              </p>
            </Reveal>
            <Reveal delay={0.12} className="mt-9">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div>
            <ol className="divide-y divide-line-d">
              {menuTasting.item.map((it, i) => (
                <Reveal key={it.nama} delay={0.04 * i}>
                  <li className="flex gap-5 py-6 first:pt-0">
                    <span className="mt-1 shrink-0 font-accent text-[15px] italic text-gold-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-[21px] font-light leading-snug text-paper-ink">
                        {it.nama}
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-[1.75] text-paper-ink/65">{it.isi}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={0.08}>
              <p className="mt-8 text-[12.5px] italic leading-[1.7] text-paper-ink/45">
                {menuTasting.catatan}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
