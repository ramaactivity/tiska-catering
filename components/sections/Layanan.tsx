"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { layanan, layananHeader, company } from "@/lib/content";
import { images } from "@/lib/images";
import WordReveal from "@/components/motion/WordReveal";
import Reveal from "@/components/motion/Reveal";

type Foto = { src: string; alt: string };
const EASE = "cubic-bezier(0.16,1,0.3,1)";
const THREAD =
  "repeating-linear-gradient(90deg, rgba(196,160,90,0.55) 0 7px, transparent 7px 16px)";

/**
 * Layanan — "Benang Emas": perjalanan layanan di sepanjang benang emas.
 * Desktop: pinned horizontal, stasiun zig-zag pada benang, gerak melengkung halus.
 * Mobile / reduced-motion: swipe horizontal kartu premium.
 */
export default function Layanan({ photos = images.layanan }: { photos?: Foto[] }) {
  const reduce = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const pinned = isDesktop && !reduce;

  return (
    <section id="layanan" className="bg-ink">
      <div className="mx-auto max-w-[1280px] px-6 pt-[15vh] md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <h2 className="font-display text-[clamp(34px,5.5vw,90px)] font-light leading-[0.92] tracking-[-0.025em] text-paper">
            <WordReveal segments={layananHeader.judul} />
          </h2>
          <Reveal delay={0.15}>
            <p className="max-w-[360px] text-[14px] leading-[1.7] text-[#9a9282]">
              {layananHeader.deskripsi}
              <span className="mt-2 block text-[11px] uppercase tracking-[0.22em] text-gold-soft/70">
                {pinned ? "Scroll menyusuri benang →" : "Geser untuk menyusuri →"}
              </span>
            </p>
          </Reveal>
        </div>
      </div>

      {pinned ? <PinnedThread photos={photos} /> : <SwipeRow photos={photos} />}
    </section>
  );
}

function PinnedThread({ photos }: { photos: Foto[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!rowRef.current) return;
      setTravel(Math.max(0, rowRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 350);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  // gerak melengkung halus: track naik sedikit di tengah lalu turun
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [34, -34, 34]);

  return (
    <div ref={sectionRef} style={{ height: `calc(100vh + ${travel}px)` }} className="relative mt-[6vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          ref={rowRef}
          style={{ x, y }}
          className="relative flex h-[78vh] items-center gap-[7vw] px-[9vw] will-change-transform"
        >
          {/* Benang emas melintang */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
            style={{ backgroundImage: THREAD }}
          />
          {layanan.map((s, i) => (
            <Station key={s.judul} i={i} judul={s.judul} deskripsi={s.deskripsi} photo={photos[i]} />
          ))}
          <EndStation />
        </motion.div>
      </div>
    </div>
  );
}

function Station({
  i,
  judul,
  deskripsi,
  photo,
}: {
  i: number;
  judul: string;
  deskripsi: string;
  photo?: Foto;
}) {
  return (
    <div className="relative h-full w-[260px] shrink-0">
      {/* Foto — di atas benang */}
      <div className="absolute bottom-1/2 left-1/2 mb-12 w-[220px] -translate-x-1/2">
        <div className="group relative overflow-hidden rounded-xl ring-1 ring-gold/25 shadow-[0_34px_64px_-26px_rgba(0,0,0,0.85)]">
          <div className="relative aspect-[3/4]">
            {photo && (
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="220px"
                className="object-cover transition-transform duration-[1300ms] will-change-transform group-hover:scale-[1.05]"
                style={{ transitionTimingFunction: EASE }}
              />
            )}
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,rgba(12,11,8,0.3))]" />
          </div>
        </div>
      </div>

      {/* Angka indeks duduk di benang */}
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(46px,4.2vw,70px)] font-light leading-none text-transparent [-webkit-text-stroke:1.1px_rgba(196,160,90,0.5)]"
      >
        {String(i + 1).padStart(2, "0")}
      </span>

      {/* Caption — di bawah benang */}
      <div className="absolute left-1/2 top-1/2 mt-12 w-[250px] -translate-x-1/2 text-center">
        <h3 className="font-display text-[clamp(20px,1.8vw,26px)] font-light leading-[1.12] text-gold-soft">
          {judul}
        </h3>
        <p className="mx-auto mt-2 max-w-[220px] text-[12.5px] leading-[1.65] text-paper/60">
          {deskripsi}
        </p>
        <a
          href={company.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group/cta mt-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-gold-soft/90 transition-colors hover:text-gold-bright"
        >
          Tanya layanan ini
          <span aria-hidden className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
        </a>
      </div>
    </div>
  );
}

function EndStation() {
  return (
    <div className="relative flex h-full w-[360px] shrink-0 items-center justify-center">
      <span aria-hidden className="absolute left-1/2 top-1/2 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold ring-4 ring-ink" />
      <div className="absolute left-1/2 top-1/2 w-[340px] -translate-x-1/2 mt-9">
        <p className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-gold-soft">
          <span aria-hidden className="h-px w-8 bg-gold" /> Acara lain?
        </p>
        <h3 className="font-display text-[clamp(24px,2.2vw,34px)] font-light leading-[1.1] text-paper">
          Setiap perayaan punya kebutuhannya sendiri.
        </h3>
        <p className="mt-3 max-w-[300px] text-[13.5px] leading-[1.8] text-paper/65">
          Ceritakan acara Anda, kami rancang layanan yang paling pas.
        </p>
        <a
          href={company.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mt-6 inline-flex w-fit items-center gap-2.5 overflow-hidden rounded-full border border-gold/70 px-7 py-3 text-[12px] uppercase tracking-[0.18em] text-gold-soft transition-colors duration-500 hover:text-ink active:scale-[0.98]"
        >
          <span aria-hidden className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-out group-hover:translate-y-0" />
          <span className="relative">Hubungi kami</span>
          <span aria-hidden className="relative transition-transform duration-500 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  );
}

function SwipeRow({ photos }: { photos: Foto[] }) {
  return (
    <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-[14vh] [-ms-overflow-style:none] [scrollbar-width:none] md:px-10 [&::-webkit-scrollbar]:hidden">
      {layanan.map((s, i) => (
        <article key={s.judul} className="w-[78vw] shrink-0 snap-center">
          <div className="relative overflow-hidden rounded-2xl ring-1 ring-gold/25">
            <div className="relative aspect-[4/5]">
              {photos[i] && (
                <Image src={photos[i].src} alt={photos[i].alt} fill sizes="78vw" className="object-cover" />
              )}
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(12,11,8,0.5))]" />
            </div>
            <span aria-hidden className="absolute left-4 top-3 font-display text-[52px] font-light leading-none text-transparent [-webkit-text-stroke:1px_rgba(216,184,118,0.6)]">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <h3 className="mt-4 font-display text-[24px] font-light leading-[1.1] text-gold-soft">{s.judul}</h3>
          <p className="mt-2 text-[13.5px] leading-[1.7] text-paper/70">{s.deskripsi}</p>
          <a
            href={company.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gold-soft"
          >
            Tanya layanan ini <span aria-hidden>→</span>
          </a>
        </article>
      ))}
    </div>
  );
}
