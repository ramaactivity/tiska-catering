"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { galeriAcara } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import WordReveal from "@/components/motion/WordReveal";
import Reveal from "@/components/motion/Reveal";
import EventRail from "@/components/gallery/EventRail";
import Lightbox, { type GalleryPhoto } from "@/components/gallery/Lightbox";

/**
 * Galeri Acara (beranda) — billboard "featured" sinematik (Ken Burns + auto-rotate
 * 1 sorotan per kategori) + rail hover-expand di bawahnya. Klik mana pun → lightbox.
 */
export default function GaleriAcara({ items }: { items: GalleryPhoto[] }) {
  const [hi, setHi] = useState(0); // posisi pada daftar sorotan
  const [box, setBox] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  // 1 sorotan per kategori (index global), agar billboard variatif & kuratif.
  const highlights = useMemo(() => {
    const seen = new Set<string>();
    const out: number[] = [];
    items.forEach((it, i) => {
      if (!seen.has(it.kategori)) {
        seen.add(it.kategori);
        out.push(i);
      }
    });
    return out;
  }, [items]);

  useEffect(() => {
    if (paused || reduce || highlights.length < 2) return;
    const t = setInterval(() => setHi((h) => (h + 1) % highlights.length), 4000);
    return () => clearInterval(t);
  }, [paused, reduce, highlights.length]);

  if (!items.length) return null;
  const activeGi = highlights[hi] ?? 0;
  const cur = items[activeGi];

  return (
    <section id="galeri" className="relative overflow-hidden bg-ink px-6 py-16 md:px-10 md:py-[13vh]">
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="mb-9 flex flex-wrap items-end justify-between gap-y-6">
          <div>
            <Reveal>
              <Eyebrow tone="dark">{galeriAcara.eyebrow}</Eyebrow>
            </Reveal>
            <h2 className="mt-6 font-display text-[clamp(30px,5vw,64px)] font-light leading-[0.98] tracking-[-0.025em] text-paper">
              <WordReveal segments={galeriAcara.judul} accentClass="text-gold-soft" />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <Link
              href={galeriAcara.cta.href}
              className="group inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-gold-soft transition-colors duration-300 hover:text-gold-bright"
            >
              {galeriAcara.cta.label}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Billboard featured (tinggi dibatasi agar header tetap terlihat) */}
        <Reveal>
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl ring-1 ring-line sm:aspect-[2/1] lg:aspect-auto lg:h-[min(52vh,520px)]"
          >
            <AnimatePresence>
              <motion.div
                key={cur.src}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 0.9, ease: "easeInOut" } }}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={reduce ? false : { scale: 1.12 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 7, ease: "easeOut" }}
                >
                  <Image
                    src={cur.src}
                    alt={cur.alt}
                    fill
                    priority={hi === 0}
                    sizes="(min-width: 1024px) 1280px, 100vw"
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,13,10,0.1)_35%,rgba(14,13,10,0.85))]"
            />

            {/* Caption + buka lightbox */}
            <button
              type="button"
              onClick={() => setBox(activeGi)}
              aria-label="Buka foto sorotan"
              className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 text-left sm:p-9"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={cur.src}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold-soft">
                    {cur.kategori}
                  </p>
                  <p className="mt-2 max-w-[560px] font-display text-[clamp(20px,3vw,36px)] font-light leading-tight text-paper">
                    {cur.judul ?? cur.alt}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Indikator sorotan */}
              <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
                {highlights.map((_, i) => (
                  <span
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setHi(i);
                    }}
                    className={`h-1.5 cursor-pointer rounded-full transition-all duration-400 ${
                      i === hi ? "w-6 bg-gold-soft" : "w-1.5 bg-paper/30 hover:bg-paper/60"
                    }`}
                  />
                ))}
              </div>
            </button>
          </div>
        </Reveal>

        {/* Rail berjalan tanpa henti (berhenti saat hover) */}
        <div className="mt-3">
          <EventRail items={items} onOpen={(i) => setBox(i)} marquee />
        </div>
      </div>

      <Lightbox items={items} index={box} onClose={() => setBox(null)} onIndex={setBox} />
    </section>
  );
}
