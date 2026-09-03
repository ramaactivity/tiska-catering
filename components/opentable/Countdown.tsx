"use client";

import { useEffect, useState } from "react";
import { ACARA_MULAI } from "@/lib/opentable/config";
import { detail } from "@/lib/opentable/content";

function pecah(selisih: number) {
  const d = Math.max(0, selisih);
  return [
    Math.floor(d / 86400000),
    Math.floor(d / 3600000) % 24,
    Math.floor(d / 60000) % 60,
    Math.floor(d / 1000) % 60,
  ];
}

/**
 * Hitung mundur ke hari-H.
 *
 * Nilai baru dihitung setelah mount. Merender Date.now() saat SSR pasti
 * menghasilkan hydration mismatch, jadi pass server menampilkan rangka kosong.
 */
export default function Countdown() {
  const [angka, setAngka] = useState<number[] | null>(null);

  useEffect(() => {
    const hitung = () => setAngka(pecah(ACARA_MULAI.getTime() - Date.now()));
    hitung();
    const id = setInterval(hitung, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
      {detail.countdownLabel.map((label, i) => (
        <div
          key={label}
          className="rounded-lg border border-line px-2 py-4 text-center sm:px-3 sm:py-5"
        >
          <p
            style={{ fontVariationSettings: "'opsz' 144" }}
            className="font-display text-[clamp(24px,5vw,38px)] font-light leading-none tabular-nums text-paper"
          >
            {angka ? String(angka[i]).padStart(2, "0") : "––"}
          </p>
          <p className="mt-2 text-[9.5px] uppercase tracking-[0.2em] text-paper/45 sm:text-[10.5px]">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
