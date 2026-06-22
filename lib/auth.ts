/**
 * Sesi admin sederhana untuk backoffice /admin.
 * Cookie httpOnly bertanda-tangan HMAC — tanpa database/layanan luar.
 *
 * Produksi WAJIB set env:
 *   ADMIN_PASSWORD        — kata sandi login
 *   ADMIN_SESSION_SECRET  — kunci acak untuk menandatangani sesi
 * Tanpa keduanya di produksi, login selalu ditolak (aman by default).
 */

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE = "tiska_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 hari
const isProd = process.env.NODE_ENV === "production";

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET || (isProd ? "" : "dev-secret-jangan-dipakai-di-produksi");
}

function password(): string {
  return process.env.ADMIN_PASSWORD || (isProd ? "" : "tiska-dev");
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export function checkPassword(input: string): boolean {
  const pw = password();
  if (!pw) return false;
  return safeEqual(input, pw);
}

function sign(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export async function createSession(): Promise<void> {
  const exp = String(Date.now() + MAX_AGE * 1000);
  const token = `${exp}.${sign(exp)}`;
  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function verifySession(): Promise<boolean> {
  if (!secret()) return false;
  const store = await cookies();
  const raw = store.get(COOKIE)?.value;
  if (!raw) return false;
  const dot = raw.indexOf(".");
  if (dot === -1) return false;
  const exp = raw.slice(0, dot);
  const sig = raw.slice(dot + 1);
  if (!exp || !sig) return false;
  if (Number(exp) < Date.now()) return false;
  return safeEqual(sig, sign(exp));
}

/** Untuk dipakai di server component/action: lempar ke login bila belum masuk. */
export async function requireSession(): Promise<void> {
  if (!(await verifySession())) redirect("/admin/login");
}

/** Apakah env produksi sudah dikonfigurasi (untuk peringatan di UI). */
export function adminConfigured(): boolean {
  return !!(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}
