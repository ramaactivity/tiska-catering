"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { layanan, layananHeader, company } from "@/lib/content";
import { images } from "@/lib/images";
import WordReveal from "@/components/motion/WordReveal";
import Reveal from "@/components/motion/Reveal";

type Foto = { src: string; alt: string };
const EASE = "cubic-bezier(0.16,1,0.3,1)";

/**
 * Layanan: pinned horizontal scroll (docs/04 #5).
 * Desktop: GSAP ScrollTrigger pin + scrub — frame-perfect & sinkron Lenis (mulus).
 * Mobile / reduced-motion: swipe horizontal native (snap).
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
      <div className="mx-auto max-w-[1280px] px-6 pb-[6vh] pt-[16vh] md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <h2 className="font-display text-[clamp(34px,5.5vw,90px)] font-light leading-[0.92] tracking-[-0.025em] text-paper">
            <WordReveal segments={layananHeader.judul} />
          </h2>
          <Reveal delay={0.15}>
            <p className="max-w-[360px] text-[14px] leading-[1.7] text-[#9a9282]">
              {layananHeader.deskripsi}
              <span className="mt-2 block text-[11px] uppercase tracking-[0.22em] text-gold-soft/70">
                {pinned ? "Scroll untuk menjelajah →" : "Geser untuk menjelajah →"}
              </span>
            </p>
          </Reveal>
        </div>
      </div>

      {pinned ? <PinnedRow photos={photos} /> : <SwipeRow photos={photos} />}
    </section>
  );
}

function PinnedRow({ photos }: { photos: Foto[] }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const row = rowRef.current;
    const outer = outerRef.current;
    if (!row || !outer) return;

    gsap.registerPlugin(ScrollTrigger);
    const measure = () => Math.max(0, row.scrollWidth - window.innerWidth);
    setTravel(measure());

    // Pin = CSS sticky (handoff vertikal→horizontal mulus, tanpa switch posisi).
    // GSAP hanya menggerakkan geser horizontal (scrub, sinkron Lenis → frame-perfect).
    const ctx = gsap.context(() => {
      gsap.to(row, {
        x: () => -measure(),
        ease: "none",
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, outer);

    const onResize = () => {
      setTravel(measure());
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={outerRef} style={{ height: `calc(100vh + ${travel}px)` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-screen items-center">
          <div ref={rowRef} className="flex gap-6 px-6 will-change-transform md:px-10">
            {layanan.map((s, i) => (
              <ServiceCard key={s.judul} i={i} judul={s.judul} deskripsi={s.deskripsi} photo={photos[i]} />
            ))}
            <EndCard />
          </div>
        </div>
      </div>
    </div>
  );
}

function SwipeRow({ photos }: { photos: Foto[] }) {
  return (
    <div className="mt-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-[14vh] [-ms-overflow-style:none] [scrollbar-width:none] md:px-10 [&::-webkit-scrollbar]:hidden">
      {layanan.map((s, i) => (
        <ServiceCard key={s.judul} i={i} judul={s.judul} deskripsi={s.deskripsi} photo={photos[i]} mobile />
      ))}
      <EndCard mobile />
    </div>
  );
}

function ServiceCard({
  i,
  judul,
  deskripsi,
  photo,
  mobile,
}: {
  i: number;
  judul: string;
  deskripsi: string;
  photo?: Foto;
  mobile?: boolean;
}) {
  return (
    <article
      className={`group relative shrink-0 snap-center overflow-hidden rounded-2xl ${
        mobile ? "h-[64vh] w-[80vw]" : "h-[72vh] w-[clamp(360px,42vw,560px)]"
      }`}
    >
      {photo && (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={mobile ? "80vw" : "50vw"}
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
          Tanya layanan ini
          <span aria-hidden className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
        </a>
      </div>
    </article>
  );
}

function EndCard({ mobile }: { mobile?: boolean }) {
  return (
    <article
      className={`flex shrink-0 snap-center flex-col justify-center rounded-2xl border border-line bg-ink-2 px-8 ${
        mobile ? "h-[64vh] w-[80vw]" : "h-[72vh] w-[clamp(300px,30vw,420px)]"
      }`}
    >
      <p className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-gold-soft">
        <span aria-hidden className="h-px w-8 bg-gold" />
        Acara lain?
      </p>
      <h3 className="font-display text-[clamp(26px,2.4vw,38px)] font-light leading-[1.08] text-paper">
        Setiap perayaan punya kebutuhannya sendiri.
      </h3>
      <p className="mt-3 max-w-[320px] text-[14px] leading-[1.8] text-paper/65">
        Ceritakan acara Anda, kami rancang layanan yang paling pas.
      </p>
      <a
        href={company.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative mt-7 inline-flex w-fit items-center gap-2.5 overflow-hidden rounded-full border border-gold/70 px-7 py-3 text-[12px] uppercase tracking-[0.18em] text-gold-soft transition-colors duration-500 hover:text-ink active:scale-[0.98]"
      >
        <span aria-hidden className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-out group-hover:translate-y-0" />
        <span className="relative">Hubungi kami</span>
        <span aria-hidden className="relative transition-transform duration-500 group-hover:translate-x-1">→</span>
      </a>
    </article>
  );
}
