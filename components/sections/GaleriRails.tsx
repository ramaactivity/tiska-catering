"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import EventRail from "@/components/gallery/EventRail";
import Lightbox, { type GalleryPhoto } from "@/components/gallery/Lightbox";

/**
 * /galeri — pengalaman "Netflix" penuh: billboard featured (sorot highlight tiap
 * kategori, auto-rotate) + satu rail per kategori. Klik mana pun → lightbox.
 */
export default function GaleriRails({ items }: { items: GalleryPhoto[] }) {
  const [box, setBox] = useState<number | null>(null);
  const [active, setActive] = useState(0); // index ke highlights
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  // Kelompokkan per kategori (urutan kemunculan), bawa index global (gi).
  const { groups, highlights } = useMemo(() => {
    const indexed = items.map((p, gi) => ({ ...p, gi }));
    const map = new Map<string, (GalleryPhoto & { gi: number })[]>();
    const order: string[] = [];
    indexed.forEach((it) => {
      if (!map.has(it.kategori)) {
        map.set(it.kategori, []);
        order.push(it.kategori);
      }
      map.get(it.kategori)!.push(it);
    });
    const groups = order.map((k) => ({ kategori: k, photos: map.get(k)! }));
    const highlights = groups.map((g) => g.photos[0].gi); // 1 foto/kategori
    return { groups, highlights };
  }, [items]);

  useEffect(() => {
    if (paused || reduce || highlights.length < 2) return;
    const t = setInterval(
      () => setActive((a) => (a + 1) % highlights.length),
      4000,
    );
    return () => clearInterval(t);
  }, [paused, reduce, highlights.length]);

  if (!items.length) return null;
  const cur = items[highlights[active] ?? 0];

  return (
    <section className="bg-ink px-6 pb-16 md:px-10 md:pb-[14vh]">
      <div className="mx-auto max-w-[1280px]">
        {/* Billboard */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl ring-1 ring-line sm:aspect-[2/1] lg:aspect-auto lg:h-[min(56vh,560px)]"
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
                  priority
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
          <button
            type="button"
            onClick={() => setBox(highlights[active])}
            className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 text-left sm:p-9"
            aria-label="Buka foto sorotan"
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
            <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
              {highlights.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-400 ${
                    i === active ? "w-6 bg-gold-soft" : "w-1.5 bg-paper/30"
                  }`}
                />
              ))}
            </div>
          </button>
        </div>

        {/* Rail per kategori */}
        <div className="mt-14 flex flex-col gap-12">
          {groups.map((g) => (
            <div key={g.kategori}>
              <h2 className="mb-1 px-1 font-display text-[clamp(18px,2.2vw,26px)] font-light text-paper">
                {g.kategori}
              </h2>
              <EventRail
                items={g.photos}
                onOpen={(localI) => setBox(g.photos[localI].gi)}
              />
            </div>
          ))}
        </div>
      </div>

      <Lightbox items={items} index={box} onClose={() => setBox(null)} onIndex={setBox} />
    </section>
  );
}
