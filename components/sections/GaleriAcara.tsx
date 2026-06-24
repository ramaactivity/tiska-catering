"use client";

import { useEffect, useState } from "react";
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
 * Galeri Acara (beranda) — billboard "featured" sinematik (Ken Burns + auto-rotate)
 * yang disorot oleh rail di bawahnya; hover rail = sorot di featured, klik = lightbox.
 */
export default function GaleriAcara({ items }: { items: GalleryPhoto[] }) {
  const [active, setActive] = useState(0);
  const [box, setBox] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce || items.length < 2) return;
    const t = setInterval(() => setActive((a) => (a + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, [paused, reduce, items.length]);

  if (!items.length) return null;
  const cur = items[active];

  return (
    <section id="galeri" className="relative overflow-hidden bg-ink px-6 py-[14vh] md:px-10">
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-y-6">
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

        {/* Featured + rail (hover di mana pun → pause rotasi) */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Billboard */}
          <Reveal>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl ring-1 ring-line sm:aspect-[2/1] lg:aspect-[21/9]">
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
                      priority={active === 0}
                      sizes="(min-width: 1024px) 1280px, 100vw"
                      className="object-cover"
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,13,10,0.15)_30%,rgba(14,13,10,0.85))]"
              />

              {/* Caption featured */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 sm:p-9">
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
                    <p className="mt-2 max-w-[520px] font-display text-[clamp(18px,2.6vw,30px)] font-light leading-tight text-paper">
                      {cur.alt}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Indikator dot */}
                <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
                  {items.slice(0, 8).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Foto ${i + 1}`}
                      onClick={() => setActive(i)}
                      className={`h-1.5 rounded-full transition-all duration-400 ${
                        i === active % 8
                          ? "w-6 bg-gold-soft"
                          : "w-1.5 bg-paper/30 hover:bg-paper/60"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Rail */}
          <div className="mt-3">
            <EventRail
              items={items}
              onOpen={(i) => setBox(i)}
              onActive={(i) => setActive(i)}
            />
          </div>
        </div>
      </div>

      <Lightbox items={items} index={box} onClose={() => setBox(null)} onIndex={setBox} />
    </section>
  );
}
