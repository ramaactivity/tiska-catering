import type { Metadata } from "next";
import { requireSession } from "@/lib/auth";
import { getAllGallery } from "@/lib/gallery/store";
import { seedGalleryAction } from "@/lib/gallery/actions";
import GalleryAdd from "@/components/admin/GalleryAdd";
import GalleryDeleteButton from "@/components/admin/GalleryDeleteButton";

export const metadata: Metadata = { title: "Galeri — Backoffice Tiska" };
export const dynamic = "force-dynamic";

export default async function GalleryAdminPage() {
  await requireSession();
  const items = await getAllGallery();

  return (
    <>
      <div className="mb-6">
          <h1 className="text-[27px] font-bold tracking-tight text-ad-text">Galeri</h1>
          <p className="mt-1 max-w-[640px] text-[14px] leading-[1.6] text-ad-muted">
            Foto-foto di halaman Galeri. Tambah dengan crop, atur urutan & kategori,
            hapus yang tak terpakai. Selama kosong, halaman publik memakai foto bawaan.
          </p>
        </div>

        <div className="mb-8">
          <GalleryAdd />
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ad-border-strong bg-ad-panel px-6 py-12 text-center shadow-[0_1px_2px_var(--ad-shadow)]">
            <p className="text-[15px] font-semibold text-ad-text">Galeri masih memakai foto bawaan</p>
            <p className="mx-auto mt-2 max-w-[460px] text-[14px] leading-[1.7] text-ad-muted">
              Tambahkan foto di atas, atau mulai dari foto bawaan supaya bisa kamu
              kelola (atur ulang & ganti dengan foto asli).
            </p>
            <form action={seedGalleryAction} className="mt-5">
              <button
                type="submit"
                className="rounded-lg border border-ad-border bg-ad-input px-5 py-2.5 text-[13px] font-medium text-ad-text transition-colors hover:border-ad-accent hover:text-ad-accent active:scale-[0.98]"
              >
                Mulai dari foto bawaan
              </button>
            </form>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((it) => (
              <div key={it.id} className="group relative overflow-hidden rounded-xl border border-ad-border bg-ad-panel">
                <div className="relative aspect-[4/5]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={it.imageUrl} alt={it.imageAlt} className="absolute inset-0 h-full w-full object-cover" />
                  <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(12,11,8,0.75))]" />
                  <div className="absolute bottom-2 left-2.5 text-[11px] font-medium text-white">
                    {it.kategori}
                    <span className="ml-1.5 text-white/60">· {it.urutan}</span>
                  </div>
                  <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <GalleryDeleteButton id={it.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
    </>
  );
}
