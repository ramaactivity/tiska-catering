"use client";

import { deletePostAction } from "@/lib/posts/actions";

export default function DeleteButton({
  id,
  judul,
}: {
  id: string;
  judul: string;
}) {
  return (
    <form
      action={deletePostAction}
      onSubmit={(e) => {
        if (!confirm(`Hapus "${judul}"? Tindakan ini tidak bisa dibatalkan.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-[12px] uppercase tracking-[0.14em] text-red-400/80 transition-colors hover:text-red-400"
      >
        Hapus
      </button>
    </form>
  );
}
