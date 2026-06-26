import Image from "next/image";
import { menuCategories } from "@/lib/content";
import { images } from "@/lib/images";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";

/**
 * Halaman /menu: section per kategori — banner foto + grid item tipografis.
 * Struktur siap menerima foto per item saat aset asli masuk (Fase 4, docs/06).
 */
export default function MenuKategori({ photos = images.menuKategori }: { photos?: Record<string, { src: string; alt: string }> }) {
  return (
    <div className="bg-ink px-6 pb-16 md:px-10 md:pb-[14vh]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-[14vh]">
        {menuCategories.map((kategori, ki) => {
          const banner = photos[kategori.id];
          return (
            <section key={kategori.id} id={kategori.id}>
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
                <h2 className="font-display text-[clamp(28px,4vw,56px)] font-light leading-none tracking-[-0.02em] text-paper">
                  <span className="mr-4 align-super font-display text-[13px] tracking-[0.1em] text-gold-deep">
                    {String(ki + 1).padStart(2, "0")}
                  </span>
                  <WordReveal segments={[{ text: kategori.nama }]} />
                </h2>
                {kategori.items.length > 0 && (
                  <Reveal delay={0.2}>
                    <p className="text-[12px] uppercase tracking-[0.18em] text-[#9a9282]">
                      {kategori.items.length} hidangan unggulan
                    </p>
                  </Reveal>
                )}
              </div>

              {banner && (
                <Reveal>
                  <div className="relative mb-8 h-[260px] overflow-hidden rounded-lg md:h-[340px]">
                    <Image
                      src={banner.src}
                      alt={banner.alt}
                      fill
                      sizes="(min-width: 1280px) 1280px, 100vw"
                      className="object-cover brightness-[0.85] saturate-[0.92]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[linear-gradient(105deg,rgba(14,13,10,0.55),transparent_70%)]"
                    />
                  </div>
                </Reveal>
              )}

              {kategori.items.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {kategori.items.map((item, i) => (
                    <Reveal key={item} delay={i * 0.06} duration={0.7} y={16}>
                      <div className="group relative h-full overflow-hidden border border-line px-6 py-7 transition-colors duration-500 hover:bg-gold/[0.04]">
                        <span
                          aria-hidden
                          className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                        />
                        <p className="font-display text-[12px] tracking-[0.1em] text-gold-deep">
                          {String(i + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-3 font-display text-[clamp(17px,1.6vw,21px)] font-light text-paper">
                          {item}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              ) : (
                kategori.deskripsi && (
                  <Reveal>
                    <p className="max-w-[520px] text-[15px] leading-[1.8] text-[#9a9282]">
                      {kategori.deskripsi}
                    </p>
                  </Reveal>
                )
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
