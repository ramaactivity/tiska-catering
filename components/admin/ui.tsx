/**
 * Primitif UI bersama untuk backoffice — kosakata komponen konsisten
 * (badge kategori & status, format tanggal). Tanpa hook → aman di server & client.
 */

import { kabarPage } from "@/lib/content";
import type { PostCategory } from "@/lib/posts/types";

/** Warna aksen per kategori (mid-tone agar terbaca di tema terang & gelap). */
export const KATEGORI_WARNA: Record<PostCategory, string> = {
  kisah: "#a8864a",
  promo: "#bf922f",
  campaign: "#bd6f80",
  menu: "#4f9a8f",
  kabar: "#8f8160",
};

export function kategoriLabel(k: PostCategory): string {
  return kabarPage.kategoriLabel[k] ?? k;
}

export function KategoriBadge({ kategori }: { kategori: PostCategory }) {
  const warna = KATEGORI_WARNA[kategori];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium tracking-wide"
      style={{ backgroundColor: `${warna}1f`, color: warna }}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: warna }}
      />
      {kategoriLabel(kategori)}
    </span>
  );
}

export function StatusBadge({ published }: { published: boolean }) {
  return published ? (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium" style={{ color: "#4f9a8f" }}>
      <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#4f9a8f" }} />
      Terbit
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ad-subtle">
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ad-border-strong" />
      Draft
    </span>
  );
}

const FMT = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function formatTanggal(iso: string): string {
  try {
    return FMT.format(new Date(iso));
  } catch {
    return "";
  }
}
