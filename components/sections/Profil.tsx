"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { t, type Lang } from "@/lib/i18n";
import { images } from "@/lib/images";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Profil: latar terang, heading word-by-word + duo foto.
 * Foto: entrance fade-up + settle scale (bahasa motion hero), lalu
 * parallax berlawanan saat scroll — semua transform-only (GPU).
 */
export default function Profil({ photos = images.profil, lang = "id" }: { photos?: { src: string; alt: string }[]; lang?: Lang }) {
  const { profil } = t(lang);
  const fotoRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: fotoRef,
    offset: ["start end", "end start"],
  });
  // drift berlawanan arah; modest agar tetap anggun
  const driftKiri = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const driftKanan = useTransform(scrollYProgress, [0, 1], [-20, 52]);

  return (
    <section id="profil" className="bg-paper-bg px-6 py-24 md:px-10 md:py-[18vh]">
      <div className="mx-auto grid max-w-[1280px] items-center gap-14 md:grid-cols-12">
        <div className="md:col-span-6">
          <Reveal>
            <Eyebrow tone="light" className="mb-7">
              {profil.eyebrow}
            </Eyebrow>
          </Reveal>
          <h2 className="font-display text-[clamp(30px,4.2vw,60px)] font-light leading-[1.1] text-paper-ink">
            <WordReveal segments={profil.judul} accentClass="text-gold-deep" />
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-7 max-w-[470px] text-[16.5px] leading-[1.9] text-paper-ink/80">
              {profil.body}
            </p>
          </Reveal>
        </div>

        <div ref={fotoRef} className="grid grid-cols-2 gap-4 md:col-span-6">
          {photos.map((foto, i) => (
            <motion.div
              key={foto.src}
              style={
                reduceMotion
                  ? undefined
                  : { y: i === 0 ? driftKiri : driftKanan }
              }
              className={`will-change-transform ${i === 1 ? "mt-11" : ""}`}
            >
              {/* Entrance: bingkai fade-up… */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.9, delay: i * 0.18, ease: EASE }}
                className="relative aspect-3/4 overflow-hidden rounded-lg"
              >
                {/* …foto di dalamnya mendarat dari zoom (Ken Burns settle) */}
                <motion.div
                  initial={reduceMotion ? false : { scale: 1.14 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 1.7, delay: i * 0.18, ease: EASE }}
                  className="absolute inset-0 will-change-transform"
                >
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
