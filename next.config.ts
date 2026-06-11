import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder Unsplash sampai foto asli Tiska masuk (Fase 4)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
