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
        className="rounded-lg px-2.5 py-1.5 text-[12px] text-ad-subtle transition-colors hover:bg-ad-danger/10 hover:text-ad-danger"
      >
        Hapus
      </button>
    </form>
  );
}
