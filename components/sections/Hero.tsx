"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { hero } from "@/lib/content";
import { images } from "@/lib/images";
import { LOADER_TIMING, loaderWillPlay } from "@/lib/loader";
import RichTitle from "@/components/ui/RichTitle";
import Button from "@/components/ui/Button";

const EASE = [0.22, 1, 0.36, 1] as const;

// delayChildren dinamis: sinkron dengan tirai loader bila loader tampil
const container = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.14, delayChildren: delay },
  }),
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
};

type Foto = { src: string; alt: string };

/** Hero: foto sinematik parallax + teks staggered masuk (docs/04 #1). */
export default function Hero({ photo = images.hero }: { photo?: Foto }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  // teks hero mulai naik saat tirai loader ±separuh terbuka (handoff mulus)
  const [entranceDelay] = useState(() =>
    loaderWillPlay() ? LOADER_TIMING.heroDelay : 0.2,
  );
  // Ken Burns settle foto: sudah bergerak tepat sebelum tirai terangkat,
  // mendarat anggun setelahnya. Kunjungan ulang (tanpa loader): versi singkat.
  const [fotoEntrance] = useState(() =>
    loaderWillPlay()
      ? { scale: 1.14, delay: LOADER_TIMING.curtain - 0.15, duration: 3.2 }
      : { scale: 1.07, delay: 0.1, duration: 1.8 },
  );
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate flex h-svh flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Foto latar + parallax + overlay gradien (teks harus selalu terbaca).
          Dimming via overlay, bukan filter — filter pada layer ber-parallax
          memaksa re-raster foto fullscreen tiap frame. */}
      <motion.div
        style={reduceMotion ? undefined : { y }}
        initial={reduceMotion ? false : { scale: fotoEntrance.scale }}
        animate={reduceMotion ? undefined : { scale: 1 }}
        transition={{
          duration: fotoEntrance.duration,
          delay: fotoEntrance.delay,
          ease: EASE,
        }}
        className="absolute inset-x-0 top-0 -z-10 h-[130%] will-change-transform"
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-ink/50" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,13,10,0.5),rgba(14,13,10,0.2)_40%,rgba(14,13,10,0.92))]"
        />
      </motion.div>

      <motion.div
        variants={container}
        custom={entranceDelay}
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        className="flex flex-col items-center"
      >
        <motion.p
          variants={item}
          className="mb-7 flex items-center gap-4 text-[11px] uppercase tracking-[0.34em] text-gold-soft"
        >
          <span aria-hidden className="h-px w-10 bg-gold" />
          {hero.eyebrow}
          <span aria-hidden className="h-px w-10 bg-gold" />
        </motion.p>

        <motion.h1
          variants={item}
          style={{ fontVariationSettings: "'opsz' 144" }}
          className="font-display text-[clamp(44px,8.5vw,138px)] font-light leading-[0.94] text-paper"
        >
          <RichTitle segments={hero.judul} />
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-[34px] max-w-[520px] text-[clamp(14px,1.6vw,17px)] leading-[1.7] text-[#cbc5b8]"
        >
          {hero.subjudul}
        </motion.p>

        <motion.div variants={item} className="mt-11">
          <Button href={hero.cta.href}>{hero.cta.label}</Button>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={reduceMotion ? undefined : { opacity: cueOpacity }}
        className="absolute bottom-[34px] left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <svg
          width="22"
          height="34"
          viewBox="0 0 22 34"
          fill="none"
          className="text-gold-soft"
        >
          <rect
            x="1"
            y="1"
            width="20"
            height="32"
            rx="10"
            stroke="currentColor"
            strokeWidth="1"
          />
          <motion.circle
            cx="11"
            cy="10"
            r="2.5"
            fill="currentColor"
            animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </section>
  );
}
