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
      <main className="mx-auto max-w-[1100px] px-5 py-9 md:px-8 md:py-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-[27px] font-bold tracking-tight text-ad-text">
              Kabar
            </h1>
            <p className="mt-1 text-[14px] text-ad-muted">
              Kelola promo, momen spesial, menu musiman & kabar acara.
            </p>
          </div>
          {posts.length > 0 && (
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-1.5 rounded-lg bg-ad-btn px-4 py-2.5 text-[13px] font-semibold text-ad-btn-fg shadow-[0_1px_2px_var(--ad-shadow)] transition hover:brightness-[1.06] active:scale-[0.98]"
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
