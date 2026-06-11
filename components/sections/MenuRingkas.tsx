import { menuRingkas } from "@/lib/content";
import { images } from "@/lib/images";
import Tile from "@/components/ui/Tile";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import Button from "@/components/ui/Button";

// bento (acuan v8): 7-5 lalu 5-7
const SPANS = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
];

/** Menu ringkas: 4 kategori unggulan + link ke /menu (docs/04 #7). */
export default function MenuRingkas() {
  return (
    <section className="bg-ink px-6 py-[16vh] md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="mb-4 text-[11px] uppercase tracking-[0.34em] text-teal">
            {menuRingkas.eyebrow}
          </p>
        </Reveal>
        <h2 className="mb-14 font-display text-[clamp(34px,5.5vw,90px)] font-light leading-[0.92] tracking-[-0.025em] text-paper">
          <WordReveal segments={menuRingkas.judul} />
        </h2>

        <div className="grid auto-rows-[270px] grid-cols-1 gap-4 md:grid-cols-12">
          {menuRingkas.tiles.map((tile, i) => (
            <Reveal key={tile.nama} delay={i * 0.08} className={SPANS[i]}>
              <Tile
                src={images.menuRingkas[i].src}
                alt={images.menuRingkas[i].alt}
                judul={tile.nama}
                deskripsi={tile.highlight}
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-14 text-center">
          <Button href={menuRingkas.cta.href}>{menuRingkas.cta.label}</Button>
        </Reveal>
      </div>
    </section>
  );
}
