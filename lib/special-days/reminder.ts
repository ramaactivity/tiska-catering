/**
 * Reminder email Hari Spesial via Resend (REST API — tanpa dependency).
 * - Dipicu cron harian (app/api/cron/special-days).
 * - Mengingatkan H-7, H-1, dan hari-H untuk hari spesial yang aktif.
 * - Anti-dobel: catat (id:offset) yang sudah terkirim di blob/fs.
 * - No-op aman bila RESEND_API_KEY belum diset (fitur "mati" tanpa error).
 */

import { promises as fs } from "fs";
import path from "path";
import { company } from "@/lib/content";
import { getUpcoming, daysUntil, todayJakarta } from "./store";
import { addDaysStr } from "./source";
import type { SpecialDay } from "./types";

/** Offset hari sebelum (dan tepat) hari-H yang dikirimi reminder. */
const OFFSETS = [7, 1, 0];

const SITE = "https://www.tiskacatering.com";
const SENT_KEY = "special-days/reminders-sent.json";
const SENT_FILE = path.join(process.cwd(), "data", "special-days-reminders-sent.json");

function blobEnabled(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

async function readSent(): Promise<string[]> {
  if (blobEnabled()) {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: SENT_KEY, limit: 1 });
    if (!blobs.length) return [];
    const res = await fetch(blobs[0].url, { cache: "no-store" });
    if (!res.ok) return [];
    return (await res.json()) as string[];
  }
  try {
    return JSON.parse(await fs.readFile(SENT_FILE, "utf8")) as string[];
  } catch {
    return [];
  }
}

async function writeSent(keys: string[]): Promise<void> {
  if (blobEnabled()) {
    const { put } = await import("@vercel/blob");
    await put(SENT_KEY, JSON.stringify(keys, null, 2), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 0,
    });
    return;
  }
  await fs.mkdir(path.dirname(SENT_FILE), { recursive: true });
  await fs.writeFile(SENT_FILE, JSON.stringify(keys, null, 2), "utf8");
}

function whenLabel(n: number): string {
  if (n <= 0) return "hari ini";
  if (n === 1) return "besok";
  return `${n} hari lagi`;
}

function fmtTanggal(t: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${t}T00:00:00`));
}

function emailHtml(d: SpecialDay, n: number): string {
  const when = whenLabel(n);
  const bannerUrl = `${SITE}/admin/banners/new?${new URLSearchParams({
    judul: d.nama,
    label: d.nama,
    mulai: addDaysStr(d.tanggal, -7),
    selesai: d.tanggal,
  }).toString()}`;
  return `<!doctype html><html><body style="margin:0;background:#efe7d6;padding:28px 16px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#2a2418">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
    <table role="presentation" width="100%" style="max-width:520px;background:#f6f1e7;border-radius:18px;overflow:hidden;border:1px solid #e3d9c3">
      <tr><td style="background:#0e0d0a;padding:20px 28px">
        <span style="color:#d8b876;font-size:12px;letter-spacing:.22em;text-transform:uppercase">Tiska Catering · Pengingat</span>
      </td></tr>
      <tr><td style="padding:28px">
        <p style="margin:0 0 6px;font-size:13px;color:#a07c34;letter-spacing:.04em">Hari spesial ${when}</p>
        <h1 style="margin:0 0 6px;font-size:26px;font-weight:400;color:#2a2418">${d.nama}</h1>
        <p style="margin:0 0 20px;font-size:14px;color:#6b6557">${fmtTanggal(d.tanggal)}</p>
        <p style="margin:0 0 22px;font-size:14px;line-height:1.7;color:#4a4537">
          Jangan lewatkan momentumnya. Siapkan banner & konten promo dari sekarang —
          satu klik di bawah sudah terisi judul + jadwal tayang (H-7 sampai hari-H).
        </p>
        <a href="${bannerUrl}" style="display:inline-block;background:#b8954e;color:#201706;text-decoration:none;font-weight:600;font-size:14px;padding:12px 22px;border-radius:12px">Buat banner terjadwal</a>
        <p style="margin:22px 0 0;font-size:12px;color:#9b9486">
          Atau buka <a href="${SITE}/admin/hari-spesial" style="color:#a07c34">kalender Hari Spesial</a> di backoffice.
        </p>
      </td></tr>
    </table>
    <p style="margin:16px 0 0;font-size:11px;color:#9b9486">Tiska Catering · ${company.website}</p>
  </td></tr></table>
</body></html>`;
}

async function send(subject: string, html: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const from = process.env.REMINDER_FROM || "Tiska Catering <onboarding@resend.dev>";
  const to = (process.env.REMINDER_TO || company.email)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject, html }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export type ReminderResult = {
  enabled: boolean;
  checked: number;
  sent: number;
  skipped: number;
};

/** Jalankan pengecekan reminder harian. Aman dipanggil berkali-kali (anti-dobel). */
export async function runReminders(): Promise<ReminderResult> {
  if (!process.env.RESEND_API_KEY) {
    return { enabled: false, checked: 0, sent: 0, skipped: 0 };
  }
  const today = todayJakarta();
  const upcoming = await getUpcoming();
  const sent = new Set(await readSent());
  let checked = 0;
  let sentCount = 0;
  let skipped = 0;

  for (const d of upcoming) {
    const n = daysUntil(d.tanggal, today);
    if (!OFFSETS.includes(n)) continue;
    checked++;
    const key = `${d.id}:${n}`;
    if (sent.has(key)) {
      skipped++;
      continue;
    }
    const ok = await send(`Hari spesial: ${d.nama} ${whenLabel(n)}`, emailHtml(d, n));
    if (ok) {
      sent.add(key);
      sentCount++;
    }
  }

  if (sentCount) await writeSent([...sent]);
  return { enabled: true, checked, sent: sentCount, skipped };
}

/** Kirim email uji ke penerima terkonfigurasi (untuk verifikasi setup). */
export async function sendTestReminder(): Promise<{ ok: boolean; reason?: string }> {
  if (!process.env.RESEND_API_KEY) return { ok: false, reason: "RESEND_API_KEY belum diset di server." };
  const demo: SpecialDay = {
    id: "test",
    tanggal: addDaysStr(todayJakarta(), 7),
    nama: "Contoh Hari Spesial",
    kategori: "custom",
    aktif: true,
    sumber: "manual",
    createdAt: "",
    updatedAt: "",
  };
  const ok = await send("Tes reminder Hari Spesial — Tiska Catering", emailHtml(demo, 7));
  return ok
    ? { ok: true }
    : { ok: false, reason: "Resend menolak kirim. Cek API key, dan untuk email tujuan selain akun Resend perlu verifikasi domain dulu." };
}
