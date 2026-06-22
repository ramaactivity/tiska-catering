"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth";
import { company } from "@/lib/content";
import * as store from "@/lib/banners/store";
import type { BannerInput } from "@/lib/banners/types";

export type FormState = { error?: string } | null;

function refreshPublic() {
  revalidatePath("/");
  revalidatePath("/admin/banners");
}

export async function saveBannerAction(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireSession();

  const id = String(formData.get("id") ?? "").trim();
  const judul = String(formData.get("judul") ?? "").trim();
  const subjudul = String(formData.get("subjudul") ?? "").trim();
  const label = String(formData.get("label") ?? "").trim();
  const imageAlt = String(formData.get("imageAlt") ?? "").trim();
  const ctaLabel = String(formData.get("ctaLabel") ?? "").trim();
  const ctaHref = String(formData.get("ctaHref") ?? "").trim() || company.whatsappLink;
  const urutan = Number(formData.get("urutan") ?? 0) || 0;
  const aktif = formData.get("aktif") === "on";

  if (!judul) return { error: "Judul wajib diisi." };

  const file = formData.get("image");
  let imageUrl = String(formData.get("currentImageUrl") ?? "").trim();
  if (file instanceof File && file.size > 0) {
    if (!file.type.startsWith("image/")) return { error: "Berkas harus berupa gambar." };
    if (file.size > 8 * 1024 * 1024) return { error: "Ukuran gambar maksimal 8 MB." };
    imageUrl = await store.uploadImage(file);
  }
  if (!imageUrl) return { error: "Foto banner wajib diunggah." };

  const input: BannerInput = {
    label,
    judul,
    subjudul,
    imageUrl,
    imageAlt: imageAlt || judul,
    ctaLabel,
    ctaHref,
    urutan,
    aktif,
  };

  if (id) {
    const updated = await store.updateBanner(id, input);
    if (!updated) return { error: "Banner tidak ditemukan." };
  } else {
    await store.createBanner(input);
  }

  refreshPublic();
  redirect("/admin/banners");
}

export async function deleteBannerAction(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "").trim();
  if (id) await store.deleteBanner(id);
  refreshPublic();
  redirect("/admin/banners");
}
