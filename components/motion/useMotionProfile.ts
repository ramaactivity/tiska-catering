"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Profil gerak untuk menjaga performa di mobile.
 *
 * - `reduce`  : pengguna meminta prefers-reduced-motion → matikan semua animasi.
 * - `small`   : layar < md (HP). Reveal fade/translate murah tetap jalan,
 *               tapi efek mahal (filter blur, parallax berat) dimatikan.
 * - `lite`    : `reduce || small` → pakai ini untuk memutuskan apakah efek
 *               berat (terutama filter blur full-width) dijalankan.
 *
 * Catatan SSR: `small` mulai `false` lalu dikoreksi di effect sebelum elemen
 * masuk viewport — aman untuk reveal whileInView (terpicu saat scroll).
 */
export function useMotionProfile() {
  const reduce = useReducedMotion() ?? false;
  const [small, setSmall] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setSmall(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return { reduce, small, lite: reduce || small };
}
