import type { MetadataRoute } from "next";

const SITE_URL = "https://tiska-catering.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/menu`, priority: 0.8 },
    { url: `${SITE_URL}/galeri`, priority: 0.6 },
  ];
}
