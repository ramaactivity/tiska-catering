/**
 * Penyimpanan Banner — pola sama dgn lib/posts/store (Vercel Blob / fs fallback).
 * Foto memakai uploadImage bersama dari posts/store.
 */

import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { Banner, BannerInput } from "./types";
export { uploadImage } from "@/lib/posts/store";

const DATA_KEY = "banner/banners.json";
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "banners.json");

function blobEnabled(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

async function readRaw(): Promise<Banner[]> {
  if (blobEnabled()) {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: DATA_KEY, limit: 1 });
    if (!blobs.length) return [];
    const res = await fetch(blobs[0].url, { cache: "no-store" });
    if (!res.ok) return [];
    return (await res.json()) as Banner[];
  }
  try {
    return JSON.parse(await fs.readFile(DATA_FILE, "utf8")) as Banner[];
  } catch {
    return [];
  }
}

async function writeRaw(banners: Banner[]): Promise<void> {
  if (blobEnabled()) {
    const { put } = await import("@vercel/blob");
    await put(DATA_KEY, JSON.stringify(banners, null, 2), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 0,
    });
    return;
  }
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(banners, null, 2), "utf8");
}

function byUrutan(a: Banner, b: Banner): number {
  if (a.urutan !== b.urutan) return a.urutan - b.urutan;
  return a.createdAt < b.createdAt ? 1 : -1;
}

/** Banner aktif, terurut — untuk carousel publik. */
export async function getActiveBanners(): Promise<Banner[]> {
  return (await readRaw()).filter((b) => b.aktif).sort(byUrutan);
}

export async function getAllBanners(): Promise<Banner[]> {
  return (await readRaw()).sort(byUrutan);
}

export async function getBannerById(id: string): Promise<Banner | null> {
  return (await readRaw()).find((b) => b.id === id) ?? null;
}

export async function createBanner(input: BannerInput): Promise<Banner> {
  const banners = await readRaw();
  const now = new Date().toISOString();
  const banner: Banner = { ...input, id: randomUUID(), createdAt: now, updatedAt: now };
  banners.push(banner);
  await writeRaw(banners);
  return banner;
}

export async function updateBanner(id: string, input: BannerInput): Promise<Banner | null> {
  const banners = await readRaw();
  const idx = banners.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  banners[idx] = { ...banners[idx], ...input, updatedAt: new Date().toISOString() };
  await writeRaw(banners);
  return banners[idx];
}

/** Tambah banner contoh yang belum ada (berdasarkan id). Kembalikan jumlah ditambah. */
export async function seedBanners(items: Banner[]): Promise<number> {
  const banners = await readRaw();
  const existing = new Set(banners.map((b) => b.id));
  let added = 0;
  for (const it of items) {
    if (!existing.has(it.id)) {
      banners.push(it);
      added++;
    }
  }
  if (added) await writeRaw(banners);
  return added;
}

export async function deleteBanner(id: string): Promise<void> {
  const banners = await readRaw();
  const target = banners.find((b) => b.id === id);
  await writeRaw(banners.filter((b) => b.id !== id));
  if (target?.imageUrl && blobEnabled() && target.imageUrl.includes(".blob.vercel-storage.com")) {
    try {
      const { del } = await import("@vercel/blob");
      await del(target.imageUrl);
    } catch {
      /* abaikan */
    }
  }
}
