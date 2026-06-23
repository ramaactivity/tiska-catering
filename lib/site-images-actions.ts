"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth";
import {
  readOverrides,
  writeOverrides,
  uploadImage,
  ALL_SLOTS,
} from "@/lib/site-images";

export type FormState = { ok?: boolean; error?: string } | null;

function refresh() {
  revalidatePath("/");
  revalidatePath("/menu");
  revalidatePath("/galeri");
  revalidatePath("/admin/foto");
}

export async function saveSiteImageAction(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireSession();
  const slot = String(formData.get("slot") ?? "");
  if (!ALL_SLOTS.some((s) => s.key === slot)) return { error: "Slot tidak dikenal." };

  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) return { error: "Tidak ada gambar." };
  if (!file.type.startsWith("image/")) return { error: "Berkas harus berupa gambar." };
  if (file.size > 12 * 1024 * 1024) return { error: "Ukuran gambar maksimal 12 MB." };

  const url = await uploadImage(file);
  const ov = await readOverrides();
  ov[slot] = url;
  await writeOverrides(ov);
  refresh();
  return { ok: true };
}

export async function resetSiteImageAction(formData: FormData): Promise<void> {
  await requireSession();
  const slot = String(formData.get("slot") ?? "");
  const ov = await readOverrides();
  if (ov[slot]) {
    delete ov[slot];
    await writeOverrides(ov);
  }
  refresh();
}
