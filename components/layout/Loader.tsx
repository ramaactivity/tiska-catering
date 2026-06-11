"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const WORD_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Loader pembuka (docs/04 #0): "Celebrate love" + Est. 1980 naik kata per kata,
 * lalu tirai terbuka ke atas. Dilewati bila prefers-reduced-motion.
 */
export default function Loader() {
  const reduceMotion = useReducedMotion();
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const curtain = setTimeout(() => setDone(true), 2600);
    const unmount = setTimeout(() => setGone(true), 3900);
    return () => {
      clearTimeout(curtain);
      clearTimeout(unmount);
    };
  }, [reduceMotion]);

  if (reduceMotion || gone) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-ink transition-[clip-path] duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
      style={{ clipPath: done ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)" }}
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
        transition={{ duration: 1.8, delay: 1, ease: [0.5, 0, 0.2, 1] }}
        className="mt-5 h-px bg-[linear-gradient(90deg,transparent,var(--gold),transparent)]"
      />
    </div>
  );
}
