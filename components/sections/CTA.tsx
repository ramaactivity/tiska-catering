"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cta } from "@/lib/content";
import { images } from "@/lib/images";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";

/** CTA penutup: foto parallax + "Send your love now" (docs/04 #10). */
export default function CTA({ photo = images.cta }: { photo?: { src: string; alt: string } }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={ref}
      id="kontak"
      className="relative isolate overflow-hidden px-6 py-24 text-center md:px-10 md:py-[24vh]"
    >
      {/* Dimming via overlay, bukan filter — filter pada layer ber-parallax
          memaksa re-raster foto fullscreen tiap frame. */}
      <motion.div
        style={reduceMotion ? undefined : { y }}
        initial={reduceMotion ? false : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 -top-[15%] -z-10 h-[130%] will-change-transform"
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-ink/60" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,13,10,0.9),rgba(14,13,10,0.35)_50%,rgba(14,13,10,0.95))]"
        />
      </motion.div>

      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="mb-7 text-[11px] uppercase tracking-[0.34em] text-gold-soft">
            {cta.eyebrow}
          </p>
        </Reveal>
        <h2
          style={{ fontVariationSettings: "'opsz' 144" }}
          className="font-display text-[clamp(40px,8vw,140px)] font-light leading-[0.9] tracking-[-0.025em] text-paper"
        >
          <WordReveal segments={cta.judul} stagger={0.1} />
        </h2>
        <Reveal delay={0.24}>
          <div className="mt-11">
            <Link
              href={cta.tombol.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-paper px-12 py-[18px] text-[13px] uppercase tracking-[0.1em] text-paper transition-colors duration-500 hover:text-ink"
            >
              <span
                aria-hidden
                className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-out group-hover:translate-y-0"
              />
              <span className="relative">{cta.tombol.label}</span>
              <span
                aria-hidden
                className="relative transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
