"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { sampul, acara } from "@/lib/opentable/content";
import { useMotionProfile } from "@/components/motion/useMotionProfile";

const EASE = [0.22, 1, 0.36, 1] as const;

const wadah = {
  hidden: {},
  tampil: { transition: { staggerChildren: 0.13, delayChildren: 0.25 } },
};
const naik = {
  hidden: { opacity: 0, y: 22 },
  tampil: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
};

/**
 * Sampul undangan — layar terkunci sampai tamu menekan "Buka Undangan".
 * Menahan seluruh isi undangan sampai tamu memutuskan masuk: tidak ada
 * observer scroll yang berjalan di belakang, dan foto di bawah lipatan
 * belum diunduh.
 */
export default function Cover({
  nama,
  foto,
  onBuka,
}: {
  nama: string;
  foto: { src: string; alt: string };
  onBuka: () => void;
}) {
  const { reduce } = useMotionProfile();

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ink px-6 text-center">
      <motion.div
        initial={reduce ? false : { scale: 1.08 }}
        animate={reduce ? undefined : { scale: 1 }}
        transition={{ duration: 4, ease: EASE }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src={foto.src}
          alt={foto.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.34]"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_50%_35%,rgba(14,13,10,0.42),rgba(14,13,10,0.93))]"
      />

      <motion.div
        variants={wadah}
        initial="hidden"
        animate="tampil"
        className="relative flex w-full max-w-[540px] flex-col items-center"
      >
        {/* Bingkai emas tipis — ornamen, bukan kotak: hanya sudut yang ditarik. */}
        <span aria-hidden className="pointer-events-none absolute -inset-x-4 -inset-y-8 sm:-inset-x-8">
          <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-gold/35" />
          <span className="absolute right-0 top-0 h-8 w-8 border-r border-t border-gold/35" />
          <span className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-gold/35" />
          <span className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-gold/35" />
        </span>

        <motion.p
          variants={naik}
          className="flex items-center gap-3.5 text-[10.5px] uppercase tracking-[0.34em] text-gold-soft"
        >
          <span aria-hidden className="h-px w-8 bg-gold/70" />
          {sampul.eyebrow}
          <span aria-hidden className="h-px w-8 bg-gold/70" />
        </motion.p>

        <motion.h1
          variants={naik}
          style={{ fontVariationSettings: "'opsz' 144" }}
          className="mt-7 font-display text-[clamp(40px,10vw,68px)] font-light leading-[1.02] tracking-[-0.02em] text-paper"
        >
          Tiska
          <br />
          <span className="font-accent italic text-gold-soft">Open Table</span>
        </motion.h1>

        <motion.p variants={naik} className="mt-6 text-[12.5px] uppercase tracking-[0.24em] text-paper/70">
          {acara.tanggalPanjang}
        </motion.p>

        <motion.span aria-hidden variants={naik} className="mt-9 h-px w-16 bg-gold/45" />

        <motion.div variants={naik} className="mt-8">
          <p className="text-[11px] uppercase tracking-[0.24em] text-paper/45">{sampul.kepada}</p>
          <p className="mt-2.5 font-display text-[clamp(20px,4.5vw,26px)] font-light leading-tight text-paper">
            {nama || sampul.tamuUmum}
          </p>
        </motion.div>

        <motion.button
          variants={naik}
          type="button"
          onClick={onBuka}
          className="group relative mt-10 inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-gold/70 px-9 py-[15px] text-[12.5px] uppercase tracking-[0.18em] text-gold-soft transition-colors duration-500 hover:text-ink"
        >
          <span
            aria-hidden
            className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-out group-hover:translate-y-0"
          />
          <span className="relative">{sampul.tombol}</span>
          <span aria-hidden className="relative transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </motion.button>

        <motion.p variants={naik} className="mt-7 max-w-[280px] text-[11px] leading-[1.7] text-paper/35">
          {sampul.catatan}
        </motion.p>
      </motion.div>
    </div>
  );
}
