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
  // Mulai dari nilai SEBENARNYA, bukan 0. Ini yang terkirim di HTML server:
  // sebelumnya crawler (dan pembaca tanpa JS) hanya melihat "0+ Tahun
  // pengalaman" — empat angka paling meyakinkan di situs ini tak pernah
  // terbaca mesin. Mundur ke 0 baru dilakukan di klien, sebelum animasinya.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    if (!inView) {
      setDisplay(0);
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
