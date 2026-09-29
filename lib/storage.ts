/**
 * Abstraksi object storage — Supabase Storage di produksi,
 * fallback filesystem di lokal/dev (lihat tiap store: data/*.json + public/uploads).
 *
 * Pengganti Vercel Blob (kena limit Hobby). Supabase free: 1 GB storage,
 * 5 GB transfer/bln, tanpa kartu kredit, boleh komersial.
 * Env produksi (set di Vercel, Production + Preview):
 *   SUPABASE_URL · SUPABASE_SERVICE_ROLE_KEY · SUPABASE_BUCKET
 * Tanpa env lengkap → store otomatis pakai filesystem (lokal/dev).
 *
 * Anti-pause: cron harian /api/cron/special-days membaca storage tiap hari →
 * project Supabase tetap aktif (pause hanya bila 7 hari tanpa aktivitas).
 */

import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = (process.env.SUPABASE_URL || "").replace(/\/+$/, "");
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.SUPABASE_BUCKET || "tiska-media";

/** true bila kredensial Supabase lengkap (produksi). false → store pakai fs (lokal). */
export function remoteStorageEnabled(): boolean {
  return !!(SUPABASE_URL && SERVICE_ROLE_KEY);
}

let _client: SupabaseClient | null = null;
function sb(): SupabaseClient {
  if (!_client) {
    _client = createClient(SUPABASE_URL, SERVICE_ROLE_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return _client;
}

/** URL publik untuk sebuah key (bucket harus di-set Public). */
export function publicUrl(key: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${key.replace(/^\/+/, "")}`;
}

/** Baca objek JSON; null bila belum ada (atau gagal — paritas dgn perilaku lama). */
export async function readJsonObject<T>(key: string): Promise<T | null> {
  const { data, error } = await sb().storage.from(BUCKET).download(key);
  if (error || !data) return null;
  try {
    return JSON.parse(await data.text()) as T;
  } catch {
    return null;
  }
}

/** Tulis objek JSON (overwrite, selalu fresh). */
export async function writeJsonObject(key: string, value: unknown): Promise<void> {
  const { error } = await sb()
    .storage.from(BUCKET)
    .upload(key, JSON.stringify(value, null, 2), {
      upsert: true,
      contentType: "application/json",
      cacheControl: "0",
    });
  if (error) throw error;
}

/** Unggah berkas → kembalikan URL publik. */
export async function putFileObject(key: string, file: File, contentType?: string): Promise<string> {
  const buf = Buffer.from(await file.arrayBuffer());
  const { error } = await sb()
    .storage.from(BUCKET)
    .upload(key, buf, {
      upsert: true,
      contentType: contentType || file.type || "application/octet-stream",
      cacheControl: "31536000",
    });
  if (error) throw error;
  return publicUrl(key);
}

export type StoredObject = { key: string; url: string; uploadedAt: number };

/**
 * Daftar objek berprefix. `prefix` boleh berupa folder ("site/slots/") atau
 * folder + awalan nama ("site/slots/team-rita."). Supabase list per-folder,
 * jadi sisa awalan nama difilter di sini.
 */
export async function listObjects(prefix: string): Promise<StoredObject[]> {
  const slash = prefix.lastIndexOf("/");
  const folder = slash >= 0 ? prefix.slice(0, slash) : "";
  const namePrefix = prefix.slice(slash + 1);
  const { data, error } = await sb().storage.from(BUCKET).list(folder, { limit: 1000 });
  if (error || !data) return [];
  return data
    .filter((f) => f.id && f.name && (!namePrefix || f.name.startsWith(namePrefix)))
    .map((f) => {
      const key = folder ? `${folder}/${f.name}` : f.name;
      const ts = f.updated_at || f.created_at;
      return { key, url: publicUrl(key), uploadedAt: ts ? Date.parse(ts) : 0 };
    });
}

/** Hapus objek berdasarkan key. */
export async function deleteObject(key: string): Promise<void> {
  await sb().storage.from(BUCKET).remove([key]);
}

/** Hapus objek berdasarkan URL publik (no-op bila bukan URL storage kita). */
export async function deleteObjectByUrl(url: string): Promise<void> {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const i = url.indexOf(marker);
  if (i === -1) return;
  const key = url.slice(i + marker.length).split("?")[0];
  if (key) await deleteObject(key);
}
