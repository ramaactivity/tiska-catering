import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth";
import { getPostById } from "@/lib/posts/store";
import PostForm from "@/components/admin/PostForm";
import DeleteButton from "@/components/admin/DeleteButton";

export const metadata: Metadata = {
  title: "Edit kabar — Backoffice Tiska",
};

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Params) {
  await requireSession();
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <>
      <Link
          href="/admin"
          className="text-[13px] text-ad-muted transition-colors hover:text-ad-accent"
        >
          ← Kabar
        </Link>
        <div className="mb-6 mt-3 flex items-center justify-between gap-4">
          <h1 className="text-[15px] font-medium text-ad-subtle">Edit kabar</h1>
          <DeleteButton id={post.id} judul={post.judul} />
        </div>
        <PostForm post={post} />
    </>
  );
}
