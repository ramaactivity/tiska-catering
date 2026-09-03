/**
 * Token form bertanda tangan untuk form publik pertama di situs ini.
 *
 * Dua lapis, tanpa dependency dan tanpa layanan pihak ketiga:
 *  1. Token diterbitkan saat halaman dirender, memuat cap waktu + HMAC.
 *     POST yang di-replay langsung ke endpoint server action tanpa membuka
 *     halaman tidak punya token sah.
 *  2. Lantai umur 3 detik. Bot mengisi dan mengirim seketika; manusia tidak.
 *
 * Memakai ADMIN_SESSION_SECRET yang sudah ada — tidak menambah env baru.
 */

import "server-only";
import { createHmac, timingSafeEqual } from "crypto";

const isProd = process.env.NODE_ENV === "production";
const UMUR_MIN_MS = 3_000;
const UMUR_MAKS_MS = 6 * 60 * 60 * 1000; // 6 jam

function secret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    (isProd ? "" : "dev-secret-jangan-dipakai-di-produksi")
  );
}

function tandaTangan(nilai: string): string {
  return createHmac("sha256", secret()).update(nilai).digest("hex");
}

function samaAman(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export function terbitkanToken(): string {
  const t = String(Date.now());
  return `${t}.${tandaTangan(t)}`;
}

export function tokenSah(raw: string): boolean {
  if (!secret()) return false;
  const titik = String(raw || "").indexOf(".");
  if (titik === -1) return false;
  const t = raw.slice(0, titik);
  const sig = raw.slice(titik + 1);
  if (!t || !sig || !samaAman(sig, tandaTangan(t))) return false;
  const umur = Date.now() - Number(t);
  return umur >= UMUR_MIN_MS && umur <= UMUR_MAKS_MS;
}

/**
 * Nama medan jebakan. Terdengar masuk akal supaya bot pengisi-semua-kolom
 * ikut mengisinya; disembunyikan lewat posisi, bukan display:none — sebagian
 * bot melewati medan yang jelas-jelas tersembunyi.
 * Nilainya diekspor ulang dari antispam.client.ts agar form klien bisa
 * memakainya tanpa menarik modul server-only ini.
 */
export { HONEYPOT } from "./antispam.client";
