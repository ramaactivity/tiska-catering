"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { savePostAction, type FormState } from "@/lib/posts/actions";
import { company, kabarPage } from "@/lib/content";
import { POST_CATEGORIES, type Post, type PostCategory } from "@/lib/posts/types";
import { KATEGORI_WARNA, kategoriLabel } from "@/components/admin/ui";
import RichEditor from "@/components/admin/RichEditor";

const field =
  "w-full rounded-xl border border-ad-border bg-ad-input px-3.5 py-2.5 text-[14px] text-ad-text placeholder:text-ad-subtle outline-none transition focus:border-ad-accent focus:shadow-[0_0_0_3px_var(--ad-accent-weak)]";
const label = "mb-1.5 block text-[12.5px] font-semibold text-ad-text";
const hint = "mt-1.5 text-[12px] leading-[1.5] text-ad-subtle";
const panel =
  "rounded-2xl border border-ad-border bg-ad-panel p-4 shadow-[0_1px_3px_var(--ad-shadow)]";
const panelHead =
  "mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-ad-subtle";

export default function PostForm({ post }: { post?: Post }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    savePostAction,
    null,
  );

  const [judul, setJudul] = useState(post?.judul ?? "");
  const [ringkasan, setRingkasan] = useState(post?.ringkasan ?? "");
  const [kategori, setKategori] = useState<PostCategory>(post?.kategori ?? "promo");
  const [periode, setPeriode] = useState(post?.periode ?? "");
  const [preview, setPreview] = useState<string>(post?.imageUrl ?? "");

  return (
    <form action={formAction} className="pb-24">
      {post && <input type="hidden" name="id" value={post.id} />}
      <input type="hidden" name="currentImageUrl" value={post?.imageUrl ?? ""} />

      {/* Judul ala dokumen */}
      <input
        name="judul"
        required
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
        placeholder="Judul kabar…"
        className="w-full border-b border-ad-border bg-transparent pb-2.5 text-[28px] font-bold tracking-tight text-ad-text outline-none transition-colors placeholder:text-ad-subtle/70 focus:border-ad-accent"
      />

      <div className="mt-7 grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_390px]">
        {/* ── Kolom tulis ── */}
        <div className="space-y-6">
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className={label + " mb-0"}>Ringkasan</span>
              <span
                className={`text-[11px] tabular-nums ${
                  ringkasan.length > 200 ? "text-amber-500" : "text-ad-subtle"
                }`}
              >
                {ringkasan.length}
              </span>
            </div>
            <textarea
              name="ringkasan"
              required
              rows={3}
              value={ringkasan}
              onChange={(e) => setRingkasan(e.target.value)}
              placeholder="Satu sampai dua kalimat yang menggugah, tampil di kartu."
              className={field}
            />
            <p className={hint}>Tampil di kartu Kabar & jadi ringkasan halaman.</p>
          </div>

          <div>
            <label className={label}>Isi lengkap</label>
            <RichEditor name="isi" defaultValue={post?.isi ?? ""} />
            <p className={hint}>
              Untuk halaman detail. Pilih teks untuk memformat. Opsional.
            </p>
          </div>

          <div className={panel}>
            <p className={panelHead}>Tombol aksi</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={label}>Teks tombol</label>
                <input
                  name="ctaLabel"
                  defaultValue={post?.ctaLabel}
                  placeholder={kabarPage.ctaDefaultLabel}
                  className={field}
                />
              </div>
              <div>
                <label className={label}>Link tombol</label>
                <input
                  name="ctaHref"
                  defaultValue={post?.ctaHref}
                  placeholder={company.whatsappLink}
                  className={field}
                />
              </div>
            </div>
            <p className={hint}>
              Kosongkan untuk pakai tombol WhatsApp ke {company.whatsappNama}.
            </p>
          </div>
        </div>

        {/* ── Rail pengaturan ── */}
        <aside className="space-y-5 lg:sticky lg:top-20">
          {/* Foto + pratinjau */}
          <div className={panel}>
            <p className={panelHead}>Foto & pratinjau</p>
            <div className="overflow-hidden rounded-xl border border-ad-border bg-ad-input">
              <label className="group relative block aspect-[4/5] cursor-pointer">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    setPreview(f ? URL.createObjectURL(f) : post?.imageUrl ?? "");
                  }}
                />
                {preview ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={preview}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(14,13,10,0.82))]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="rounded-lg bg-white/15 px-3 py-1.5 text-[12px] font-medium text-white backdrop-blur-sm">
                        Ganti foto
                      </span>
                    </div>
                    <span
                      className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-semibold"
                      style={{
                        backgroundColor: `${KATEGORI_WARNA[kategori]}29`,
                        color: KATEGORI_WARNA[kategori],
                      }}
                    >
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: KATEGORI_WARNA[kategori] }}
                      />
                      {kategoriLabel(kategori)}
                    </span>
                  </>
                ) : (
                  <div className="absolute inset-0 m-2 flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-ad-border-strong text-center transition-colors group-hover:border-ad-accent">
                    <span className="text-[22px] text-ad-accent">↑</span>
                    <span className="text-[13px] font-medium text-ad-muted">
                      Unggah foto
                    </span>
                    <span className="text-[11px] text-ad-subtle">
                      Wajib · JPG/PNG, maks 8 MB
                    </span>
                  </div>
                )}
              </label>
              <div className="p-3.5">
                <p className="line-clamp-2 text-[15px] font-semibold leading-snug text-ad-text">
                  {judul || "Judul kabar"}
                </p>
                <p className="mt-1 line-clamp-2 text-[12.5px] leading-[1.55] text-ad-muted">
                  {ringkasan || "Ringkasan singkat akan tampil di sini."}
                </p>
                {periode && (
                  <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-ad-accent">
                    {periode}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-3">
              <label className={label}>Teks alternatif foto</label>
              <input
                name="imageAlt"
                defaultValue={post?.imageAlt}
                placeholder="Deskripsi singkat foto"
                className={field}
              />
              <p className={hint}>Untuk aksesibilitas & SEO. Opsional.</p>
            </div>
          </div>

          {/* Publikasi */}
          <div className={panel}>
            <p className={panelHead}>Publikasi</p>
            <div className="space-y-4">
              <div>
                <label className={label}>Kategori</label>
                <select
                  name="kategori"
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value as PostCategory)}
                  className={field}
                >
                  {POST_CATEGORIES.map((k) => (
                    <option key={k} value={k}>
                      {kategoriLabel(k)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={label}>Periode</label>
                <input
                  name="periode"
                  value={periode}
                  onChange={(e) => setPeriode(e.target.value)}
                  placeholder="mis. Berlaku Juni 2026"
                  className={field}
                />
                <p className={hint}>Opsional. Tampil sebagai label kecil.</p>
              </div>
              <div className="space-y-3 border-t border-ad-border pt-4">
                <Toggle
                  name="published"
                  defaultChecked={post ? post.published : true}
                  title="Terbitkan"
                  hint="Tampilkan di website. Matikan untuk simpan sebagai draft."
                />
                <Toggle
                  name="featured"
                  defaultChecked={post?.featured ?? false}
                  title="Jadikan sorotan"
                  hint="Tampil di beranda. Hanya satu sorotan aktif (terbaru menang)."
                />
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ── Action bar sticky ── */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ad-border bg-ad-panel/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3 md:px-8">
          <p className="text-[12px]">
            {state?.error ? (
              <span className="font-medium text-ad-danger">{state.error}</span>
            ) : (
              <span className="text-ad-subtle">
                {post ? "Mengedit postingan" : "Postingan baru"}
              </span>
            )}
          </p>
          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="rounded-lg px-4 py-2 text-[13px] text-ad-muted transition-colors hover:bg-ad-bg hover:text-ad-text"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={pending}
              className="rounded-lg bg-ad-btn px-5 py-2 text-[13px] font-semibold text-ad-btn-fg shadow-[0_1px_2px_var(--ad-shadow)] transition hover:brightness-[1.06] disabled:opacity-50"
            >
              {pending ? "Menyimpan…" : post ? "Simpan perubahan" : "Terbitkan"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

function Toggle({
  name,
  defaultChecked,
  title,
  hint,
}: {
  name: string;
  defaultChecked: boolean;
  title: string;
  hint: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <span className="mt-0.5 flex h-5 w-9 shrink-0 items-center rounded-full bg-ad-border-strong p-0.5 transition-colors peer-checked:bg-ad-btn peer-focus-visible:ring-2 peer-focus-visible:ring-ad-accent peer-checked:[&>span]:translate-x-4">
        <span className="h-4 w-4 rounded-full bg-[#fcfaf5] shadow-sm transition-transform" />
      </span>
      <span className="min-w-0">
        <span className="block text-[13px] font-semibold text-ad-text">{title}</span>
        <span className="mt-0.5 block text-[12px] leading-[1.45] text-ad-subtle">
          {hint}
        </span>
      </span>
    </label>
  );
}
