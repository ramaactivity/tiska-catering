"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "@/lib/lenis-lock";

/**
 * Smooth scroll global + sinkronisasi Lenis–GSAP ScrollTrigger.
 * Pola sinkronisasi WAJIB sesuai docs/05-technical-spec.md.
 */
export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Hormati prefers-reduced-motion: pakai scroll native, tanpa Lenis
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis();
    setLenis(lenis); // agar modal bisa mengunci scroll (cegah kedip di cropper)
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
