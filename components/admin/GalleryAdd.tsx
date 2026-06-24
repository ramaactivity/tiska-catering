"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addGalleryAction, type FormState } from "@/lib/gallery/actions";
import CropImageInput from "@/components/admin/CropImageInput";

const field =
  "w-full rounded-xl border border-ad-border bg-ad-input px-3.5 py-2.5 text-[14px] text-ad-text placeholder:text-ad-subtle outline-none transition focus:border-ad-accent focus:shadow-[0_0_0_3px_var(--ad-accent-weak)]";
const label = "mb-1.5 block text-[12.5px] font-semibold text-ad-text";

export default function GalleryAdd() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<FormState, FormData>(addGalleryAction, null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (state?.ok) {
      setKey((k) => k + 1); // reset field (termasuk foto) untuk tambah berikutnya
      router.refresh();
    }
  }, [state, router]);

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-ad-border bg-ad-panel p-4 shadow-[0_1px_3px_var(--ad-shadow)]"
    >
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-ad-subtle">
        Tambah foto galeri
      </p>
      <div key={key} className="grid gap-4 md:grid-cols-[200px_1fr]">
        <div className="overflow-hidden rounded-xl border border-ad-border bg-ad-input">
          <CropImageInput
            name="image"
            aspect={4 / 5}
            ratioLabel="4:5"
            aspectClass="aspect-[4/5]"
            sizeHint="Disarankan 1000×1250"
          />
        </div>
        <div className="grid content-start gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>Kategori / label</label>
              <input name="kategori" placeholder="mis. Pernikahan, Buffet" className={field} />
            </div>
            <div>
              <label className={label}>Urutan</label>
              <input type="number" name="urutan" defaultValue={0} className={field} />
            </div>
          </div>
          <div>
            <label className={label}>Judul / caption (opsional)</label>
            <input
              name="judul"
              placeholder="mis. Resepsi pernikahan adat di Bogor"
              className={field}
            />
            <p className="mt-1 text-[11px] text-ad-subtle">
              Tampil di billboard &amp; lightbox. Bila kosong, memakai teks alternatif.
            </p>
          </div>
          <div>
            <label className={label}>Teks alternatif</label>
            <input name="imageAlt" placeholder="Deskripsi singkat foto (untuk aksesibilitas)" className={field} />
          </div>
          {state?.error && <p className="text-[12px] text-ad-danger">{state.error}</p>}
          <div>
            <button
              type="submit"
              disabled={pending}
              className="rounded-lg bg-ad-btn px-5 py-2.5 text-[13px] font-semibold text-ad-btn-fg shadow-[0_1px_2px_var(--ad-shadow)] transition hover:brightness-[1.06] active:scale-[0.98] disabled:opacity-50"
            >
              {pending ? "Menambahkan…" : "Tambah ke galeri"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
