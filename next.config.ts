import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder Unsplash sampai foto asli Tiska masuk (Fase 4)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Foto Kabar yang diunggah dari /admin (Vercel Blob)
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
