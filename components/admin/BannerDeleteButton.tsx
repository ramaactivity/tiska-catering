"use client";

import { deleteBannerAction } from "@/lib/banners/actions";

export default function BannerDeleteButton({ id, judul }: { id: string; judul: string }) {
  return (
    <form
      action={deleteBannerAction}
      onSubmit={(e) => {
        if (!confirm(`Hapus banner "${judul}"?`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-lg px-2.5 py-1.5 text-[12px] text-ad-subtle transition-colors hover:bg-ad-danger/10 hover:text-ad-danger"
      >
        Hapus
      </button>
    </form>
  );
}
