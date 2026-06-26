"use client";

import { motion } from "framer-motion";
import type { RichText } from "@/lib/content";
import { useMotionProfile } from "./useMotionProfile";

const EASE = [0.22, 1, 0.36, 1] as const;

type WordRevealProps = {
  segments: RichText;
  /** kelas aksen kata italic: text-gold-soft (gelap) / text-gold-deep (terang) / "" (warisi warna) */
  accentClass?: string;
  /** jeda antar kata (detik) */
  stagger?: number;
};

/** Teks muncul kata demi kata, blur → fokus, saat masuk viewport. */
export default function WordReveal({
  segments,
  accentClass = "text-gold-soft",
  stagger = 0.06,
}: WordRevealProps) {
  const { reduce, lite } = useMotionProfile();
  let wordIndex = 0;

  return (
    <>
      {segments.map((seg, si) => (
        <span key={si} className="contents">
          {seg.br ? <span className="block h-0 w-full" /> : null}
          {seg.text.split(" ").map((word, wi) => {
          if (!word) return null;
          const delay = wordIndex++ * stagger;
          return (
            <motion.span
              key={`${si}-${wi}`}
              className={`inline-block ${
                seg.italic ? `font-accent italic ${accentClass}` : ""
              }`}
              initial={
                reduce
                  ? false
                  : { opacity: 0, y: "0.4em", filter: lite ? "blur(0px)" : "blur(8px)" }
              }
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, delay, ease: EASE }}
            >
              {word}
              {" "}
            </motion.span>
          );
          })}
        </span>
      ))}
    </>
  );
}
