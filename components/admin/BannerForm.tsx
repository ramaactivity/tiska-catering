"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { saveBannerAction, type FormState } from "@/lib/banners/actions";
import { company } from "@/lib/content";
import type { Banner } from "@/lib/banners/types";
import CropImageInput from "@/components/admin/CropImageInput";

const field =
  "w-full rounded-xl border border-ad-border bg-ad-input px-3.5 py-2.5 text-[14px] text-ad-text placeholder:text-ad-subtle outline-none transition focus:border-ad-accent focus:shadow-[0_0_0_3px_var(--ad-accent-weak)]";
const label = "mb-1.5 block text-[12.5px] font-semibold text-ad-text";
const hint = "mt-1.5 text-[12px] leading-[1.5] text-ad-subtle";
const panel = "rounded-2xl bg-ad-panel p-5 shadow-[0_1px_3px_var(--ad-shadow)] ring-1 ring-inset ring-ad-border/70";
const panelHead = "mb-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ad-subtle";

type BannerDefaults = { judul?: string; label?: string; mulaiAt?: string; selesaiAt?: string };

export default function BannerForm({
  banner,
  defaults,
}: {
  banner?: Banner;
  defaults?: BannerDefaults;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(saveBannerAction, null);
  const [judul, setJudul] = useState(banner?.judul ?? defaults?.judul ?? "");
  const [subjudul, setSubjudul] = useState(banner?.subjudul ?? "");
  const [labelTxt, setLabelTxt] = useState(banner?.label ?? defaults?.label ?? "");

  return (
    <form action={formAction} className="pb-24">
      {banner && <input type="hidden" name="id" value={banner.id} />}
      <input type="hidden" name="currentImageUrl" value={banner?.imageUrl ?? ""} />

      <input
        name="judul"
        required
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
        placeholder="Judul banner…"
        className="w-full border-b border-ad-border bg-transparent pb-2.5 font-display text-[clamp(26px,3vw,32px)] font-light tracking-tight text-ad-text outline-none transition-colors placeholder:text-ad-subtle/60 focus:border-ad-accent"
      />

      <div className="mt-7 grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-6">
          <div>
            <label className={label}>Subjudul</label>
            <textarea
              name="subjudul"
              rows={2}
              value={subjudul}
              onChange={(e) => setSubjudul(e.target.value)}
              placeholder="Kalimat pendukung singkat (opsional)."
              className={field}
            />
          </div>
          <div>
            <label className={label}>Label kecil</label>
            <input
              name="label"
              value={labelTxt}
              onChange={(e) => setLabelTxt(e.target.value)}
              placeholder="mis. Promo Juni · Campaign"
              className={field}
            />
            <p className={hint}>Teks kecil di atas judul (opsional).</p>
          </div>
          <details className={panel} open={!!banner?.en}>
            <summary className={panelHead + " mb-0 cursor-pointer"}>
              Versi Inggris (opsional)
            </summary>
            <div className="mt-4 space-y-4">
              <p className={hint + " mt-0"}>
                Isi agar banner ini tampil di beranda berbahasa Inggris (/en).
                Kosongkan judulnya bila belum diterjemahkan — banner akan
                dilewati di /en, bukan ditampilkan berbahasa Indonesia.
              </p>
              <div>
                <label className={label}>Title</label>
                <input name="judulEn" defaultValue={banner?.en?.judul} className={field} />
              </div>
              <div>
                <label className={label}>Subtitle</label>
                <textarea
                  name="subjudulEn"
                  rows={2}
                  defaultValue={banner?.en?.subjudul}
                  className={field}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={label}>Small label</label>
                  <input
                    name="labelEn"
                    defaultValue={banner?.en?.label}
                    placeholder="e.g. Featured Service"
                    className={field}
                  />
                </div>
                <div>
                  <label className={label}>Button text</label>
                  <input
                    name="ctaLabelEn"
                    defaultValue={banner?.en?.ctaLabel}
                    placeholder="e.g. Ask on WhatsApp"
                    className={field}
                  />
                </div>
              </div>
            </div>
          </details>

          <div className={panel}>
            <p className={panelHead}>Tombol</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={label}>Teks tombol</label>
                <input name="ctaLabel" defaultValue={banner?.ctaLabel} placeholder="mis. Selengkapnya" className={field} />
              </div>
              <div>
                <label className={label}>Link tombol</label>
                <input name="ctaHref" defaultValue={banner?.ctaHref} placeholder={`${company.whatsappLink} atau /kabar`} className={field} />
              </div>
            </div>
            <p className={hint}>Boleh link luar (https://…) atau halaman dalam (mis. /kabar). Kosongkan tombol jika tak perlu.</p>
          </div>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-20">
          <div className={panel}>
            <p className={panelHead}>Gambar & pratinjau (landscape)</p>
            <CropImageInput
              name="image"
              aspect={16 / 9}
              ratioLabel="16:9"
              aspectClass="aspect-[16/9]"
              currentUrl={banner?.imageUrl}
              sizeHint="Disarankan 1600×900 · maks 8 MB"
              className="rounded-xl border border-ad-border bg-ad-input"
            >
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,11,8,0.85),transparent_65%)]" />
              <div className="absolute inset-0 flex flex-col justify-center px-5 text-left">
                {labelTxt && <span className="mb-1.5 text-[9px] uppercase tracking-[0.25em] text-gold-soft">{labelTxt}</span>}
                <span className="font-display text-[20px] font-light leading-tight text-paper">{judul || "Judul banner"}</span>
                {subjudul && <span className="mt-1 line-clamp-2 text-[11px] text-paper/80">{subjudul}</span>}
              </div>
            </CropImageInput>
            <div className="mt-3">
              <label className={label}>Teks alternatif</label>
              <input name="imageAlt" defaultValue={banner?.imageAlt} placeholder="Deskripsi singkat gambar" className={field} />
            </div>
          </div>

          <div className={panel}>
            <p className={panelHead}>Pengaturan</p>
            <div className="space-y-4">
              <div>
                <label className={label}>Urutan</label>
                <input type="number" name="urutan" defaultValue={banner?.urutan ?? 0} className={field} />
                <p className={hint}>Angka kecil tampil lebih dulu.</p>
              </div>
              <div className="border-t border-ad-border pt-4">
                <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ad-subtle">Jadwal tayang</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className={label}>Tampil mulai</label>
                    <input type="date" name="mulaiAt" defaultValue={banner?.mulaiAt ?? defaults?.mulaiAt} className={field} />
                  </div>
                  <div>
                    <label className={label}>Sampai</label>
                    <input type="date" name="selesaiAt" defaultValue={banner?.selesaiAt ?? defaults?.selesaiAt} className={field} />
                  </div>
                </div>
                <p className={hint}>
                  Opsional. Kosongkan untuk tayang tanpa batas. Banner otomatis muncul &amp;
                  berhenti sesuai jadwal (zona WIB) — cocok untuk Lebaran, Natal, HUT RI, dsb.
                </p>
              </div>
              <div className="border-t border-ad-border pt-4">
                <label className="flex cursor-pointer items-start gap-3">
                  <input type="checkbox" name="aktif" defaultChecked={banner ? banner.aktif : true} className="peer sr-only" />
                  <span className="mt-0.5 flex h-5 w-9 shrink-0 items-center rounded-full bg-ad-border-strong p-0.5 transition-colors peer-checked:bg-ad-btn peer-checked:[&>span]:translate-x-4">
                    <span className="h-4 w-4 rounded-full bg-[#fcfaf5] shadow-sm transition-transform" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-ad-text">Aktif</span>
                    <span className="mt-0.5 block text-[12px] leading-[1.45] text-ad-subtle">Tampilkan di carousel beranda.</span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ad-border bg-ad-panel/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3 md:px-8">
          <p className="text-[12px]">
            {state?.error ? (
              <span className="font-medium text-ad-danger">{state.error}</span>
            ) : (
              <span className="text-ad-subtle">{banner ? "Mengedit banner" : "Banner baru"}</span>
            )}
          </p>
          <div className="flex items-center gap-2">
            <Link href="/admin/banners" className="rounded-xl px-4 py-2 text-[13px] text-ad-muted transition-colors hover:bg-ad-bg hover:text-ad-text">
              Batal
            </Link>
            <button
              type="submit"
              disabled={pending}
              className="rounded-xl bg-ad-btn px-5 py-2 text-[13px] font-semibold text-ad-btn-fg shadow-[0_1px_2px_var(--ad-shadow)] transition hover:brightness-[1.06] active:scale-[0.98] disabled:opacity-50"
            >
              {pending ? "Menyimpan…" : banner ? "Simpan perubahan" : "Tambah banner"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
