import type { Metadata } from "next";
import Link from "next/link";
import { requireSession } from "@/lib/auth";
import { getAllPosts } from "@/lib/posts/store";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminPostList from "@/components/admin/AdminPostList";

export const metadata: Metadata = {
  title: "Kelola Kabar — Backoffice Tiska",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await requireSession();
  const posts = await getAllPosts();

  return (
    <>
      <AdminHeader />
      <main className="mx-auto max-w-[1080px] px-5 py-8 md:px-8 md:py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-[26px] font-semibold tracking-tight text-paper">
              Kabar
            </h1>
            <p className="mt-1 text-[14px] text-paper/55">
              Kelola promo, momen spesial, menu musiman & kabar acara.
            </p>
          </div>
          {posts.length > 0 && (
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-gold-soft"
            >
              <span className="text-[15px] leading-none">+</span> Tulis kabar
            </Link>
          )}
        </div>

        <AdminPostList posts={posts} />
      </main>
    </>
  );
}
