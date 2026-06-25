import type { Metadata } from "next";
import Link from "next/link";
import { requireSession } from "@/lib/auth";
import PostForm from "@/components/admin/PostForm";

export const metadata: Metadata = {
  title: "Tulis kabar — Backoffice Tiska",
};

export default async function NewPostPage() {
  await requireSession();

  return (
    <>
      <Link
          href="/admin"
          className="text-[13px] text-ad-muted transition-colors hover:text-ad-accent"
        >
          ← Kabar
        </Link>
        <h1 className="mb-6 mt-3 text-[15px] font-medium text-ad-subtle">
          Tulis kabar baru
        </h1>
        <PostForm />
    </>
  );
}
