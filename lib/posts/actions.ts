"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  checkPassword,
  createSession,
  clearSession,
  requireSession,
} from "@/lib/auth";
import { company, kabarPage } from "@/lib/content";
import * as store from "@/lib/posts/store";
import { isPostCategory, type PostInput } from "@/lib/posts/types";

export type FormState = { error?: string } | null;

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    return { error: "Kata sandi salah." };
  }
  await createSession();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await clearSession();
  redirect("/admin/login");
}

// ─── Post ──────────────────────────────────────────────────────────────────────

export async function savePostAction(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireSession();

  const id = String(formData.get("id") ?? "").trim();
  const judul = String(formData.get("judul") ?? "").trim();
  const ringkasan = String(formData.get("ringkasan") ?? "").trim();
  const isi = String(formData.get("isi") ?? "").trim();
  const periode = String(formData.get("periode") ?? "").trim();
  const imageAlt = String(formData.get("imageAlt") ?? "").trim();
  const kategoriRaw = String(formData.get("kategori") ?? "").trim();
  const ctaLabel =
    String(formData.get("ctaLabel") ?? "").trim() || kabarPage.ctaDefaultLabel;
  const ctaHref =
    String(formData.get("ctaHref") ?? "").trim() || company.whatsappLink;
  const published = formData.get("published") === "on";
  const featured = formData.get("featured") === "on";

  if (!judul) return { error: "Judul wajib diisi." };
  if (!ringkasan) return { error: "Ringkasan wajib diisi." };
  if (!isPostCategory(kategoriRaw)) return { error: "Kategori tidak valid." };

  // Foto: pakai file baru bila ada, kalau tidak pertahankan yang lama.
  const file = formData.get("image");
  let imageUrl = String(formData.get("currentImageUrl") ?? "").trim();
  if (file instanceof File && file.size > 0) {
    if (!file.type.startsWith("image/")) {
      return { error: "Berkas yang diunggah harus berupa gambar." };
    }
    if (file.size > 8 * 1024 * 1024) {
      return { error: "Ukuran gambar maksimal 8 MB." };
    }
    imageUrl = await store.uploadImage(file);
  }
  if (!imageUrl) return { error: "Foto wajib diunggah." };

  const input: PostInput = {
    kategori: kategoriRaw,
    judul,
    ringkasan,
    isi,
    imageUrl,
    imageAlt: imageAlt || judul,
    periode,
    ctaLabel,
    ctaHref,
    published,
    featured,
  };

  if (id) {
    const updated = await store.updatePost(id, input);
    if (!updated) return { error: "Post tidak ditemukan." };
  } else {
    await store.createPost(input);
  }

  refreshPublic();
  redirect("/admin");
}

export async function deletePostAction(formData: FormData): Promise<void> {
  await requireSession();
  const id = String(formData.get("id") ?? "").trim();
  if (id) await store.deletePost(id);
  refreshPublic();
}

/** Segarkan halaman publik yang menampilkan kabar (beranda statis perlu di-revalidate). */
function refreshPublic() {
  revalidatePath("/");
  revalidatePath("/kabar");
  revalidatePath("/admin");
}
