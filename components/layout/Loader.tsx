"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  LOADER_TIMING,
  loaderWillPlay,
  markLoaderPlayed,
} from "@/lib/loader";

const WORD_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Loader pembuka (docs/04 #0): "Celebrate love" naik kata per kata,
 * konten memudar, lalu tirai terangkat (translateY — mulus di GPU)
 * terkoreografi dengan entrance hero. Sekali per sesi.
 */
export default function Loader() {
  const reduceMotion = useReducedMotion();
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (reduceMotion || !loaderWillPlay()) {
      setGone(true);
      return;
    }
    markLoaderPlayed();
    const t1 = setTimeout(() => setFading(true), LOADER_TIMING.contentFade * 1000);
    const t2 = setTimeout(() => setDone(true), LOADER_TIMING.curtain * 1000);
    const t3 = setTimeout(() => setGone(true), LOADER_TIMING.total * 1000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [reduceMotion]);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-ink will-change-transform"
      style={{
        transform: done ? "translateY(-101%)" : "translateY(0)",
        transition: `transform ${LOADER_TIMING.curtainDuration}s cubic-bezier(0.76, 0, 0.24, 1)`,
      }}
    >
      <div
        className="flex flex-col items-center transition-opacity duration-300 ease-out"
        style={{ opacity: fading ? 0 : 1 }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[11px] uppercase tracking-[0.5em] text-gold-deep"
        >
          Est. 1980 — Bogor
        </motion.p>

        <p
          style={{ fontVariationSettings: "'opsz' 144" }}
          className="my-[18px] font-display text-[clamp(34px,7vw,84px)] font-light leading-none text-paper"
        >
          <span className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease: WORD_EASE }}
            >
              Celebrate
            </motion.span>
          </span>{" "}
          <span className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block font-accent italic text-gold-soft"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.62, ease: WORD_EASE }}
            >
              love
            </motion.span>
          </span>
        </p>

        <motion.span
          initial={{ width: 0 }}
          animate={{ width: "min(340px, 60vw)" }}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.5, 0, 0.2, 1] }}
          className="mt-5 h-px bg-[linear-gradient(90deg,transparent,var(--gold),transparent)]"
        />
      </div>
    </div>
  );
}
