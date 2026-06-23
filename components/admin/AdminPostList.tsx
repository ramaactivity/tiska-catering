"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Post } from "@/lib/posts/types";
import {
  KategoriBadge,
  StatusBadge,
  formatTanggal,
} from "@/components/admin/ui";
import DeleteButton from "@/components/admin/DeleteButton";

type Filter = "all" | "published" | "draft";

export default function AdminPostList({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const jml = useMemo(
    () => ({
      all: posts.length,
      published: posts.filter((p) => p.published).length,
      draft: posts.filter((p) => !p.published).length,
    }),
    [posts],
  );

  const tampil = useMemo(() => {
    if (filter === "published") return posts.filter((p) => p.published);
    if (filter === "draft") return posts.filter((p) => !p.published);
    return posts;
  }, [posts, filter]);

  if (posts.length === 0) return <EmptyState />;

  return (
    <div>
      <div className="mb-4 flex items-center gap-1">
        <Tab aktif={filter === "all"} onClick={() => setFilter("all")}>
          Semua <Count>{jml.all}</Count>
        </Tab>
        <Tab
          aktif={filter === "published"}
          onClick={() => setFilter("published")}
        >
          Terbit <Count>{jml.published}</Count>
        </Tab>
        <Tab aktif={filter === "draft"} onClick={() => setFilter("draft")}>
          Draft <Count>{jml.draft}</Count>
        </Tab>
      </div>

      {tampil.length === 0 ? (
        <p className="rounded-2xl border border-ad-border bg-ad-panel py-14 text-center text-[14px] text-ad-muted shadow-[0_1px_2px_var(--ad-shadow)]">
          Tidak ada postingan {filter === "draft" ? "draft" : "terbit"}.
        </p>
      ) : (
        <ul className="divide-y divide-ad-border overflow-hidden rounded-2xl border border-ad-border bg-ad-panel shadow-[0_1px_3px_var(--ad-shadow)]">
          {tampil.map((post) => (
            <PostRow key={post.id} post={post} />
          ))}
        </ul>
      )}
    </div>
  );
}

function PostRow({ post }: { post: Post }) {
  return (
    <li className="group relative flex items-center gap-4 px-3.5 py-3 transition-colors hover:bg-[var(--ad-accent-weak)]">
      <Link
        href={`/admin/posts/${post.id}`}
        className="flex min-w-0 flex-1 items-center gap-4"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.imageUrl}
          alt=""
          className="h-16 w-16 shrink-0 rounded-lg object-cover ring-1 ring-ad-border"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold text-ad-text transition-colors group-hover:text-ad-accent">
            {post.judul}
            {post.featured && (
              <span className="ml-2 align-middle text-[11px] font-semibold text-ad-accent">
                ★ Sorotan
              </span>
            )}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <KategoriBadge kategori={post.kategori} />
            <StatusBadge published={post.published} />
            <span className="text-[11px] text-ad-subtle">
              Diperbarui {formatTanggal(post.updatedAt)}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex shrink-0 items-center gap-0.5">
        {post.published && (
          <Link
            href={`/kabar/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-2.5 py-1.5 text-[12px] text-ad-muted transition-colors hover:bg-ad-bg hover:text-ad-text"
          >
            Lihat
          </Link>
        )}
        <Link
          href={`/admin/posts/${post.id}`}
          className="rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-ad-accent transition-colors hover:bg-ad-bg"
        >
          Edit
        </Link>
        <DeleteButton id={post.id} judul={post.judul} />
      </div>
    </li>
  );
}

function Tab({
  aktif,
  onClick,
  children,
}: {
  aktif: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={aktif}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors ${
        aktif
          ? "bg-[var(--ad-accent-weak)] text-ad-accent"
          : "text-ad-muted hover:bg-[var(--ad-accent-weak)] hover:text-ad-text"
      }`}
    >
      {children}
    </button>
  );
}

function Count({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-ad-bg px-1.5 text-[11px] tabular-nums text-ad-muted">
      {children}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-ad-border-strong bg-ad-panel px-6 py-16 text-center shadow-[0_1px_2px_var(--ad-shadow)]">
      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ad-accent-weak)] text-[20px] text-ad-accent">
        ✦
      </div>
      <h2 className="text-[18px] font-semibold text-ad-text">Belum ada kabar</h2>
      <p className="mx-auto mt-2 max-w-[440px] text-[14px] leading-[1.7] text-ad-muted">
        Tulis kabar pertamamu: penawaran bulan ini, menu musiman baru, atau cerita
        acara yang baru kamu layani. Tampil otomatis di halaman Kabar.
      </p>
      <Link
        href="/admin/posts/new"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-ad-btn px-5 py-2.5 text-[13px] font-semibold text-ad-btn-fg shadow-[0_1px_2px_var(--ad-shadow)] transition hover:brightness-[1.06] active:scale-[0.98]"
      >
        Tulis kabar pertama
      </Link>
      <div className="mt-6 flex flex-wrap justify-center gap-2 text-[12px] text-ad-subtle">
        <span className="rounded-full border border-ad-border px-3 py-1">
          Promo bulan ini
        </span>
        <span className="rounded-full border border-ad-border px-3 py-1">
          Menu musiman
        </span>
        <span className="rounded-full border border-ad-border px-3 py-1">
          Kabar acara
        </span>
      </div>
    </div>
  );
}
