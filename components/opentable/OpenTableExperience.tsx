"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { lockScroll, unlockScroll } from "@/lib/lenis-lock";
import { useMotionProfile } from "@/components/motion/useMotionProfile";
import Cover from "./Cover";
import MusicToggle, { type MusikKendali } from "./MusicToggle";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Orkestrator undangan: sampul terkunci ↔ isi undangan.
 *
 * Isi undangan dioper sebagai `children` (server component) dan baru dipasang
 * setelah sampul dibuka — jadi tidak ada observer scroll berjalan di belakang
 * sampul dan foto di bawah lipatan belum diunduh sebelum tamu memutuskan masuk.
 */
export default function OpenTableExperience({
  nama,
  kode,
  fotoSampul,
  children,
}: {
  nama: string;
  kode: string;
  fotoSampul: { src: string; alt: string };
  children: React.ReactNode;
}) {
  const [terbuka, setTerbuka] = useState(false);
  const musik = useRef<MusikKendali | null>(null);
  const { reduce } = useMotionProfile();

  useEffect(() => {
    lockScroll();
    return () => unlockScroll();
  }, []);

  function buka() {
    // 1) Sinkron di dalam gesture — iOS mencabut izin autoplay bila play()
    //    dipanggil setelah await/microtask.
    musik.current?.mulai();
    // 2) Baru sisanya.
    window.scrollTo(0, 0);
    setTerbuka(true);
    if (kode) {
      try {
        navigator.sendBeacon?.(
          "/api/open-table/track",
          new Blob([JSON.stringify({ kode })], { type: "application/json" }),
        );
      } catch {
        /* pelacakan bersifat sekadar-kirim; kegagalannya tidak penting */
      }
    }
  }

  return (
    <>
      <MusicToggle kendali={musik} aktifkanAutoplay={!reduce} />

      <AnimatePresence onExitComplete={unlockScroll}>
        {!terbuka && (
          <motion.div
            key="sampul"
            exit={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, scale: 1.06, filter: "blur(10px)" }
            }
            transition={{ duration: reduce ? 0.2 : 1.1, ease: EASE }}
          >
            <Cover nama={nama} foto={fotoSampul} onBuka={buka} />
          </motion.div>
        )}
      </AnimatePresence>

      {terbuka && (
        <motion.main
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: reduce ? 0 : 0.35, ease: EASE }}
        >
          {children}
        </motion.main>
      )}
    </>
  );
}
