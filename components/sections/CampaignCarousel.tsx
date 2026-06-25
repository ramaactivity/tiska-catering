"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { NAV_LOGO } from "@/lib/logos-base64";
import type { Banner } from "@/lib/banners/types";

const ROTATE_MS = 6000;
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Hero/Campaign Carousel beranda — banner landscape sinematik dalam kontainer
 * rounded (selaras bahasa visual Tiska). Crossfade + Ken Burns pelan, autoplay
 * yang pause saat hover/interaksi, dots ber-progress, panah (desktop), swipe
 * (sentuh). Reduced-motion: statis tanpa autoplay.
 */
export default function CampaignCarousel({ banners }: { banners: Banner[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [docHidden, setDocHidden] = useState(false);
  const startX = useRef<number | null>(null);

  const n = banners.length;
  // Autoplay jalan begitu termuat; cukup berhenti saat hover/swipe atau tab disembunyikan.
  const autoplay = !paused && !docHidden && !reduce && n > 1;

  useEffect(() => {
    const onVis = () => setDocHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(() => setActive((a) => (a + 1) % n), ROTATE_MS);
    return () => clearInterval(t);
  }, [autoplay, n, active]);

  if (n === 0) return null;

  const go = (i: number) => setActive((i + n) % n);
  const cur = banners[active];

  // swipe sentuh
  const onDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
  };
  const onUp = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
    startX.current = null;
  };

  return (
    <section className="bg-ink px-5 py-[11vh] md:px-10">
      <div
        className="group relative mx-auto aspect-[4/5] w-full max-w-[1280px] touch-pan-y overflow-hidden rounded-2xl sm:aspect-[16/10] lg:aspect-[21/9]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onPointerDown={onDown}
        onPointerUp={onUp}
        aria-roledescription="carousel"
      >
        {/* Lapisan gambar — crossfade + Ken Burns */}
        {banners.map((b, i) => {
          const isActive = i === active;
          return (
            <motion.div
              key={b.id}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                // blur menyamarkan tumpang-tindih dua gambar saat crossfade
                filter: reduce ? "none" : isActive ? "blur(0px)" : "blur(7px)",
              }}
              transition={{
                opacity: { duration: 1.1, ease: EASE },
                filter: { duration: 1.1, ease: EASE },
              }}
              className="absolute inset-0"
            >
              {/* Ken Burns di layer terpisah — initial sendiri agar zoom main sejak mount */}
              <motion.div
                className="absolute inset-0 will-change-transform"
                initial={reduce ? false : { scale: 1.05 }}
                animate={{ scale: reduce ? 1 : isActive ? 1.12 : 1.05 }}
                transition={{ duration: ROTATE_MS / 1000 + 2, ease: "linear" }}
              >
                <Image
                  src={b.imageUrl}
                  alt={b.imageAlt}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1280px) 1280px, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          );
        })}

        {/* Scrim untuk keterbacaan teks */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,11,8,0.88)_0%,rgba(12,11,8,0.45)_42%,transparent_68%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(0deg,rgba(12,11,8,0.7),transparent_42%)]"
        />

        {/* Logo Tiska — pojok kiri atas, di atas eyebrow & judul slide.
            Sisi kiri sudah digelapkan scrim teks, jadi logo selalu terbaca. */}
        <img
          src={NAV_LOGO}
          alt="Tiska Catering"
          aria-hidden
          className="pointer-events-none absolute left-6 top-5 z-10 h-9 w-auto [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.5))] md:left-12 md:top-7 md:h-11"
        />

        {/* Teks per slide */}
        <div className="absolute inset-0 flex items-center">
          <motion.div
            key={`txt-${active}`}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="max-w-[88%] px-6 sm:max-w-[60%] md:px-12 lg:max-w-[52%]"
          >
            {cur.label && (
              <p className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-gold-soft md:mb-4">
                <span aria-hidden className="h-px w-8 bg-gold" />
                {cur.label}
              </p>
            )}
            <h2 className="font-display text-[clamp(28px,4.6vw,60px)] font-light leading-[1.02] tracking-[-0.02em] text-paper">
              {cur.judul}
            </h2>
            {cur.subjudul && (
              <p className="mt-3 max-w-[460px] text-[clamp(13px,1.5vw,16px)] leading-[1.7] text-paper/80 md:mt-4">
                {cur.subjudul}
              </p>
            )}
            {cur.ctaLabel && cur.ctaHref && (
              <div className="mt-6 md:mt-7">
                <Cta href={cur.ctaHref} label={cur.ctaLabel} />
              </div>
            )}
          </motion.div>
        </div>

        {/* Panah (desktop) — dikelompokkan di pojok kanan bawah, jauh dari teks */}
        {n > 1 && (
          <div className="absolute bottom-5 right-6 hidden items-center gap-2 md:flex md:bottom-7 md:right-12">
            <Arrow dir="prev" onClick={() => go(active - 1)} />
            <Arrow dir="next" onClick={() => go(active + 1)} />
          </div>
        )}

        {/* Dots + progress */}
        {n > 1 && (
          <div className="absolute bottom-5 left-6 flex items-center gap-2 md:bottom-7 md:left-12">
            {banners.map((b, i) => {
              const isActive = i === active;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Tampilkan banner ${i + 1}`}
                  aria-current={isActive}
                  className="flex h-6 items-center"
                >
                  <span
                    className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-500 ${
                      isActive ? "w-9 bg-paper/25" : "w-1.5 bg-paper/40 hover:bg-paper/70"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        key={`prog-${active}`}
                        aria-hidden
                        className="absolute inset-y-0 left-0 origin-left rounded-full bg-gold-soft"
                        initial={{ scaleX: autoplay ? 0 : 1, width: "100%" }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: autoplay ? ROTATE_MS / 1000 : 0, ease: "linear" }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function Cta({ href, label }: { href: string; label: string }) {
  const external = /^https?:\/\//i.test(href);
  const cls =
    "group/cta relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-gold/70 px-7 py-3 text-[12px] font-normal uppercase tracking-[0.18em] text-gold-soft transition-colors duration-500 hover:text-ink active:scale-[0.98]";
  const inner = (
    <>
      <span aria-hidden className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-out group-hover/cta:translate-y-0" />
      <span className="relative">{label}</span>
      <span aria-hidden className="relative transition-transform duration-500 group-hover/cta:translate-x-1">→</span>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

function Arrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Sebelumnya" : "Berikutnya"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/25 bg-ink/40 text-paper/80 backdrop-blur-sm transition-[color,border-color,transform] duration-200 hover:border-gold/60 hover:text-gold-bright active:scale-90"
    >
      {/* Chevron simetris terhadap pusat (12,12) → presisi di tengah lingkaran */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {dir === "prev" ? <path d="M15 5l-6 7 6 7" /> : <path d="M9 5l6 7-6 7" />}
      </svg>
    </button>
  );
}
