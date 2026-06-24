"use client";

import { useRef } from "react";
import Image from "next/image";
import type { GalleryPhoto } from "@/components/gallery/Lightbox";

/**
 * Rail horizontal foto acara — gaya Netflix:
 * - hover sebuah kartu → membesar & naik di atas tetangga (yang meredup)
 * - klik → buka lightbox (onOpen)
 * - panah ‹ › untuk geser; di mobile bisa di-swipe
 */
export default function EventRail({
  items,
  onOpen,
  onActive,
}: {
  items: (GalleryPhoto & { gi?: number })[];
  onOpen: (i: number) => void;
  onActive?: (i: number) => void;
}) {
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="group/rail relative -mx-1">
      <Arrow side="left" onClick={() => scroll(-1)} />
      <Arrow side="right" onClick={() => scroll(1)} />

      <div
        ref={scroller}
        className="flex snap-x gap-3 overflow-x-auto px-1 py-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((it, i) => (
          <button
            key={`${it.src}-${i}`}
            type="button"
            onClick={() => onOpen(i)}
            onMouseEnter={() => onActive?.(i)}
            onFocus={() => onActive?.(i)}
            className="group/card relative aspect-[4/3] w-[260px] shrink-0 snap-start overflow-hidden rounded-xl ring-1 ring-line transition-[transform,opacity,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform first:origin-left last:origin-right hover:z-30 hover:scale-[1.14] hover:opacity-100 hover:shadow-[0_30px_60px_-18px_rgba(0,0,0,0.8)] hover:ring-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 sm:w-[300px] lg:group-hover/rail:opacity-55"
          >
            <Image
              src={it.src}
              alt={it.alt}
              fill
              sizes="300px"
              className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
            />
            {/* gradien bawah agar caption terbaca */}
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(14,13,10,0.82))]"
            />
            {/* caption */}
            <div className="absolute inset-x-0 bottom-0 p-4 text-left">
              <p className="text-[9px] uppercase tracking-[0.26em] text-gold-soft">
                {it.kategori}
              </p>
              <p className="mt-1 line-clamp-1 translate-y-1 text-[12.5px] leading-snug text-paper/0 transition-all duration-500 group-hover/card:translate-y-0 group-hover/card:text-paper/85">
                {it.judul ?? it.alt}
              </p>
            </div>
            {/* ikon perbesar */}
            <span
              aria-hidden
              className="absolute right-3 top-3 grid size-7 place-items-center rounded-full border border-paper/30 bg-ink/40 text-[12px] text-paper/85 opacity-0 backdrop-blur-sm transition-opacity duration-400 group-hover/card:opacity-100"
            >
              ⤢
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Arrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={side === "left" ? "Geser kiri" : "Geser kanan"}
      onClick={onClick}
      className={`absolute top-1/2 z-40 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-paper/20 bg-ink/55 text-[18px] text-paper/90 opacity-0 backdrop-blur-md transition-all duration-300 hover:border-gold/70 hover:text-gold-soft group-hover/rail:opacity-100 md:grid ${
        side === "left" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"
      }`}
    >
      {side === "left" ? "‹" : "›"}
    </button>
  );
}
