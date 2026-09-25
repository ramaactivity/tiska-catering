import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // URL situs PHP lama (mis. /index.php) masih terindeks Google → arahkan permanen.
  async redirects() {
    return [{ source: "/:path(.*\\.php)", destination: "/", permanent: true }];
  },
  // Upload foto dari /admin lewat Server Action. Default Next.js cuma 1 MB →
  // foto hasil crop (mis. potret tim 1000×1000) sering >1 MB dan ke-block
  // ("Menyimpan…" nyangkut). Samakan dengan batas 12 MB di action.
  experimental: {
    serverActions: {
      bodySizeLimit: "12mb",
    },
  },
  images: {
    // Placeholder Unsplash sampai foto asli Tiska masuk (Fase 4)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Foto yang diunggah dari /admin (Supabase Storage — public URL)
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        // Legacy: foto lama dari Vercel Blob (sebelum migrasi)
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
