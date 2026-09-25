"use client";

import { t, type Lang } from "@/lib/i18n";
import { useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import type { GalleryPhoto } from "@/components/gallery/Lightbox";

type Item = GalleryPhoto & { gi?: number };

/**
 * Rail foto acara.
 * - `marquee`: berjalan horizontal tanpa henti (infinite loop); berhenti saat
 *   di-hover. Dipakai di beranda.
 * - default: native scroll + panah ‹ ›. Dipakai di /galeri (per kategori).
 *
 * Hover kartu = gambar zoom + kartu terangkat (footprint tetap, tidak menimpa
 * tetangga). Klik = lightbox.
 */
export default function EventRail({
  items,
  onOpen,
  marquee = false,
  lang = "id",
}: {
  items: Item[];
  onOpen: (i: number) => void;
  marquee?: boolean;
  lang?: Lang;
}) {
  const { ui } = t(lang);
  const scroller = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const scrollBy = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  // ── Mode marquee (beranda) — nonaktif bila reduced-motion ──
  if (marquee && !reduce) {
    const loop = [...items, ...items];
    return (
      <div className="group/rail relative overflow-hidden [-webkit-mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)] [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]">
        <div className="gallery-marquee flex w-max gap-3 py-10 group-hover/rail:[animation-play-state:paused]">
          {loop.map((it, i) => (
            <RailCard key={i} it={it} onClick={() => onOpen(i % items.length)} />
          ))}
        </div>
      </div>
    );
  }

  // ── Mode native scroll + panah ──
  return (
    <div className="group/rail relative -mx-1">
      <Arrow side="left" onClick={() => scrollBy(-1)} label={ui.geserKiri} />
      <Arrow side="right" onClick={() => scrollBy(1)} label={ui.geserKanan} />
      <div
        ref={scroller}
        className="flex snap-x gap-3 overflow-x-auto px-1 py-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((it, i) => (
          <div key={`${it.src}-${i}`} className="snap-start">
            <RailCard it={it} onClick={() => onOpen(i)} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* Kartu — footprint tetap saat hover (tak menimpa tetangga): gambar zoom + angkat */
function RailCard({ it, onClick }: { it: Item; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group/card relative aspect-[4/3] w-[200px] shrink-0 overflow-hidden rounded-lg ring-1 ring-line transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:-translate-y-1.5 hover:shadow-[0_20px_44px_-16px_rgba(0,0,0,0.85)] hover:ring-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 sm:w-[224px]"
    >
      <Image
        src={it.src}
        alt={it.alt}
        fill
        sizes="240px"
        className="object-cover transition-transform duration-[900ms] ease-out group-hover/card:scale-110"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_22%,rgba(14,13,10,0.5)_58%,rgba(14,13,10,0.94))]"
      />
      <div className="absolute inset-x-0 bottom-0 p-3.5 text-left">
        <p className="text-[9px] uppercase tracking-[0.22em] text-gold-soft">
          {it.kategori}
        </p>
        <p className="mt-1 line-clamp-2 text-[12.5px] font-light leading-snug text-paper drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
          {it.judul ?? it.alt}
        </p>
      </div>
      <span
        aria-hidden
        className="absolute right-2.5 top-2.5 grid size-6 place-items-center rounded-full border border-paper/30 bg-ink/40 text-[11px] text-paper/85 opacity-0 backdrop-blur-sm transition-opacity duration-400 group-hover/card:opacity-100"
      >
        ⤢
      </span>
    </button>
  );
}

function Arrow({ side, onClick, label }: { side: "left" | "right"; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`absolute top-1/2 z-40 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-paper/20 bg-ink/55 text-[18px] text-paper/90 opacity-0 backdrop-blur-md transition-all duration-300 hover:border-gold/70 hover:text-gold-soft group-hover/rail:opacity-100 md:grid ${
        side === "left" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"
      }`}
    >
      {side === "left" ? "‹" : "›"}
    </button>
  );
}
