"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

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
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
