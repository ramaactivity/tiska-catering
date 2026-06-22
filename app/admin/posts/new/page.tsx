import type { Metadata } from "next";
import Link from "next/link";
import { requireSession } from "@/lib/auth";
import PostForm from "@/components/admin/PostForm";

export const metadata: Metadata = {
  title: "Postingan baru — Backoffice Tiska",
  robots: { index: false, follow: false },
};

export default async function NewPostPage() {
  await requireSession();

  return (
    <main className="min-h-svh bg-ink px-6 py-12 md:px-10">
      <div className="mx-auto max-w-[1000px]">
        <Link
          href="/admin"
          className="text-[12px] uppercase tracking-[0.16em] text-paper/55 transition-colors hover:text-gold-soft"
        >
          ← Kembali
        </Link>
        <h1 className="mb-8 mt-4 font-display text-[30px] font-light text-paper">
          Postingan baru
        </h1>
        <PostForm />
      </div>
    </main>
  );
}
