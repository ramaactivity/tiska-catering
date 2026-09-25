"use client";

import { t, type Lang } from "@/lib/i18n";
import { useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type GalleryPhoto = {
  src: string;
  alt: string;
  kategori: string;
  judul?: string;
};

/**
 * Lightbox foto reusable: overlay fullscreen, navigasi prev/next + keyboard,
 * tutup via Esc / klik latar. Dipakai galeri beranda & /galeri.
 */
export default function Lightbox({
  items,
  index,
  onClose,
  onIndex,
  lang = "id",
}: {
  items: GalleryPhoto[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
  lang?: Lang;
}) {
  const { ui } = t(lang);
  const open = index !== null;

  const go = useCallback(
    (dir: number) => {
      if (index === null) return;
      onIndex((index + dir + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go, onClose]);

  const cur = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {open && cur && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/92 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={ui.pratinjauFoto}
        >
          <CircleButton label={ui.tutup} className="right-5 top-5" onClick={onClose}>
            ✕
          </CircleButton>
          <CircleButton
            label={ui.sebelumnya}
            className="left-4 top-1/2 -translate-y-1/2 sm:left-7"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
          >
            ‹
          </CircleButton>
          <CircleButton
            label={ui.berikutnya}
            className="right-4 top-1/2 -translate-y-1/2 sm:right-7"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
          >
            ›
          </CircleButton>

          <motion.figure
            key={cur.src}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[86vh] w-full max-w-[1100px] flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- dimensi foto bervariasi, butuh object-contain */}
            <img
              src={cur.src}
              alt={cur.alt}
              className="max-h-[78vh] w-auto rounded-lg object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
            />
            <figcaption className="mt-5 text-center">
              <span className="text-[10.5px] uppercase tracking-[0.28em] text-gold-soft">
                {cur.kategori}
              </span>
              <span className="mt-1.5 block text-[13.5px] text-paper/70">
                {cur.judul ?? cur.alt}
              </span>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CircleButton({
  children,
  label,
  className,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  className: string;
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`absolute z-10 grid size-11 place-items-center rounded-full border border-paper/25 bg-ink/40 text-[18px] text-paper/90 backdrop-blur-md transition-colors duration-300 hover:border-gold/70 hover:text-gold-soft active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}
