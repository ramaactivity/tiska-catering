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

const ROTATE_MS = 5000;
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Menu ringkas (docs/04 #7) — showcase berputar, satu layar penuh (md+):
 * kategori aktif berganti otomatis; klik baris memilih & menghentikan
 * putaran. Foto aktif selalu ber-Ken Burns pelan (living crossfade) —
 * tidak pernah diam, pergantian tumpang-tindih mulus. Transform/opacity
 * saja; reduced-motion: statis tanpa autoplay.
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
    <section className="flex flex-col justify-center bg-ink px-6 py-[12vh] md:min-h-svh md:px-10 md:py-[6vh]">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4 md:mb-9">
          <div>
            <Reveal>
              <p className="mb-3 text-[11px] uppercase tracking-[0.34em] text-teal">
                {menuRingkas.eyebrow}
              </p>
            </Reveal>
            <h2 className="font-display text-[clamp(30px,3.8vw,54px)] font-light leading-[0.95] tracking-[-0.02em] text-paper">
              <WordReveal segments={menuRingkas.judul} />
            </h2>
          </div>
          <Reveal delay={0.15} className="hidden md:block">
            <Button href={menuRingkas.cta.href}>{menuRingkas.cta.label}</Button>
          </Reveal>
        </div>

        <div ref={listRef} className="grid gap-8 md:grid-cols-12 md:gap-12">
          {/* Panggung foto — di mobile tampil di atas daftar */}
          <div className="md:order-2 md:col-span-5">
            <Reveal delay={0.1}>
              <div className="relative h-[42vh] min-h-[260px] overflow-hidden rounded-lg md:h-[62vh] md:max-h-[640px]">
                {tiles.map((tile, i) => {
                  const foto = images.menuRingkas[tile.id];
                  if (!foto) return null;
                  const isActive = i === active;
                  return (
                    <motion.div
                      key={tile.id}
                      initial={false}
                      animate={
                        reduceMotion
                          ? { opacity: isActive ? 1 : 0 }
                          : {
                              opacity: isActive ? 1 : 0,
                              // Ken Burns kontinu: foto aktif selalu bergerak
                              // pelan — tidak pernah ada momen diam
                              scale: isActive ? [1.04, 1.12] : 1.04,
                            }
                      }
                      transition={{
                        opacity: { duration: 1.1, ease: EASE },
                        scale: { duration: ROTATE_MS / 1000 + 1.5, ease: "linear" },
                      }}
                      className="absolute inset-0 will-change-transform"
                    >
                      <Image
                        src={foto.src}
                        alt={foto.alt}
                        fill
                        sizes="(min-width: 768px) 40vw, 100vw"
                        className="object-cover"
                      />
                    </motion.div>
                  );
                })}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(14,13,10,0.85))]"
                />
                {/* Caption kategori aktif — fade lembut tiap pergantian */}
                <motion.div
                  key={`caption-${active}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
                  className="absolute inset-x-6 bottom-5 md:inset-x-7 md:bottom-6"
                >
                  <p className="text-[11px] uppercase tracking-[0.28em] text-gold-soft">
                    {String(active + 1).padStart(2, "0")} — {aktif.nama}
                  </p>
                  <p className="mt-1 text-[13px] leading-[1.6] text-paper/80">
                    {aktif.highlight}
                  </p>
                  <Link
                    href={`/menu#${aktif.id}`}
                    className="group mt-2.5 inline-flex items-center gap-2 text-[11.5px] uppercase tracking-[0.2em] text-gold-bright"
                  >
                    Jelajahi kategori
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </motion.div>
              </div>
            </Reveal>
          </div>

          {/* Daftar kategori — klik untuk memilih */}
          <div className="md:order-1 md:col-span-7">
            {tiles.map((tile, i) => (
              <Reveal key={tile.id} delay={i * 0.04} duration={0.7} y={14}>
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
                  <span className="flex items-center gap-4 py-[15px] md:gap-6 md:py-[17px]">
                    <span
                      className={`shrink-0 font-display text-[12px] tracking-[0.1em] transition-colors duration-500 ${
                        i === active ? "text-gold-bright" : "text-gold-deep/70"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`min-w-0 flex-1 font-display text-[clamp(20px,2.2vw,31px)] font-light leading-[1.15] transition-colors duration-500 ${
                        i === active
                          ? "text-gold-soft"
                          : "text-paper/85 group-hover:text-paper"
                      }`}
                    >
                      {tile.nama}
                    </span>
                    <span
                      aria-hidden
                      className={`shrink-0 text-[16px] text-gold-soft transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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

            <Reveal delay={0.2} className="mt-8 text-center md:hidden">
              <Button href={menuRingkas.cta.href}>
                {menuRingkas.cta.label}
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
