/**
 * Kode undangan/tiket + normalisasi nomor WhatsApp.
 * Di-port dari proyek Wedding Invitation (Google Apps Script) ke TypeScript.
 */

import { randomInt } from "crypto";

/**
 * 31 karakter tanpa i, l, o, 0, 1 — yang ambigu saat kode dibaca petugas di
 * pintu masuk atau dieja lewat telepon. 31^6 ≈ 887 juta kemungkinan.
 */
const ALFABET = "abcdefghjkmnpqrstuvwxyz23456789";

export function kodeBaru(panjang = 6): string {
  let out = "";
  for (let i = 0; i < panjang; i++) out += ALFABET[randomInt(ALFABET.length)];
  return out;
}

/** Bersihkan kode dari input pengguna (query param, ketikan manual di check-in). */
export function bersihkanKode(v: string): string {
  return String(v || "").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 12);
}

/**
 * 08xxx / +62xxx / 62xxx / 8xxx → 62xxx (siap dipakai wa.me).
 * Mengembalikan "" bila terlalu pendek untuk jadi nomor sungguhan.
 */
export function normalHp(input: string): string {
  let s = String(input || "").replace(/\D/g, "");
  if (!s) return "";
  if (s.startsWith("62")) {
    /* sudah benar */
  } else if (s.startsWith("0")) {
    s = "62" + s.slice(1);
  } else if (s.startsWith("8")) {
    s = "62" + s;
  }
  s = s.slice(0, 18);
  return s.length >= 10 ? s : "";
}

/** Tampilkan nomor 62xxx sebagai 0813-8310-8103 untuk dibaca manusia. */
export function tampilHp(hp: string): string {
  const s = normalHp(hp);
  if (!s) return "";
  const lokal = "0" + s.slice(2);
  return lokal.replace(/(\d{4})(\d{4})(\d+)/, "$1-$2-$3");
}

/**
 * Tautan WhatsApp dengan pesan terisi.
 * Dipakai di tiga tempat (kirim admin, konfirmasi tamu, referral) — salah
 * prefiks 62 menghasilkan tautan mati tanpa error, jadi disatukan di sini.
 */
export function waLink(hp: string, text?: string): string {
  const n = normalHp(hp);
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${n}${q}`;
}

/** Ganti {nama}, {link}, dst. di naskah pesan. Placeholder tak dikenal dibiarkan. */
export function isiNaskah(naskah: string, nilai: Record<string, string>): string {
  return naskah.replace(/\{(\w+)\}/g, (utuh, kunci: string) => nilai[kunci] ?? utuh);
}
