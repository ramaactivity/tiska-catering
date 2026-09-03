/**
 * QR e-tiket. Dirender di server sebagai SVG inline — nol byte JavaScript di
 * sisi klien, tajam saat dicetak maupun di-screenshot, dan jauh lebih tahan
 * kompresi WhatsApp dibanding QR raster.
 */

import "server-only";
import { renderSVG } from "uqr";
import { tautanTiket } from "./config";

/**
 * Isi QR adalah URL tiket penuh, bukan kodenya saja: tamu yang memindai
 * tiketnya sendiri dengan kamera bawaan HP mendarat di halaman tiketnya.
 */
export function qrTiket(kode: string): string {
  return renderSVG(tautanTiket(kode), {
    border: 1,
    ecc: "M",
    blackColor: "#0e0d0a",
    whiteColor: "#f6f1e7",
  });
}
