"use client";

import Link from "next/link";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { company } from "@/lib/content";
import { t, type Lang } from "@/lib/i18n";
import { images } from "@/lib/images";
import WordReveal from "@/components/motion/WordReveal";
import Reveal from "@/components/motion/Reveal";

type Foto = { src: string; alt: string };
const EASE = "cubic-bezier(0.16,1,0.3,1)";

type Ui = ReturnType<typeof t>["ui"];

/**
 * Layanan: carousel horizontal dengan tombol panah (docs/04 #5).
 * Digeser via panah / trackpad / sentuh — snap rapi, tanpa scroll-jacking
 * (dulu pinned GSAP; diganti agar mulus & andal, mudah dipakai).
 */
export default function Layanan({ photos = images.layanan, lang = "id" }: { photos?: Foto[]; lang?: Lang }) {
  const { layanan, layananHeader, ui } = t(lang);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const gap = 24; // gap-6
    const step = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="layanan" className="bg-ink pb-14 md:pb-[10vh]">
      <div className="mx-auto max-w-[1280px] px-6 pb-8 pt-20 md:px-10 md:pt-[16vh]">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <h2 className="font-display text-[clamp(34px,5.5vw,90px)] font-light leading-[0.92] tracking-[-0.025em] text-paper">
            <WordReveal segments={layananHeader.judul} />
          </h2>
          <Reveal delay={0.15}>
            <p className="max-w-[360px] text-[14px] leading-[1.7] text-[#9a9282]">
              {layananHeader.deskripsi}
              <span className="mt-2 block text-[11px] uppercase tracking-[0.22em] text-gold-soft/70">
                {ui.layananGeser}
              </span>
              <Link
                href={layananHeader.semua.href}
                className="mt-5 inline-block border-b border-gold-soft pb-1 text-[12px] uppercase tracking-[0.14em] text-gold-soft transition-colors hover:text-paper"
              >
                {layananHeader.semua.label} →
              </Link>
            </p>
          </Reveal>
        </div>
      </div>

      <div className="relative">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-pl-6 px-6 scroll-smooth md:scroll-pl-10 md:px-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {layanan.map((s, i) => (
            <ServiceCard key={s.judul} i={i} judul={s.judul} deskripsi={s.deskripsi} photo={photos[i]} ui={ui} />
          ))}
          <EndCard ui={ui} />
        </div>

        <Arrow dir="prev" onClick={() => nudge(-1)} show={canPrev} ui={ui} />
        <Arrow dir="next" onClick={() => nudge(1)} show={canNext} ui={ui} />
      </div>
    </section>
  );
}

function Arrow({ dir, onClick, show, ui }: { dir: "prev" | "next"; onClick: () => void; show: boolean; ui: Ui }) {
  const isNext = dir === "next";
  return (
    <button
      type="button"
      aria-label={isNext ? ui.layananBerikut : ui.layananSebelum}
      onClick={onClick}
      className={`absolute top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-ink/70 text-gold-soft backdrop-blur-sm transition-all duration-300 hover:border-gold hover:bg-ink/90 hover:text-gold-bright active:scale-95 md:flex ${
        isNext ? "right-4 lg:right-8" : "left-4 lg:left-8"
      } ${show ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {isNext ? <path d="M9 6l6 6-6 6" /> : <path d="M15 6l-6 6 6 6" />}
      </svg>
    </button>
  );
}

function ServiceCard({
  i,
  judul,
  deskripsi,
  photo,
  ui,
}: {
  i: number;
  judul: string;
  deskripsi: string;
  photo?: Foto;
  ui: Ui;
}) {
  return (
    <article
      data-card
      className="group relative h-[62vh] w-[82vw] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[60vw] md:h-[72vh] md:w-[clamp(360px,42vw,560px)]"
    >
      {photo && (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 768px) 50vw, 82vw"
          className="object-cover transition-transform duration-[1200ms] will-change-transform group-hover:scale-[1.05]"
          style={{ transitionTimingFunction: EASE }}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,11,8,0.45)_0%,transparent_28%,rgba(12,11,8,0.9)_88%)]"
      />
      <span
        aria-hidden
        className="absolute left-6 top-5 font-display text-[clamp(40px,4.6vw,62px)] font-light leading-none text-transparent [-webkit-text-stroke:1px_rgba(216,184,118,0.65)]"
      >
        {String(i + 1).padStart(2, "0")}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
        <h3 className="font-display text-[clamp(24px,2.3vw,34px)] font-light leading-[1.06] text-paper">
          {judul}
        </h3>
        <p className="mt-2.5 max-w-[360px] text-[13.5px] leading-[1.7] text-paper/75">
          {deskripsi}
        </p>
        <a
          href={company.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group/cta mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gold-soft transition-colors hover:text-gold-bright"
        >
          {ui.layananTanya}
          <span aria-hidden className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
        </a>
      </div>
    </article>
  );
}

function EndCard({ ui }: { ui: Ui }) {
  return (
    <article
      data-card
      className="flex h-[62vh] w-[82vw] shrink-0 snap-start flex-col justify-center rounded-2xl border border-line bg-ink-2 px-8 sm:w-[60vw] md:h-[72vh] md:w-[clamp(300px,30vw,420px)]"
    >
      <p className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-gold-soft">
        <span aria-hidden className="h-px w-8 bg-gold" />
        {ui.layananEndEyebrow}
      </p>
      <h3 className="font-display text-[clamp(26px,2.4vw,38px)] font-light leading-[1.08] text-paper">
        {ui.layananEndJudul}
      </h3>
      <p className="mt-3 max-w-[320px] text-[14px] leading-[1.8] text-paper/65">
        {ui.layananEndTeks}
      </p>
      <a
        href={company.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative mt-7 inline-flex w-fit items-center gap-2.5 overflow-hidden rounded-full border border-gold/70 px-7 py-3 text-[12px] uppercase tracking-[0.18em] text-gold-soft transition-colors duration-500 hover:text-ink active:scale-[0.98]"
      >
        <span aria-hidden className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-out group-hover:translate-y-0" />
        <span className="relative">{ui.layananEndCta}</span>
        <span aria-hidden className="relative transition-transform duration-500 group-hover:translate-x-1">→</span>
      </a>
    </article>
  );
}
