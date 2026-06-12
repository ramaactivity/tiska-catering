"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { menuRingkas } from "@/lib/content";
import { images } from "@/lib/images";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import Button from "@/components/ui/Button";

const ROTATE_MS = 4500;

/**
 * Menu ringkas (docs/04 #7) — showcase berputar:
 * panggung foto + daftar kategori. Kategori aktif berganti otomatis
 * (saat section terlihat); klik baris memilih langsung & menghentikan
 * putaran. Tanpa hover — perilaku identik desktop & sentuh.
 * Navigasi ke /menu lewat link di caption foto + tombol utama.
 */
export default function MenuRingkas() {
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);
  const reduceMotion = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const inView = useInView(listRef, { margin: "-15% 0px" });

  const tiles = menuRingkas.tiles;
  const aktif = tiles[active];
  const autoplay = inView && !manual && !reduceMotion;

  useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(
      () => setActive((a) => (a + 1) % tiles.length),
      ROTATE_MS,
    );
    return () => clearInterval(t);
  }, [autoplay, tiles.length]);

  const pilih = (i: number) => {
    setActive(i);
    setManual(true);
  };

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

        <div ref={listRef} className="grid gap-9 md:grid-cols-12 md:gap-14">
          {/* Panggung foto — di mobile tampil di atas daftar */}
          <div className="md:order-2 md:col-span-5">
            <Reveal delay={0.1} className="md:sticky md:top-[14vh]">
              <div className="relative aspect-[16/11] overflow-hidden rounded-lg md:aspect-[4/5]">
                {tiles.map((tile, i) => {
                  const foto = images.menuRingkas[tile.id];
                  if (!foto) return null;
                  return (
                    <Image
                      key={tile.id}
                      src={foto.src}
                      alt={foto.alt}
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className={`object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        i === active
                          ? "scale-100 opacity-100"
                          : "scale-[1.06] opacity-0"
                      }`}
                    />
                  );
                })}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(14,13,10,0.85))]"
                />
                <div className="absolute inset-x-6 bottom-5 md:inset-x-7 md:bottom-6">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-gold-soft">
                    {String(active + 1).padStart(2, "0")} — {aktif.nama}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-[1.65] text-paper/80">
                    {aktif.highlight}
                  </p>
                  <Link
                    href={`/menu#${aktif.id}`}
                    className="group mt-3 inline-flex items-center gap-2 text-[11.5px] uppercase tracking-[0.2em] text-gold-bright"
                  >
                    Jelajahi kategori
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Daftar kategori — klik untuk memilih */}
          <div className="md:order-1 md:col-span-7">
            {tiles.map((tile, i) => (
              <Reveal key={tile.id} delay={i * 0.05} duration={0.8} y={18}>
                <button
                  type="button"
                  onClick={() => pilih(i)}
                  aria-pressed={i === active}
                  className="group relative block w-full border-b border-line text-left first:border-t"
                >
                  {/* Garis progres putaran otomatis pada baris aktif */}
                  {autoplay && i === active && (
                    <motion.span
                      aria-hidden
                      key={`progress-${active}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: ROTATE_MS / 1000, ease: "linear" }}
                      className="absolute left-0 top-[-1px] h-px w-full origin-left bg-gold/60"
                    />
                  )}
                  <span className="flex items-center gap-5 py-5 md:gap-7 md:py-6">
                    <span
                      className={`shrink-0 font-display text-[13px] tracking-[0.1em] transition-colors duration-500 ${
                        i === active ? "text-gold-bright" : "text-gold-deep/70"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`min-w-0 flex-1 font-display text-[clamp(23px,2.9vw,40px)] font-light leading-[1.12] transition-colors duration-500 ${
                        i === active
                          ? "text-gold-soft"
                          : "text-paper/85 group-hover:text-paper"
                      }`}
                    >
                      {tile.nama}
                    </span>
                    <span
                      aria-hidden
                      className={`shrink-0 text-[17px] text-gold-soft transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        i === active
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-2 opacity-0"
                      }`}
                    >
                      →
                    </span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15} className="mt-14 text-center">
          <Button href={menuRingkas.cta.href}>{menuRingkas.cta.label}</Button>
        </Reveal>
      </div>
    </section>
  );
}
