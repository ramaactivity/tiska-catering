"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { savePostAction, type FormState } from "@/lib/posts/actions";
import { company, kabarPage } from "@/lib/content";
import { POST_CATEGORIES, type Post, type PostCategory } from "@/lib/posts/types";
import { KATEGORI_WARNA, kategoriLabel } from "@/components/admin/ui";

const fieldCls =
  "w-full rounded-lg border border-line bg-ink-3/60 px-3.5 py-2.5 text-[14px] text-paper outline-none transition-colors placeholder:text-paper/30 focus:border-gold/60 focus:bg-ink-3";
const labelCls = "mb-1.5 block text-[12px] font-medium text-paper/70";
const hintCls = "mt-1.5 text-[12px] leading-[1.5] text-paper/40";

export default function PostForm({ post }: { post?: Post }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    savePostAction,
    null,
  );

  const [judul, setJudul] = useState(post?.judul ?? "");
  const [ringkasan, setRingkasan] = useState(post?.ringkasan ?? "");
  const [kategori, setKategori] = useState<PostCategory>(
    post?.kategori ?? "promo",
  );
  const [periode, setPeriode] = useState(post?.periode ?? "");
  const [preview, setPreview] = useState<string>(post?.imageUrl ?? "");

  return (
    <form action={formAction} className="pb-24">
      {post && <input type="hidden" name="id" value={post.id} />}
      <input type="hidden" name="currentImageUrl" value={post?.imageUrl ?? ""} />

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* ── Kolom utama ── */}
        <div className="grid gap-6">
          <div>
            <label className={labelCls}>Judul</label>
            <input
              name="judul"
              required
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="mis. Paket Syukuran Juni"
              className={`${fieldCls} text-[16px]`}
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className={labelCls + " mb-0"}>Ringkasan</label>
              <span
                className={`text-[11px] tabular-nums ${
                  ringkasan.length > 200 ? "text-amber-400" : "text-paper/35"
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
              className={fieldCls}
            />
            <p className={hintCls}>Tampil di kartu Kabar & jadi ringkasan halaman.</p>
          </div>

          <div>
            <label className={labelCls}>Isi lengkap</label>
            <textarea
              name="isi"
              rows={9}
              defaultValue={post?.isi}
              placeholder={"Cerita selengkapnya.\n\nPisahkan paragraf dengan baris kosong."}
              className={`${fieldCls} leading-[1.7]`}
            />
            <p className={hintCls}>
              Untuk halaman detail. Opsional, boleh dikosongkan.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Teks tombol</label>
              <input
                name="ctaLabel"
                defaultValue={post?.ctaLabel}
                placeholder={kabarPage.ctaDefaultLabel}
                className={fieldCls}
              />
            </div>
            <div>
              <label className={labelCls}>Link tombol</label>
              <input
                name="ctaHref"
                defaultValue={post?.ctaHref}
                placeholder={company.whatsappLink}
                className={fieldCls}
              />
            </div>
            <p className={hintCls + " sm:col-span-2"}>
              Kosongkan untuk pakai tombol WhatsApp ke {company.whatsappNama}.
            </p>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <aside className="grid h-fit gap-5">
          {/* Kartu pratinjau = sekaligus tempat unggah foto */}
          <div>
            <p className="mb-2 text-[12px] font-medium text-paper/70">
              Pratinjau & foto
            </p>
            <div className="overflow-hidden rounded-xl border border-line bg-ink-2/60">
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
                    <div className="absolute inset-0 flex items-center justify-center bg-ink/50 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="rounded-lg bg-paper/15 px-3 py-1.5 text-[12px] font-medium text-paper backdrop-blur-sm">
                        Ganti foto
                      </span>
                    </div>
                    <span
                      className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium"
                      style={{
                        backgroundColor: `${KATEGORI_WARNA[kategori]}26`,
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
                  <div className="absolute inset-0 m-2 flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-line text-center transition-colors group-hover:border-gold/50">
                    <span className="text-[22px] text-gold-soft/70">↑</span>
                    <span className="text-[13px] text-paper/60">Unggah foto</span>
                    <span className="text-[11px] text-paper/35">Wajib · JPG/PNG, maks 8 MB</span>
                  </div>
                )}
              </label>
              <div className="p-3.5">
                <p className="line-clamp-2 text-[15px] font-medium leading-snug text-paper">
                  {judul || "Judul kabar"}
                </p>
                <p className="mt-1 line-clamp-2 text-[12.5px] leading-[1.55] text-paper/55">
                  {ringkasan || "Ringkasan singkat akan tampil di sini."}
                </p>
                {periode && (
                  <p className="mt-2 text-[11px] uppercase tracking-wide text-gold-soft/80">
                    {periode}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className={labelCls}>Teks alternatif foto</label>
            <input
              name="imageAlt"
              defaultValue={post?.imageAlt}
              placeholder="Deskripsi singkat foto"
              className={fieldCls}
            />
            <p className={hintCls}>Untuk aksesibilitas & SEO. Opsional.</p>
          </div>

          <div>
            <label className={labelCls}>Kategori</label>
            <select
              name="kategori"
              value={kategori}
              onChange={(e) => setKategori(e.target.value as PostCategory)}
              className={fieldCls}
            >
              {POST_CATEGORIES.map((k) => (
                <option key={k} value={k} className="bg-ink-3">
                  {kategoriLabel(k)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>Periode</label>
            <input
              name="periode"
              value={periode}
              onChange={(e) => setPeriode(e.target.value)}
              placeholder="mis. Berlaku Juni 2026"
              className={fieldCls}
            />
            <p className={hintCls}>Opsional. Tampil sebagai label kecil.</p>
          </div>

          <div className="grid gap-2 rounded-xl border border-line bg-ink-2/40 p-4">
            <Toggle
              name="published"
              defaultChecked={post ? post.published : true}
              label="Terbitkan"
              hint="Tampilkan di website. Matikan untuk simpan sebagai draft."
            />
            <div className="h-px bg-line" />
            <Toggle
              name="featured"
              defaultChecked={post?.featured ?? false}
              label="Jadikan sorotan"
              hint="Tampil di beranda. Hanya satu sorotan aktif (terbaru menang)."
            />
          </div>
        </aside>
      </div>

      {/* ── Action bar sticky ── */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ink-2/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1080px] items-center justify-between gap-4 px-5 py-3 md:px-8">
          <p className="text-[12px] text-paper/45">
            {state?.error ? (
              <span className="text-red-400">{state.error}</span>
            ) : post ? (
              "Mengedit postingan"
            ) : (
              "Postingan baru"
            )}
          </p>
          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="rounded-lg px-4 py-2 text-[13px] text-paper/60 transition-colors hover:bg-paper/5 hover:text-paper"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={pending}
              className="rounded-lg bg-gold px-5 py-2 text-[13px] font-semibold text-ink transition-colors hover:bg-gold-soft disabled:opacity-50"
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
  label,
  hint,
}: {
  name: string;
  defaultChecked: boolean;
  label: string;
  hint: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 py-1">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <span className="mt-0.5 flex h-5 w-9 shrink-0 items-center rounded-full bg-paper/15 p-0.5 transition-colors peer-checked:bg-gold peer-focus-visible:ring-2 peer-focus-visible:ring-gold/50 peer-checked:[&>span]:translate-x-4">
        <span className="h-4 w-4 rounded-full bg-paper shadow-sm transition-transform" />
      </span>
      <span className="min-w-0">
        <span className="block text-[13px] font-medium text-paper">{label}</span>
        <span className="mt-0.5 block text-[12px] leading-[1.45] text-paper/45">
          {hint}
        </span>
      </span>
    </label>
  );
}
