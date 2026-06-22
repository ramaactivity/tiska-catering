"use client";

import { useActionState, useState } from "react";
import { savePostAction, type FormState } from "@/lib/posts/actions";
import { company, kabarPage } from "@/lib/content";
import { POST_CATEGORIES, type Post } from "@/lib/posts/types";

type PostFormProps = {
  /** Bila ada → mode edit; bila tidak → mode buat baru. */
  post?: Post;
};

const inputClass =
  "w-full rounded-lg border border-line bg-ink-2 px-4 py-2.5 text-[15px] text-paper outline-none transition-colors focus:border-gold/60";
const labelClass =
  "mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-gold-soft";

export default function PostForm({ post }: PostFormProps) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    savePostAction,
    null,
  );
  const [preview, setPreview] = useState<string | null>(post?.imageUrl ?? null);

  return (
    <form action={formAction} className="grid gap-6 md:grid-cols-[1fr_320px]">
      {post && <input type="hidden" name="id" value={post.id} />}
      <input type="hidden" name="currentImageUrl" value={post?.imageUrl ?? ""} />

      {/* Kolom kiri — isi */}
      <div className="grid gap-5">
        <div>
          <label className={labelClass}>Judul *</label>
          <input
            name="judul"
            required
            defaultValue={post?.judul}
            placeholder="mis. Paket Syukuran Juni"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Ringkasan * (tampil di kartu)</label>
          <textarea
            name="ringkasan"
            required
            rows={2}
            defaultValue={post?.ringkasan}
            placeholder="Satu–dua kalimat singkat yang menggugah."
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Isi lengkap (opsional)</label>
          <textarea
            name="isi"
            rows={8}
            defaultValue={post?.isi}
            placeholder="Cerita selengkapnya. Pisahkan paragraf dengan baris kosong."
            className={inputClass}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Teks tombol (opsional)</label>
            <input
              name="ctaLabel"
              defaultValue={post?.ctaLabel}
              placeholder={kabarPage.ctaDefaultLabel}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Link tombol (opsional)</label>
            <input
              name="ctaHref"
              defaultValue={post?.ctaHref}
              placeholder={company.whatsappLink}
              className={inputClass}
            />
          </div>
        </div>

        {state?.error && (
          <p className="text-[13px] text-red-400">{state.error}</p>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={pending}
            className="rounded-full border border-gold/70 bg-gold/10 px-8 py-3 text-[12px] uppercase tracking-[0.2em] text-gold-bright transition-colors hover:bg-gold/20 disabled:opacity-50"
          >
            {pending ? "Menyimpan…" : post ? "Simpan perubahan" : "Terbitkan"}
          </button>
          <a
            href="/admin"
            className="text-[12px] uppercase tracking-[0.18em] text-paper/55 transition-colors hover:text-gold-soft"
          >
            Batal
          </a>
        </div>
      </div>

      {/* Kolom kanan — meta */}
      <aside className="grid h-fit gap-5 rounded-xl border border-line bg-ink-2/50 p-5">
        <div>
          <label className={labelClass}>Kategori *</label>
          <select
            name="kategori"
            defaultValue={post?.kategori ?? "promo"}
            className={inputClass}
          >
            {POST_CATEGORIES.map((k) => (
              <option key={k} value={k} className="bg-ink-2">
                {kabarPage.kategoriLabel[k]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Periode (opsional)</label>
          <input
            name="periode"
            defaultValue={post?.periode}
            placeholder="mis. Berlaku Juni 2026"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Foto {post ? "(ganti)" : "*"}</label>
          {preview && (
            <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-lg border border-line">
              {/* preview lokal pakai img biasa agar tak perlu konfigurasi domain */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Pratinjau"
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              setPreview(f ? URL.createObjectURL(f) : (post?.imageUrl ?? null));
            }}
            className="block w-full text-[13px] text-paper/70 file:mr-3 file:rounded-full file:border file:border-gold/50 file:bg-gold/10 file:px-4 file:py-1.5 file:text-[11px] file:uppercase file:tracking-[0.15em] file:text-gold-bright"
          />
        </div>

        <div>
          <label className={labelClass}>Teks alternatif foto</label>
          <input
            name="imageAlt"
            defaultValue={post?.imageAlt}
            placeholder="Deskripsi singkat foto (untuk aksesibilitas)"
            className={inputClass}
          />
        </div>

        <label className="flex items-center gap-3 text-[14px] text-paper/85">
          <input
            type="checkbox"
            name="published"
            defaultChecked={post ? post.published : true}
            className="h-4 w-4 accent-[var(--gold)]"
          />
          Terbitkan (tampil di website)
        </label>
        <label className="flex items-center gap-3 text-[14px] text-paper/85">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={post?.featured ?? false}
            className="h-4 w-4 accent-[var(--gold)]"
          />
          Jadikan sorotan di beranda
        </label>
      </aside>
    </form>
  );
}
