"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth";
import * as store from "@/lib/gallery/store";

export type FormState = { ok?: boolean; error?: string } | null;

function refresh() {
  revalidatePath("/galeri");
  revalidatePath("/admin/galeri");
}

export async function addGalleryAction(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireSession();
  const imageAlt = String(formData.get("imageAlt") ?? "").trim();
  const kategori = String(formData.get("kategori") ?? "").trim() || "Perayaan";
  const urutan = Number(formData.get("urutan") ?? 0) || 0;

  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) return { error: "Foto wajib diunggah." };
  if (!file.type.startsWith("image/")) return { error: "Berkas harus berupa gambar." };
  if (file.size > 8 * 1024 * 1024) return { error: "Ukuran gambar maksimal 8 MB." };

  const imageUrl = await store.uploadImage(file);
  await store.createGallery({ imageUrl, imageAlt: imageAlt || kategori, kategori, urutan });
  refresh();
  return { ok: true };
}

export async function deleteGalleryAction(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "").trim();
  if (id) await store.deleteGallery(id);
  refresh();
}

export async function seedGalleryAction(): Promise<void> {
  await requireSession();
  await store.seedGalleryDefaults();
  refresh();
}
