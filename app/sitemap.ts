import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/posts/store";

const SITE_URL = "https://tiskacatering.com";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Storage sedang gangguan → sitemap tetap tayang tanpa daftar artikel.
  const posts = await getPublishedPosts().catch(() => []);
  return [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/menu`, priority: 0.8 },
    { url: `${SITE_URL}/galeri`, priority: 0.6 },
    { url: `${SITE_URL}/kabar`, priority: 0.6 },
    ...posts.map((p) => ({
      url: `${SITE_URL}/kabar/${p.slug}`,
      lastModified: p.updatedAt,
      priority: 0.5,
    })),
  ];
}
