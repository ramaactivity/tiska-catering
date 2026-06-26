"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { testimoni } from "@/lib/content";
import type { RichText } from "@/lib/content";
import Reveal from "@/components/motion/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 7000;

/** Render kutipan kaya (italic = aksen emas) tanpa animasi per-kata. */
function RichQuote({ segments }: { segments: RichText }) {
  return (
    <>
      {segments.map((seg, i) => (
        <span
          key={i}
          className={seg.italic ? "font-accent italic text-gold-soft" : ""}
        >
          {seg.text}
        </span>
      ))}
    </>
  );
}

/**
 * Testimoni: carousel kutipan tunggal yang berganti halus (fade + blur).
 * Auto-advance kalem; berhenti saat hover; nonaktif bila prefers-reduced-motion.
 * Glow radial emas halus (docs/04 #8).
 */
export default function Testimoni() {
  const items = testimoni.daftar;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || paused || items.length < 2) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      AUTOPLAY_MS,
    );
    return () => clearInterval(id);
  }, [reduce, paused, items.length]);

  const active = items[index];

  return (
    <section className="relative overflow-hidden bg-ink-2 px-6 py-[18vh] md:px-10">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(196,160,90,0.09),transparent_60%)]"
      />
      <div
        className="relative mx-auto max-w-[1000px] text-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Reveal>
          <p className="mb-11 text-[11px] uppercase tracking-[0.34em] text-gold">
            {testimoni.eyebrow}
          </p>
        </Reveal>

        {/* Tinggi dijaga via grid stack agar layout tak melompat saat berganti */}
        <div className="grid">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="col-start-1 row-start-1"
              initial={reduce ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14, filter: "blur(8px)" }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <blockquote className="font-display text-[clamp(27px,4.2vw,58px)] font-light leading-[1.2] tracking-[-0.025em] text-paper">
                <RichQuote segments={active.kutipanRich} />
              </blockquote>
              <div className="mt-12">
                <p className="text-[15px] text-gold-soft">{active.nama}</p>
                <p className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-[#7a7468]">
                  {active.peran}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot navigasi */}
        {items.length > 1 && (
          <div className="mt-12 flex items-center justify-center gap-3">
            {items.map((t, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Tampilkan testimoni ${t.nama}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index
                    ? "w-7 bg-gold-soft"
                    : "w-1.5 bg-paper/25 hover:bg-paper/45"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
