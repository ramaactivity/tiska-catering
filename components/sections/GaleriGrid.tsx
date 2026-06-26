import Image from "next/image";
import { images } from "@/lib/images";
import Reveal from "@/components/motion/Reveal";

// variasi tinggi tile agar grid terasa editorial, bukan seragam kaku
const RATIOS = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/4]"];

/** Halaman /galeri: grid masonry foto acara dengan reveal stagger (docs/04). */
export default function GaleriGrid({
  items = images.galeri,
}: {
  items?: { src: string; alt: string; kategori: string }[];
}) {
  return (
    <section className="bg-ink px-6 pb-16 md:px-10 md:pb-[14vh]">
      <div className="mx-auto max-w-[1280px] columns-2 gap-4 md:columns-3">
        {items.map((foto, i) => (
          <Reveal
            key={`${foto.src}-${i}`}
            delay={(i % 3) * 0.1}
            className="mb-4 break-inside-avoid"
          >
            <figure className="group relative overflow-hidden rounded-lg">
              <div className={`relative ${RATIOS[i % RATIOS.length]}`}>
                {/* Transform saja yang dianimasikan; dimming via overlay opacity */}
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-[1300ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:scale-[1.06]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-ink/10 transition-opacity duration-700 group-hover:opacity-0"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(14,13,10,0.75))]"
                />
              </div>
              <figcaption className="absolute bottom-4 left-5 text-[10.5px] uppercase tracking-[0.22em] text-paper/75">
                {foto.kategori}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
