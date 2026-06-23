import { layanan, layananHeader } from "@/lib/content";
import { images } from "@/lib/images";
import Tile from "@/components/ui/Tile";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";

// posisi bento per tile (acuan v8): besar kiri 2 baris, 2 kanan, 1 lebar penuh
const SPANS = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-12",
];

/** Layanan: 4 layanan dalam bento grid, latar gelap (docs/04 #5). */
export default function Layanan({ photos = images.layanan }: { photos?: { src: string; alt: string }[] }) {
  return (
    <section id="layanan" className="bg-ink px-6 py-[16vh] md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-5">
          <h2 className="font-display text-[clamp(34px,5.5vw,90px)] font-light leading-[0.92] tracking-[-0.025em] text-paper">
            <WordReveal segments={layananHeader.judul} />
          </h2>
          <Reveal delay={0.15}>
            <p className="max-w-[300px] text-[14px] leading-[1.7] text-[#9a9282]">
              {layananHeader.deskripsi}
            </p>
          </Reveal>
        </div>

        <div className="grid auto-rows-[230px] grid-cols-1 gap-4 md:grid-cols-12">
          {layanan.map((item, i) => (
            <Reveal key={item.judul} delay={i * 0.08} className={SPANS[i]}>
              <Tile
                src={photos[i].src}
                alt={photos[i].alt}
                judul={item.judul}
                deskripsi={item.deskripsi}
                nomor={String(i + 1).padStart(2, "0")}
                sizes={
                  i === 0 || i === 3
                    ? "(min-width: 768px) 60vw, 100vw"
                    : "(min-width: 768px) 40vw, 100vw"
                }
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
