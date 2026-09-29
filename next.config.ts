import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // URL situs PHP lama (mis. /index.php) masih terindeks Google → arahkan permanen.
  async redirects() {
    return [
      { source: "/:path(.*\\.php)", destination: "/", permanent: true },
      // Satu alamat resmi (tanpa www) agar Google tidak melihat situs kembar.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.tiskacatering.com" }],
        destination: "https://tiskacatering.com/:path*",
        permanent: true,
      },
    ];
  },
  // Header keamanan dasar. CSP sengaja TIDAK dipasang di sini: situs ini pakai
  // inline style dari Tailwind/Framer dan next/image, jadi CSP yang salah lebih
  // besar risikonya (situs blank) daripada manfaatnya. Pasang belakangan lewat
  // Report-Only dulu kalau memang mau.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            // camera dibiarkan 'self': dipakai pemindai QR check-in Open Table.
            value: "camera=(self), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
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
