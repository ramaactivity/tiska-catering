import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth";
import { getPostById } from "@/lib/posts/store";
import PostForm from "@/components/admin/PostForm";

export const metadata: Metadata = {
  title: "Edit postingan — Backoffice Tiska",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Params) {
  await requireSession();
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

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
          Edit postingan
        </h1>
        <PostForm post={post} />
      </div>
    </main>
  );
}
