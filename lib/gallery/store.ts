/**
 * Galeri foto yang dikelola dari /admin/galeri (Cloudflare R2 / fs fallback).
 * Bila belum ada item tersimpan, halaman publik memakai foto bawaan lib/images.
 */

import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { images } from "@/lib/images";
import { remoteStorageEnabled, readJsonObject, writeJsonObject, deleteObjectByUrl } from "@/lib/storage";
export { uploadImage } from "@/lib/posts/store";

export type GalleryItem = {
  id: string;
  imageUrl: string;
  imageAlt: string;
  /** Judul/caption editorial (opsional) — dipakai billboard & lightbox; fallback ke imageAlt. */
  judul?: string;
  kategori: string;
  urutan: number;
  createdAt: string;
};
export type GalleryInput = Omit<GalleryItem, "id" | "createdAt">;

const DATA_KEY = "galeri/items.json";
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "gallery.json");

async function readRaw(): Promise<GalleryItem[]> {
  if (remoteStorageEnabled()) {
    return (await readJsonObject<GalleryItem[]>(DATA_KEY)) ?? [];
  }
  try {
    return JSON.parse(await fs.readFile(DATA_FILE, "utf8")) as GalleryItem[];
  } catch {
    return [];
  }
}

async function writeRaw(items: GalleryItem[]): Promise<void> {
  if (remoteStorageEnabled()) {
    await writeJsonObject(DATA_KEY, items);
    return;
  }
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf8");
}

function byUrutan(a: GalleryItem, b: GalleryItem): number {
  if (a.urutan !== b.urutan) return a.urutan - b.urutan;
  return a.createdAt < b.createdAt ? -1 : 1;
}

/** Untuk admin: item tersimpan saja. */
export async function getAllGallery(): Promise<GalleryItem[]> {
  return (await readRaw()).sort(byUrutan);
}

/** Untuk publik: item tersimpan, atau foto bawaan bila kosong. */
export async function getPublicGallery(): Promise<
  { src: string; alt: string; kategori: string; judul?: string }[]
> {
  const items = (await readRaw()).sort(byUrutan);
  if (items.length)
    return items.map((i) => ({
      src: i.imageUrl,
      alt: i.imageAlt,
      kategori: i.kategori,
      // Backfill judul untuk item placeholder lama (ter-seed sebelum field judul
      // ada) dengan mencocokkan src ke lib/images. Foto asli pakai judul tersimpan.
      judul: i.judul ?? images.galeri.find((g) => g.src === i.imageUrl)?.judul,
    }));
  return images.galeri;
}

export async function createGallery(input: GalleryInput): Promise<GalleryItem> {
  const items = await readRaw();
  const item: GalleryItem = { ...input, id: randomUUID(), createdAt: new Date().toISOString() };
  items.push(item);
  await writeRaw(items);
  return item;
}

export async function deleteGallery(id: string): Promise<void> {
  const items = await readRaw();
  const target = items.find((i) => i.id === id);
  await writeRaw(items.filter((i) => i.id !== id));
  if (target?.imageUrl && remoteStorageEnabled()) {
    try {
      await deleteObjectByUrl(target.imageUrl);
    } catch {
      /* abaikan */
    }
  }
}

/** Salin foto bawaan ke store agar bisa dikelola. */
export async function seedGalleryDefaults(): Promise<number> {
  const items = await readRaw();
  if (items.length) return 0;
  const now = Date.now();
  const seeded: GalleryItem[] = images.galeri.map((g, i) => ({
    id: randomUUID(),
    imageUrl: g.src,
    imageAlt: g.alt,
    judul: g.judul,
    kategori: g.kategori,
    urutan: i + 1,
    createdAt: new Date(now + i).toISOString(),
  }));
  await writeRaw(seeded);
  return seeded.length;
}
