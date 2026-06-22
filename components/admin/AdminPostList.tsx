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
      <div className="mb-5 flex items-center gap-1">
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
        <p className="rounded-xl border border-line bg-ink-2/40 py-12 text-center text-[14px] text-paper/50">
          Tidak ada postingan {filter === "draft" ? "draft" : "terbit"}.
        </p>
      ) : (
        <ul className="overflow-hidden rounded-xl border border-line bg-ink-2/40 divide-y divide-line">
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
    <li className="group relative flex items-center gap-4 px-3 py-3 transition-colors hover:bg-paper/[0.03]">
      <Link
        href={`/admin/posts/${post.id}`}
        className="flex min-w-0 flex-1 items-center gap-4"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.imageUrl}
          alt=""
          className="h-14 w-14 shrink-0 rounded-lg object-cover ring-1 ring-line"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-medium text-paper transition-colors group-hover:text-gold-soft">
            {post.judul}
            {post.featured && (
              <span className="ml-2 align-middle text-[11px] font-medium text-gold-bright">
                ★ Sorotan
              </span>
            )}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <KategoriBadge kategori={post.kategori} />
            <StatusBadge published={post.published} />
            <span className="text-[11px] text-paper/35">
              Diperbarui {formatTanggal(post.updatedAt)}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex shrink-0 items-center gap-1">
        {post.published && (
          <Link
            href={`/kabar/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-2.5 py-1.5 text-[12px] text-paper/55 transition-colors hover:bg-paper/5 hover:text-paper"
          >
            Lihat
          </Link>
        )}
        <Link
          href={`/admin/posts/${post.id}`}
          className="rounded-md px-2.5 py-1.5 text-[12px] text-gold-soft transition-colors hover:bg-gold/10 hover:text-gold-bright"
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
          ? "bg-gold/12 text-gold-bright"
          : "text-paper/55 hover:bg-paper/5 hover:text-paper"
      }`}
    >
      {children}
    </button>
  );
}

function Count({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-paper/10 px-1.5 text-[11px] tabular-nums text-paper/60">
      {children}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-ink-2/30 px-6 py-16 text-center">
      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-[20px] text-gold-soft">
        ✦
      </div>
      <h2 className="text-[18px] font-medium text-paper">Belum ada kabar</h2>
      <p className="mx-auto mt-2 max-w-[420px] text-[14px] leading-[1.7] text-paper/55">
        Tulis kabar pertamamu — penawaran bulan ini, menu musiman baru, atau
        cerita acara yang baru kamu layani. Tampil otomatis di halaman Kabar.
      </p>
      <Link
        href="/admin/posts/new"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-gold-soft"
      >
        Tulis kabar pertama
      </Link>
      <div className="mt-6 flex flex-wrap justify-center gap-2 text-[12px] text-paper/40">
        <span className="rounded-full border border-line px-3 py-1">
          Promo bulan ini
        </span>
        <span className="rounded-full border border-line px-3 py-1">
          Menu musiman
        </span>
        <span className="rounded-full border border-line px-3 py-1">
          Kabar acara
        </span>
      </div>
    </div>
  );
}
