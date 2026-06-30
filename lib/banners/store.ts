/**
 * Penyimpanan Banner — pola sama dgn lib/posts/store (Cloudflare R2 / fs fallback).
 * Foto memakai uploadImage bersama dari posts/store.
 */

import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { Banner, BannerInput } from "./types";
import { remoteStorageEnabled, readJsonObject, writeJsonObject, deleteObjectByUrl } from "@/lib/storage";
import { images } from "@/lib/images";
import { company } from "@/lib/content";
export { uploadImage } from "@/lib/posts/store";

const DATA_KEY = "banner/banners.json";
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "banners.json");

async function readRaw(): Promise<Banner[]> {
  if (remoteStorageEnabled()) {
    return (await readJsonObject<Banner[]>(DATA_KEY)) ?? [];
  }
  try {
    return JSON.parse(await fs.readFile(DATA_FILE, "utf8")) as Banner[];
  } catch {
    return [];
  }
}

async function writeRaw(banners: Banner[]): Promise<void> {
  if (remoteStorageEnabled()) {
    await writeJsonObject(DATA_KEY, banners);
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
/** Tanggal hari ini "YYYY-MM-DD" zona WIB (Asia/Jakarta). */
export function todayJakarta(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export type BannerStatus = "live" | "scheduled" | "ended" | "off";

/** Status tayang banner relatif terhadap jadwal & toggle aktif. */
export function bannerStatus(b: Banner, today = todayJakarta()): BannerStatus {
  if (!b.aktif) return "off";
  if (b.mulaiAt && today < b.mulaiAt) return "scheduled";
  if (b.selesaiAt && today > b.selesaiAt) return "ended";
  return "live";
}

/** Banner yang sedang tayang (aktif + dalam jadwal), terurut — carousel publik. */
export async function getActiveBanners(): Promise<Banner[]> {
  const today = todayJakarta();
  return (await readRaw())
    .filter((b) => bannerStatus(b, today) === "live")
    .sort(byUrutan);
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

/**
 * Isi banner contoh (mockup) memakai foto bawaan — hanya bila masih kosong.
 * Rama bisa edit/ganti/hapus seperti banner biasa. Kembalikan jumlah ditambah.
 */
export async function seedBannerDefaults(): Promise<number> {
  if ((await readRaw()).length) return 0;
  const now = Date.now();
  const at = (i: number) => new Date(now + i).toISOString();
  const samples: Banner[] = [
    {
      id: "sample-pernikahan",
      label: "Layanan Unggulan",
      judul: "Pernikahan yang Berkesan",
      subjudul:
        "Sajian anggun untuk hari paling istimewa — dirawat dengan ketelatenan tiga generasi.",
      imageUrl: images.hero.src,
      imageAlt: "Resepsi pernikahan dengan tata meja elegan",
      ctaLabel: "Konsultasi Menu",
      ctaHref: company.whatsappLink,
      urutan: 1,
      aktif: true,
      createdAt: at(0),
      updatedAt: at(0),
    },
    {
      id: "sample-hampers",
      label: "Bingkisan",
      judul: "Hampers Istimewa",
      subjudul: "Rangkaian hampers berpita emas untuk berbagi kebahagiaan di momen spesial.",
      imageUrl: images.menuKategori.hampers.src,
      imageAlt: "Bingkisan hampers istimewa berpita emas",
      ctaLabel: "Lihat Pilihan",
      ctaHref: company.whatsappLink,
      urutan: 2,
      aktif: true,
      createdAt: at(1),
      updatedAt: at(1),
    },
    {
      id: "sample-prasmanan",
      label: "Prasmanan",
      judul: "Cita Rasa untuk Setiap Perayaan",
      subjudul:
        "Dari syukuran keluarga hingga acara korporat — tersaji rapi dan menggugah selera.",
      imageUrl: images.cta.src,
      imageAlt: "Sajian prasmanan tertata indah",
      ctaLabel: "Tanya Ketersediaan",
      ctaHref: company.whatsappLink,
      urutan: 3,
      aktif: true,
      createdAt: at(2),
      updatedAt: at(2),
    },
  ];
  await writeRaw(samples);
  return samples.length;
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
  if (target?.imageUrl && remoteStorageEnabled()) {
    try {
      await deleteObjectByUrl(target.imageUrl);
    } catch {
      /* abaikan */
    }
  }
}
