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
      <main className="mx-auto max-w-[1080px] px-5 py-8 md:px-8 md:py-10">
        <Link
          href="/admin"
          className="text-[13px] text-paper/50 transition-colors hover:text-gold-soft"
        >
          ← Kabar
        </Link>
        <h1 className="mb-7 mt-3 text-[24px] font-semibold tracking-tight text-paper">
          Tulis kabar
        </h1>
        <PostForm />
      </main>
    </>
  );
}
