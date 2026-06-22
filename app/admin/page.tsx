import type { Metadata } from "next";
import Link from "next/link";
import { requireSession } from "@/lib/auth";
import { logoutAction } from "@/lib/posts/actions";
import { getAllPosts } from "@/lib/posts/store";
import { kabarPage } from "@/lib/content";
import DeleteButton from "@/components/admin/DeleteButton";

export const metadata: Metadata = {
  title: "Kelola Kabar — Backoffice Tiska",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await requireSession();
  const posts = await getAllPosts();

  return (
    <main className="min-h-svh bg-ink px-6 py-12 md:px-10">
      <div className="mx-auto max-w-[1000px]">
        <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-[30px] font-light text-paper">
              Kabar & Sorotan
            </h1>
            <p className="mt-1 text-[13px] text-paper/55">
              {posts.length} postingan ·{" "}
              <Link href="/kabar" className="text-gold-soft hover:underline">
                lihat halaman publik
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/posts/new"
              className="rounded-full border border-gold/70 bg-gold/10 px-6 py-2.5 text-[12px] uppercase tracking-[0.18em] text-gold-bright transition-colors hover:bg-gold/20"
            >
              + Tambah
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-[12px] uppercase tracking-[0.16em] text-paper/55 transition-colors hover:text-gold-soft"
              >
                Keluar
              </button>
            </form>
          </div>
        </header>

        {posts.length === 0 ? (
          <div className="rounded-xl border border-line bg-ink-2/40 py-16 text-center">
            <p className="text-[15px] text-paper/60">Belum ada postingan.</p>
            <Link
              href="/admin/posts/new"
              className="mt-4 inline-block text-[13px] uppercase tracking-[0.16em] text-gold-soft hover:underline"
            >
              Buat yang pertama →
            </Link>
          </div>
        ) : (
          <ul className="grid gap-3">
            {posts.map((post) => (
              <li
                key={post.id}
                className="flex items-center gap-4 rounded-xl border border-line bg-ink-2/40 p-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.imageUrl}
                  alt=""
                  className="h-16 w-16 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-[18px] font-light text-paper">
                    {post.judul}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.12em]">
                    <span className="text-gold-soft">
                      {kabarPage.kategoriLabel[post.kategori]}
                    </span>
                    <span
                      className={
                        post.published ? "text-teal" : "text-paper/40"
                      }
                    >
                      · {post.published ? "Terbit" : "Draft"}
                    </span>
                    {post.featured && (
                      <span className="text-gold-bright">· Sorotan</span>
                    )}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="text-[12px] uppercase tracking-[0.14em] text-gold-soft transition-colors hover:text-gold-bright"
                  >
                    Edit
                  </Link>
                  <DeleteButton id={post.id} judul={post.judul} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
