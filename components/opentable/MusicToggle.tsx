"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { MUSIK_SRC, MUSIK_VOLUME } from "@/lib/opentable/config";

const KUNCI = "ot-musik-mati";

export type MusikKendali = { mulai: () => void };

/**
 * Musik latar dengan tombol bisu yang selalu terlihat.
 *
 * `mulai()` HARUS dipanggil sinkron di dalam gesture klik — iOS mencabut izin
 * autoplay bila play() dijalankan setelah await/microtask. Karena itu kendali
 * dioper lewat ref, bukan lewat state/effect.
 */
export default function MusicToggle({
  kendali,
  aktifkanAutoplay,
}: {
  kendali: React.MutableRefObject<MusikKendali | null>;
  aktifkanAutoplay: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [main, setMain] = useState(false);

  useEffect(() => {
    kendali.current = {
      mulai() {
        const a = audioRef.current;
        if (!a || !aktifkanAutoplay) return;
        try {
          if (sessionStorage.getItem(KUNCI) === "1") return;
        } catch {
          /* storage diblokir — lanjutkan saja */
        }
        a.volume = 0;
        a.play()
          .then(() => {
            setMain(true);
            animate(0, MUSIK_VOLUME, {
              duration: 1.5,
              onUpdate: (v) => {
                if (audioRef.current) audioRef.current.volume = v;
              },
            });
          })
          .catch(() => setMain(false));
      },
    };
    return () => {
      kendali.current = null;
    };
  }, [kendali, aktifkanAutoplay]);

  // Jangan pernah tinggalkan audio misterius dari tab yang tidak terlihat.
  useEffect(() => {
    function onVisibility() {
      const a = audioRef.current;
      if (!a) return;
      if (document.hidden) a.pause();
      else if (main) void a.play().catch(() => {});
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [main]);

  if (!MUSIK_SRC) return null;

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (main) {
      a.pause();
      setMain(false);
      try {
        sessionStorage.setItem(KUNCI, "1");
      } catch {
        /* abaikan */
      }
    } else {
      a.volume = MUSIK_VOLUME;
      void a.play().then(() => setMain(true)).catch(() => {});
      try {
        sessionStorage.removeItem(KUNCI);
      } catch {
        /* abaikan */
      }
    }
  }

  return (
    <>
      <audio ref={audioRef} src={MUSIK_SRC} loop preload="none" playsInline />
      <button
        type="button"
        onClick={toggle}
        aria-label={main ? "Matikan musik" : "Nyalakan musik"}
        aria-pressed={main}
        className="fixed bottom-5 right-5 z-50 flex size-11 items-center justify-center rounded-full border border-gold/40 bg-ink/75 backdrop-blur-md transition-colors hover:border-gold/80"
      >
        <span aria-hidden className="flex items-end gap-[3px]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`w-[2.5px] rounded-full bg-gold-soft ${main ? "ot-eq" : ""}`}
              style={{ height: main ? 14 : 7, animationDelay: `${i * 0.16}s` }}
            />
          ))}
        </span>
      </button>
    </>
  );
}
