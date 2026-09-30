import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/posts/store";
import { areas, landingPath, services } from "@/lib/landing";
import { switchPath } from "@/lib/i18n";

const SITE_URL = "https://tiskacatering.com";

// Sitemap ikut berubah saat ada pos Kabar baru; sejam sudah cukup segar.
export const revalidate = 3600;

/** Satu entri per bahasa, masing-masing menyebut pasangannya (hreflang). */
function pair(idPath: string, priority: number, enPath = switchPath(idPath, "en")) {
  const languages = { id: SITE_URL + idPath, en: SITE_URL + enPath };
  return [
    { url: languages.id, priority, alternates: { languages } },
    { url: languages.en, priority: +(priority * 0.8).toFixed(2), alternates: { languages } },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Storage sedang gangguan → sitemap tetap tayang tanpa daftar artikel.
  const posts = await getPublishedPosts().catch(() => []);
  // lastModified hanya dipasang di tempat yang tanggalnya benar-benar diketahui.
  // Mengarang tanggal untuk halaman statis lebih buruk daripada tidak
  // mencantumkannya — Google mengabaikan lastmod yang terbukti tidak akurat.
  const kabarTerbaru = posts
    .map((p) => p.updatedAt)
    .sort()
    .at(-1);
  return [
    ...pair("/", 1),
    ...pair("/layanan", 0.8),
    ...[...services, ...areas].flatMap((l) =>
      pair(
        landingPath(l, "id"),
        l.slug.id === "katering-korporat" || l.slug.id === "jakarta" ? 0.9 : 0.8,
        landingPath(l, "en"),
      ),
    ),
    ...pair("/tentang", 0.7),
    ...pair("/menu", 0.8),
    ...pair("/galeri", 0.6),
    ...pair("/kabar", 0.6).map((e) =>
      kabarTerbaru ? { ...e, lastModified: kabarTerbaru } : e,
    ),
    ...posts.flatMap((p) =>
      p.en?.judul
        ? pair(`/kabar/${p.slug}`, 0.5).map((e) => ({ ...e, lastModified: p.updatedAt }))
        : [{ url: `${SITE_URL}/kabar/${p.slug}`, lastModified: p.updatedAt, priority: 0.5 }],
    ),
  ];
}
