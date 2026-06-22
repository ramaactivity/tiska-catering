/**
 * Penyimpanan "Kabar" — native, tanpa CMS pihak ketiga.
 *
 * Produksi  : Vercel Blob (data JSON + foto) — aktif bila env BLOB_READ_WRITE_TOKEN ada.
 * Lokal/dev : filesystem (data/posts.json + public/uploads) — agar bisa dites tanpa provisioning.
 *
 * Semua fungsi hanya untuk server (route handler / server action / server component).
 */

import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { Post, PostInput } from "./types";
import { slugify } from "./types";

const DATA_KEY = "kabar/posts.json";
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "posts.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

function blobEnabled(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

// ─── Baca/tulis mentah ──────────────────────────────────────────────────────

async function readRaw(): Promise<Post[]> {
  if (blobEnabled()) {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: DATA_KEY, limit: 1 });
    if (!blobs.length) return [];
    const res = await fetch(blobs[0].url, { cache: "no-store" });
    if (!res.ok) return [];
    return (await res.json()) as Post[];
  }
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as Post[];
  } catch {
    return [];
  }
}

async function writeRaw(posts: Post[]): Promise<void> {
  if (blobEnabled()) {
    const { put } = await import("@vercel/blob");
    await put(DATA_KEY, JSON.stringify(posts, null, 2), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 0, // data harus selalu segar saat di-overwrite
    });
    return;
  }
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2), "utf8");
}

function byNewest(a: Post, b: Post): number {
  return a.createdAt < b.createdAt ? 1 : -1;
}

// ─── Baca publik (selalu segar; halaman publik dirender dinamis) ─────────────

/** Semua post terbit, terbaru dulu. Dipakai halaman publik & beranda. */
export async function getPublishedPosts(): Promise<Post[]> {
  return (await readRaw()).filter((p) => p.published).sort(byNewest);
}

/** Post sorotan utama untuk beranda: yang featured terbaru, jika tidak ada → terbit terbaru. */
export async function getFeaturedPost(): Promise<Post | null> {
  const published = await getPublishedPosts();
  if (!published.length) return null;
  return published.find((p) => p.featured) ?? published[0];
}

export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPublishedPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

// ─── Baca admin (selalu segar, termasuk draft) ───────────────────────────────

export async function getAllPosts(): Promise<Post[]> {
  return (await readRaw()).sort(byNewest);
}

export async function getPostById(id: string): Promise<Post | null> {
  return (await readRaw()).find((p) => p.id === id) ?? null;
}

// ─── Tulis ───────────────────────────────────────────────────────────────────

function uniqueSlug(judul: string, posts: Post[], ignoreId?: string): string {
  const base = slugify(judul);
  let slug = base;
  let n = 2;
  while (posts.some((p) => p.slug === slug && p.id !== ignoreId)) {
    slug = `${base}-${n++}`;
  }
  return slug;
}

export async function createPost(input: PostInput): Promise<Post> {
  const posts = await readRaw();
  const now = new Date().toISOString();
  const post: Post = {
    ...input,
    id: randomUUID(),
    slug: uniqueSlug(input.judul, posts),
    createdAt: now,
    updatedAt: now,
  };
  posts.push(post);
  await writeRaw(posts);
  return post;
}

export async function updatePost(id: string, input: PostInput): Promise<Post | null> {
  const posts = await readRaw();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const prev = posts[idx];
  const updated: Post = {
    ...prev,
    ...input,
    slug:
      input.judul !== prev.judul
        ? uniqueSlug(input.judul, posts, id)
        : prev.slug,
    updatedAt: new Date().toISOString(),
  };
  posts[idx] = updated;
  await writeRaw(posts);
  return updated;
}

export async function deletePost(id: string): Promise<void> {
  const posts = await readRaw();
  const target = posts.find((p) => p.id === id);
  const next = posts.filter((p) => p.id !== id);
  await writeRaw(next);
  // hapus foto (best-effort) bila tersimpan di Blob
  if (target?.imageUrl && blobEnabled() && target.imageUrl.includes(".blob.vercel-storage.com")) {
    try {
      const { del } = await import("@vercel/blob");
      await del(target.imageUrl);
    } catch {
      /* abaikan kegagalan hapus foto */
    }
  }
}

// ─── Upload foto ──────────────────────────────────────────────────────────────

export async function uploadImage(file: File): Promise<string> {
  const ext = extFromFile(file);
  const name = `${Date.now()}-${randomUUID().slice(0, 8)}${ext}`;
  if (blobEnabled()) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`kabar/img/${name}`, file, {
      access: "public",
      addRandomSuffix: false,
    });
    return blob.url;
  }
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const buf = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOAD_DIR, name), buf);
  return `/uploads/${name}`;
}

function extFromFile(file: File): string {
  const fromName = path.extname(file.name || "");
  if (fromName) return fromName.toLowerCase();
  const map: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/avif": ".avif",
    "image/gif": ".gif",
  };
  return map[file.type] ?? ".jpg";
}
