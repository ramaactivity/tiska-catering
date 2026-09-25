"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

type CounterProps = {
  locale?: string;
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/** Angka naik dari 0 ke target saat masuk viewport. Pemisah ribuan ikut locale (10.000 / 10,000). */
export default function Counter({
  value,
  suffix = "",
  duration = 1.8,
  className,
  locale = "id-ID",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString(locale)}
      {suffix}
    </span>
  );
}
