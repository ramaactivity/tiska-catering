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
        className="rounded-md px-2.5 py-1.5 text-[12px] text-paper/45 transition-colors hover:bg-red-500/10 hover:text-red-400"
      >
        Hapus
      </button>
    </form>
  );
}
