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
  revalidatePath("/en");
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
  const judulEn = String(formData.get("judulEn") ?? "").trim();
  const en = judulEn
    ? {
        label: String(formData.get("labelEn") ?? "").trim(),
        judul: judulEn,
        subjudul: String(formData.get("subjudulEn") ?? "").trim(),
        ctaLabel: String(formData.get("ctaLabelEn") ?? "").trim(),
      }
    : undefined;
  const mulaiAt = String(formData.get("mulaiAt") ?? "").trim() || undefined;
  const selesaiAt = String(formData.get("selesaiAt") ?? "").trim() || undefined;

  if (!judul) return { error: "Judul wajib diisi." };
  if (mulaiAt && selesaiAt && mulaiAt > selesaiAt)
    return { error: "Tanggal selesai harus sama atau setelah tanggal mulai." };

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
    en,
    urutan,
    aktif,
    mulaiAt,
    selesaiAt,
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

/** Isi banner contoh memakai foto bawaan (hanya bila masih kosong). */
export async function seedBannersAction(): Promise<void> {
  await requireSession();
  await store.seedBannerDefaults();
  refreshPublic();
}
