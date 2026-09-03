"use client";

import { useEffect, useRef, useState } from "react";
import QrScannerLib from "qr-scanner";
import { checkinCopy } from "@/lib/opentable/content";

/**
 * Pemindai QR kamera.
 *
 * Memakai qr-scanner (nimiq) yang membawa dekoder sendiri di Web Worker —
 * bukan BarcodeDetector bawaan browser, yang belum ada di Safari iOS, padahal
 * iPhone-lah yang akan dipegang petugas pintu. Dimuat lewat next/dynamic
 * (ssr:false) hanya di halaman ini, jadi tidak menyentuh bundel publik.
 */
export default function QrScanner({ onKode }: { onKode: (kode: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    let scanner: QrScannerLib | null = null;
    let batal = false;

    scanner = new QrScannerLib(
      el,
      (hasil) => {
        const teks = hasil?.data ?? "";
        // QR berisi URL tiket penuh; ambil segmen terakhirnya.
        const kode = teks.split("?")[0].split("/").filter(Boolean).pop() ?? "";
        if (kode) onKode(kode);
      },
      { preferredCamera: "environment", highlightScanRegion: true, maxScansPerSecond: 4 },
    );

    scanner.start().catch(() => {
      if (!batal) setError(true);
    });

    return () => {
      batal = true;
      scanner?.stop();
      scanner?.destroy();
    };
  }, [onKode]);

  async function dariFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const hasil = await QrScannerLib.scanImage(file, { returnDetailedScanResult: true });
      const kode = hasil.data.split("?")[0].split("/").filter(Boolean).pop() ?? "";
      if (kode) onKode(kode);
    } catch {
      setError(true);
    } finally {
      e.target.value = "";
    }
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl border border-ad-border bg-black">
        <video ref={videoRef} playsInline muted className="block aspect-square w-full object-cover" />
      </div>
      {error && <p className="mt-3 text-[13px] leading-[1.6] text-ad-danger">{checkinCopy.izinKamera}</p>}
      <label className="mt-3 inline-flex cursor-pointer items-center rounded-xl border border-ad-border px-3.5 py-2 text-[12.5px] text-ad-muted transition-colors hover:border-ad-accent hover:text-ad-accent">
        {checkinCopy.tombolFoto}
        <input type="file" accept="image/*" capture="environment" onChange={dariFoto} className="sr-only" />
      </label>
    </div>
  );
}
