/**
 * Foto Website yang bisa diganti dari /admin/foto.
 * Default = lib/images.ts. Override (hasil upload+crop) disimpan native
 * (Vercel Blob / fs fallback) sebagai map { slotKey: url }.
 * Komponen publik menerima foto via props; halaman memanggil getSiteImages().
 */

import { promises as fs } from "fs";
import path from "path";
import { cache } from "react";
import { images } from "@/lib/images";
import { layanan as layananList, teamGroups } from "@/lib/content";
import { uploadImage } from "@/lib/posts/store";
export { uploadImage };

type Foto = { src: string; alt: string };
type ResolvedImages = typeof images;

const DATA_KEY = "site/images.json"; // legacy: satu file map (dibaca untuk kompatibilitas)
const SLOT_PREFIX = "site/slots/"; // robust: satu blob per slot (anti lost-update)
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "site-images.json");

function blobEnabled(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

/** Peta legacy {slot: url} dari site/images.json (foto lama tetap terbaca). */
async function readLegacyMap(): Promise<Record<string, string>> {
  if (blobEnabled()) {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: DATA_KEY, limit: 1 });
    if (!blobs.length) return {};
    const res = await fetch(blobs[0].url, { cache: "no-store" });
    if (!res.ok) return {};
    return (await res.json()) as Record<string, string>;
  }
  try {
    return JSON.parse(await fs.readFile(DATA_FILE, "utf8")) as Record<string, string>;
  } catch {
    return {};
  }
}

/**
 * Peta override {slot: url}. Digabung dari dua sumber:
 *  1. legacy site/images.json (kompatibilitas foto lama), lalu
 *  2. per-slot blob site/slots/<slot>.jpg — MENANG. Tiap upload menulis file
 *     sendiri (bukan read-modify-write satu map), jadi tak ada update yang
 *     saling menimpa saat mengganti banyak foto beruntun. URL diberi ?v=
 *     (waktu unggah) sebagai cache-bust agar foto baru langsung tampil.
 */
export async function readOverrides(): Promise<Record<string, string>> {
  const map = await readLegacyMap();
  if (blobEnabled()) {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: SLOT_PREFIX });
    for (const b of blobs) {
      const slot = b.pathname.slice(SLOT_PREFIX.length).replace(/\.[^./]+$/, "");
      if (slot) map[slot] = `${b.url}?v=${new Date(b.uploadedAt).getTime()}`;
    }
  }
  return map;
}

/** Simpan foto satu slot (robust, satu file per slot). */
export async function putSiteImage(slot: string, file: File): Promise<void> {
  if (blobEnabled()) {
    const { put } = await import("@vercel/blob");
    await put(`${SLOT_PREFIX}${slot}.jpg`, file, {
      access: "public",
      contentType: "image/jpeg",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 31536000,
    });
    return;
  }
  // Dev (fs, proses tunggal → aman pakai map lokal).
  const url = await uploadImage(file);
  const map = await readLegacyMap();
  map[slot] = url;
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(map, null, 2), "utf8");
}

/** Hapus override satu slot (per-slot blob + entri legacy bila ada). */
export async function removeSiteImage(slot: string): Promise<void> {
  if (blobEnabled()) {
    const { list, del, put } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: `${SLOT_PREFIX}${slot}.` });
    await Promise.all(blobs.map((b) => del(b.url)));
    const { blobs: legacy } = await list({ prefix: DATA_KEY, limit: 1 });
    if (legacy.length) {
      const res = await fetch(legacy[0].url, { cache: "no-store" });
      if (res.ok) {
        const map = (await res.json()) as Record<string, string>;
        if (map[slot]) {
          delete map[slot];
          await put(DATA_KEY, JSON.stringify(map, null, 2), {
            access: "public",
            contentType: "application/json",
            addRandomSuffix: false,
            allowOverwrite: true,
            cacheControlMaxAge: 0,
          });
        }
      }
    }
    return;
  }
  const map = await readLegacyMap();
  if (map[slot]) {
    delete map[slot];
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(map, null, 2), "utf8");
  }
}

function set(foto: Foto, src?: string): Foto {
  return src ? { ...foto, src } : foto;
}

/** Foto terpakai (default + override) dengan bentuk sama seperti lib/images. */
export const getSiteImages = cache(async (): Promise<ResolvedImages> => {
  const ov = await readOverrides();
  const si: ResolvedImages = structuredClone(images);

  si.hero = set(si.hero, ov["hero"]);
  si.sejarah = set(si.sejarah, ov["sejarah"]);
  si.cta = set(si.cta, ov["cta"]);
  if (si.profil[0]) si.profil[0] = set(si.profil[0], ov["profil-1"]);
  if (si.profil[1]) si.profil[1] = set(si.profil[1], ov["profil-2"]);
  for (let i = 0; i < si.layanan.length; i++) {
    si.layanan[i] = set(si.layanan[i], ov[`layanan-${i + 1}`]);
  }
  for (const cat of Object.keys(si.menuKategori)) {
    const url = ov[`menu-${cat}`];
    if (!url) continue;
    if (si.menuKategori[cat]) si.menuKategori[cat] = set(si.menuKategori[cat], url);
    if (si.menuRingkas[cat]) si.menuRingkas[cat] = set(si.menuRingkas[cat], url);
  }
  for (const id of Object.keys(si.team)) {
    si.team[id] = set(si.team[id], ov[`team-${id}`]);
  }
  return si;
});

/** Foto placeholder netral untuk preview slot tim di /admin (sebelum upload). */
export const TEAM_PLACEHOLDER = "/images/team-placeholder.svg";

// ─── Registry slot (untuk UI /admin/foto) ────────────────────────────────────

export type ImageSlot = {
  key: string;
  label: string;
  /** rasio lebar/tinggi untuk cropper */
  ratio: number;
  ratioLabel: string;
  size: string;
  srcOf: (si: ResolvedImages) => string;
};

const MENU_LABEL: Record<string, string> = {
  indonesian: "Indonesian",
  asian: "Asian",
  western: "Western",
  pasta: "Pasta",
  mediterranean: "Mediterranean",
  peranakan: "Peranakan",
  vegetarian: "Vegetarian",
  tumpeng: "Tumpeng",
  hampers: "Hampers",
};

export const SITE_IMAGE_GROUPS: { group: string; slots: ImageSlot[] }[] = [
  {
    group: "Beranda",
    slots: [
      { key: "hero", label: "Hero (latar utama)", ratio: 16 / 9, ratioLabel: "16:9", size: "2000×1125", srcOf: (s) => s.hero.src },
      { key: "profil-1", label: "Profil — foto kiri", ratio: 3 / 4, ratioLabel: "3:4", size: "1200×1600", srcOf: (s) => s.profil[0]?.src ?? "" },
      { key: "profil-2", label: "Profil — foto kanan", ratio: 4 / 5, ratioLabel: "4:5", size: "1200×1500", srcOf: (s) => s.profil[1]?.src ?? "" },
      { key: "sejarah", label: "Sejarah (latar)", ratio: 16 / 9, ratioLabel: "16:9", size: "1600×900", srcOf: (s) => s.sejarah.src },
      { key: "cta", label: "Ajakan / CTA (latar)", ratio: 16 / 9, ratioLabel: "16:9", size: "2000×1125", srcOf: (s) => s.cta.src },
    ],
  },
  {
    group: "Tim — Our Team",
    slots: teamGroups.flatMap((grp) =>
      grp.members.map((m) => ({
        key: `team-${m.id}`,
        label: `${m.nama} — ${m.jabatan}`,
        ratio: 1,
        ratioLabel: "1:1",
        size: "1000×1000",
        srcOf: (s: ResolvedImages) => s.team[m.id]?.src || TEAM_PLACEHOLDER,
      })),
    ),
  },
  {
    group: "Layanan",
    slots: images.layanan.map((_, i) => ({
      key: `layanan-${i + 1}`,
      label: `Layanan — ${layananList[i]?.judul ?? `Foto ${i + 1}`}`,
      ratio: 3 / 4,
      ratioLabel: "3:4",
      size: "1200×1600",
      srcOf: (s: ResolvedImages) => s.layanan[i]?.src ?? "",
    })),
  },
  {
    group: "Menu (per kategori)",
    slots: Object.keys(images.menuKategori).map((cat) => ({
      key: `menu-${cat}`,
      label: `Menu — ${MENU_LABEL[cat] ?? cat}`,
      ratio: 4 / 3,
      ratioLabel: "4:3",
      size: "1400×1050",
      srcOf: (s: ResolvedImages) => s.menuKategori[cat]?.src ?? "",
    })),
  },
];

export const ALL_SLOTS: ImageSlot[] = SITE_IMAGE_GROUPS.flatMap((g) => g.slots);
