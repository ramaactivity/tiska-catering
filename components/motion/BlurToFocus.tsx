"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useMotionProfile } from "./useMotionProfile";

type BlurToFocusProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  blur?: number;
  className?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/** Reveal blur → fokus untuk heading/foto (dipakai a.l. section Profil & halaman Menu). */
export default function BlurToFocus({
  children,
  delay = 0,
  duration = 1.1,
  blur = 12,
  className,
}: BlurToFocusProps) {
  const { reduce, lite } = useMotionProfile();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  // Mobile: pertahankan reveal opacity yang murah, lepas filter blur (mahal di GPU HP).
  const b = lite ? 0 : blur;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: `blur(${b}px)` }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
