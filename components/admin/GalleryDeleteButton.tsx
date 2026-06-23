"use client";

import { deleteGalleryAction } from "@/lib/gallery/actions";

export default function GalleryDeleteButton({ id }: { id: string }) {
  return (
    <form
      action={deleteGalleryAction}
      onSubmit={(e) => {
        if (!confirm("Hapus foto ini dari galeri?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-md bg-ink/55 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-red-600/80"
      >
        Hapus
      </button>
    </form>
  );
}
