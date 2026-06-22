import type { Metadata } from "next";
import Link from "next/link";
import { requireSession } from "@/lib/auth";
import AdminHeader from "@/components/admin/AdminHeader";
import PostForm from "@/components/admin/PostForm";

export const metadata: Metadata = {
  title: "Tulis kabar — Backoffice Tiska",
};

export default async function NewPostPage() {
  await requireSession();

  return (
    <>
      <AdminHeader />
      <main className="mx-auto max-w-[1400px] px-5 py-8 md:px-8 md:py-10">
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
      </main>
    </>
  );
}
