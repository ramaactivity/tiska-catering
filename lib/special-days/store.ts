/**
 * Penyimpanan Hari Spesial — pola sama dgn lib/banners/store
 * (Vercel Blob / fs fallback). CRUD penuh + merge dari sumber (API) yang
 * tidak menimpa entri yang sudah ada (pilihan Rama aman dari refresh).
 */

import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { SpecialDay, SpecialDayInput } from "./types";

const DATA_KEY = "special-days/days.json";
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "special-days.json");

function blobEnabled(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

/** Tanggal hari ini "YYYY-MM-DD" zona WIB. */
export function todayJakarta(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** Selisih hari dari hari ini ke `tanggal` (negatif = sudah lewat). */
export function daysUntil(tanggal: string, today = todayJakarta()): number {
  const a = Date.parse(`${tanggal}T00:00:00Z`);
  const b = Date.parse(`${today}T00:00:00Z`);
  return Math.round((a - b) / 86_400_000);
}

async function readRaw(): Promise<SpecialDay[]> {
  if (blobEnabled()) {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: DATA_KEY, limit: 1 });
    if (!blobs.length) return [];
    const res = await fetch(blobs[0].url, { cache: "no-store" });
    if (!res.ok) return [];
    return (await res.json()) as SpecialDay[];
  }
  try {
    return JSON.parse(await fs.readFile(DATA_FILE, "utf8")) as SpecialDay[];
  } catch {
    return [];
  }
}

async function writeRaw(days: SpecialDay[]): Promise<void> {
  if (blobEnabled()) {
    const { put } = await import("@vercel/blob");
    await put(DATA_KEY, JSON.stringify(days, null, 2), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 0,
    });
    return;
  }
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(days, null, 2), "utf8");
}

const byDate = (a: SpecialDay, b: SpecialDay) =>
  a.tanggal < b.tanggal ? -1 : a.tanggal > b.tanggal ? 1 : a.nama.localeCompare(b.nama);

export async function getAllDays(): Promise<SpecialDay[]> {
  return (await readRaw()).sort(byDate);
}

/** Hari spesial aktif yang belum lewat (hari ini termasuk), terurut. */
export async function getUpcoming(limit?: number): Promise<SpecialDay[]> {
  const today = todayJakarta();
  const list = (await readRaw())
    .filter((d) => d.aktif && d.tanggal >= today)
    .sort(byDate);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export async function getDayById(id: string): Promise<SpecialDay | null> {
  return (await readRaw()).find((d) => d.id === id) ?? null;
}

export async function createDay(input: SpecialDayInput): Promise<SpecialDay> {
  const days = await readRaw();
  const now = new Date().toISOString();
  const day: SpecialDay = {
    id: randomUUID(),
    tanggal: input.tanggal,
    nama: input.nama,
    kategori: input.kategori,
    aktif: input.aktif ?? true,
    sumber: "manual",
    createdAt: now,
    updatedAt: now,
  };
  days.push(day);
  await writeRaw(days);
  return day;
}

export async function updateDay(
  id: string,
  patch: Partial<SpecialDayInput>,
): Promise<SpecialDay | null> {
  const days = await readRaw();
  const idx = days.findIndex((d) => d.id === id);
  if (idx === -1) return null;
  days[idx] = { ...days[idx], ...patch, updatedAt: new Date().toISOString() };
  await writeRaw(days);
  return days[idx];
}

export async function toggleDay(id: string): Promise<void> {
  const days = await readRaw();
  const idx = days.findIndex((d) => d.id === id);
  if (idx === -1) return;
  days[idx] = { ...days[idx], aktif: !days[idx].aktif, updatedAt: new Date().toISOString() };
  await writeRaw(days);
}

export async function deleteDay(id: string): Promise<void> {
  const days = await readRaw();
  await writeRaw(days.filter((d) => d.id !== id));
}

/**
 * Gabungkan kandidat dari sumber: hanya tambah id yang belum ada, sehingga
 * edit/nonaktif/hapus oleh Rama tidak tertimpa. Kembalikan jumlah yang ditambah.
 */
export async function mergeFromSource(candidates: SpecialDay[]): Promise<number> {
  const days = await readRaw();
  const ids = new Set(days.map((d) => d.id));
  let added = 0;
  for (const c of candidates) {
    if (!ids.has(c.id)) {
      days.push(c);
      ids.add(c.id);
      added++;
    }
  }
  if (added) await writeRaw(days);
  return added;
}
