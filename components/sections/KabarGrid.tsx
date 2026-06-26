"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Post, PostCategory } from "@/lib/posts/types";
import { kabarPage } from "@/lib/content";
import Reveal from "@/components/motion/Reveal";

type KabarGridProps = {
  posts: Post[];
};

/** Daftar kabar di /kabar — filter kategori (client) + grid kartu reveal. */
export default function KabarGrid({ posts }: KabarGridProps) {
  const [filter, setFilter] = useState<PostCategory | "all">("all");

  // Hanya tampilkan tab kategori yang benar-benar punya isi.
  const kategoriTersedia = useMemo(() => {
    const set = new Set(posts.map((p) => p.kategori));
    return (Object.keys(kabarPage.kategoriLabel) as PostCategory[]).filter((k) =>
      set.has(k),
    );
  }, [posts]);

  const tampil = useMemo(
    () => (filter === "all" ? posts : posts.filter((p) => p.kategori === filter)),
    [posts, filter],
  );

  return (
    <section className="bg-ink px-6 pb-20 md:px-10 md:pb-[16vh]">
      <div className="mx-auto max-w-[1280px]">
        {posts.length === 0 ? (
          <p className="py-16 text-center text-[15px] leading-[1.8] text-paper/60 md:py-[8vh]">
            {kabarPage.kosong}
          </p>
        ) : (
          <>
            {kategoriTersedia.length > 1 && (
              <div className="mb-10 flex flex-wrap items-center gap-2.5">
                <FilterPill
                  aktif={filter === "all"}
                  onClick={() => setFilter("all")}
                >
                  {kabarPage.semua}
                </FilterPill>
                {kategoriTersedia.map((k) => (
                  <FilterPill
                    key={k}
                    aktif={filter === k}
                    onClick={() => setFilter(k)}
                  >
                    {kabarPage.kategoriLabel[k]}
                  </FilterPill>
                ))}
              </div>
            )}

            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {tampil.map((post, i) => (
                <Reveal key={post.id} delay={(i % 3) * 0.08}>
                  <KabarCard post={post} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function FilterPill({
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
      className={`rounded-full border px-5 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
        aktif
          ? "border-gold bg-gold/10 text-gold-bright"
          : "border-line text-paper/65 hover:border-gold/50 hover:text-gold-soft"
      }`}
    >
      {children}
    </button>
  );
}

export function KabarCard({ post }: { post: Post }) {
  return (
    <Link href={`/kabar/${post.slug}`} className="group block">
      <figure className="relative aspect-[4/5] overflow-hidden rounded-lg">
        <Image
          src={post.imageUrl}
          alt={post.imageAlt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-[1300ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:scale-[1.06]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(14,13,10,0.82))]"
        />
        <figcaption className="absolute inset-x-5 bottom-4 flex items-center gap-3 text-[10.5px] uppercase tracking-[0.22em] text-gold-soft">
          <span>{kabarPage.kategoriLabel[post.kategori]}</span>
          {post.periode && (
            <>
              <span aria-hidden className="h-px w-5 bg-gold/50" />
              <span className="text-paper/70">{post.periode}</span>
            </>
          )}
        </figcaption>
      </figure>
      <h3 className="mt-5 font-display text-[clamp(20px,2vw,26px)] font-light leading-[1.2] text-paper transition-colors duration-300 group-hover:text-gold-soft">
        {post.judul}
      </h3>
      <p className="mt-2.5 line-clamp-3 text-[14px] leading-[1.7] text-paper/65">
        {post.ringkasan}
      </p>
    </Link>
  );
}
