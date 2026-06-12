"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { menuRingkas } from "@/lib/content";
import { images } from "@/lib/images";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import Button from "@/components/ui/Button";

/**
 * Menu ringkas (docs/04 #7) — daftar editorial tipografis:
 * hover baris memunculkan foto kategori yang melayang mengikuti kursor
 * (transform-only via spring, ringan). Mobile: baris + thumbnail kecil.
 * Tiap baris menaut ke anchor kategorinya di /menu.
 */
export default function MenuRingkas() {
  const [active, setActive] = useState(-1);
  const reduceMotion = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 170, damping: 22, mass: 0.5 });
  const y = useSpring(my, { stiffness: 170, damping: 22, mass: 0.5 });

  const onMove = (e: React.MouseEvent) => {
    mx.set(e.clientX);
    my.set(e.clientY);
  };

  return (
    <section
      className="bg-ink px-6 py-[16vh] md:px-10"
      onMouseMove={reduceMotion ? undefined : onMove}
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="mb-4 text-[11px] uppercase tracking-[0.34em] text-teal">
            {menuRingkas.eyebrow}
          </p>
        </Reveal>
        <h2 className="mb-14 font-display text-[clamp(34px,5.5vw,90px)] font-light leading-[0.92] tracking-[-0.025em] text-paper">
          <WordReveal segments={menuRingkas.judul} />
        </h2>

        {/* Daftar kategori */}
        <div onMouseLeave={() => setActive(-1)}>
          {menuRingkas.tiles.map((tile, i) => {
            const foto = images.menuRingkas[tile.id];
            return (
              <Reveal key={tile.id} delay={i * 0.05} duration={0.8} y={18}>
                <Link
                  href={`/menu#${tile.id}`}
                  onMouseEnter={() => setActive(i)}
                  className="group flex items-center justify-between gap-5 border-b border-line py-6 transition-colors duration-500 first:border-t md:py-8"
                >
                  <div className="flex min-w-0 items-baseline gap-5 md:gap-8">
                    <span className="shrink-0 font-display text-[13px] tracking-[0.1em] text-gold-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate font-display text-[clamp(26px,4.4vw,58px)] font-light leading-[1.05] text-paper transition-colors duration-500 group-hover:text-gold-soft">
                      {tile.nama}
                    </span>
                  </div>

                  <div className="flex shrink-0 items-center gap-5">
                    <span className="hidden max-w-[300px] text-right text-[13px] leading-[1.6] text-[#9a9282] opacity-60 transition-opacity duration-500 group-hover:opacity-100 lg:block">
                      {tile.highlight}
                    </span>
                    {/* Thumbnail mobile (foto melayang hanya md+) */}
                    {foto && (
                      <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-md md:hidden">
                        <Image
                          src={foto.src}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </span>
                    )}
                    <span
                      aria-hidden
                      className="hidden -translate-x-2 text-[18px] text-gold-soft opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100 md:block"
                    >
                      →
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15} className="mt-14 text-center">
          <Button href={menuRingkas.cta.href}>{menuRingkas.cta.label}</Button>
        </Reveal>
      </div>

      {/* Foto melayang mengikuti kursor — fixed + transform-only (GPU) */}
      {!reduceMotion && (
        <motion.div
          aria-hidden
          style={{ x, y }}
          className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
        >
          <div
            className={`relative h-[320px] w-[256px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg shadow-[0_30px_80px_rgba(0,0,0,0.45)] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              active >= 0 ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          >
            {menuRingkas.tiles.map((tile, i) => {
              const foto = images.menuRingkas[tile.id];
              if (!foto) return null;
              return (
                <Image
                  key={tile.id}
                  src={foto.src}
                  alt=""
                  fill
                  sizes="256px"
                  className={`object-cover transition-opacity duration-400 ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              );
            })}
          </div>
        </motion.div>
      )}
    </section>
  );
}
