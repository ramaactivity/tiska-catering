import type { Metadata } from "next";
import "./globals.css";
import { fraunces, instrumentSerif, spaceGrotesk } from "./fonts";
import LenisProvider from "@/components/providers/LenisProvider";
import { company } from "@/lib/content";

const SITE_URL = "https://tiskacatering.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tiska Catering — Katering Premium Jakarta & Bogor sejak 1980",
    template: "%s — Tiska Catering",
  },
  description:
    "Katering premium untuk acara korporat, pernikahan, dan perayaan privat di Jakarta, Bogor & JaDeTaBek. Tiga generasi sejak 1980, dapur Halal & HACCP.",
  keywords: [
    "catering korporat Jakarta",
    "catering perusahaan Jakarta",
    "catering premium Jakarta",
    "catering pernikahan Jakarta",
    "catering Bogor",
    "catering pernikahan Bogor",
    "Tiska Catering",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: company.namaLengkap,
    title: "Tiska Catering — Katering Premium Jakarta & Bogor sejak 1980",
    description:
      "Katering premium untuk acara korporat, pernikahan, dan perayaan privat di Jakarta, Bogor & JaDeTaBek. Tiga generasi sejak 1980.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

// Structured data untuk hasil pencarian (katering Bogor/Jakarta)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: company.namaLengkap,
  alternateName: company.nama,
  slogan: company.tagline,
  foundingDate: String(company.berdiri),
  url: SITE_URL,
  logo: `${SITE_URL}/logo-tiska.webp`,
  image: `${SITE_URL}/opengraph-image`,
  telephone: company.teleponKantor,
  email: company.email,
  servesCuisine: ["Indonesian", "Asian", "Western"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Julang 1 No.3, RT.02/RW.06, Tanah Sereal",
    addressLocality: "Kota Bogor",
    addressRegion: "Jawa Barat",
    postalCode: "16161",
    addressCountry: "ID",
  },
  hasMenu: `${SITE_URL}/menu`,
  areaServed: [
    "Jakarta",
    "Bogor",
    "Sentul",
    "Cibinong",
    "Depok",
    "Tangerang",
    "Tangerang Selatan",
    "Bekasi",
  ].map((name) => ({ "@type": "City", name })),
  sameAs: [company.instagramLink, company.facebookLink, company.tiktokLink],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${fraunces.variable} ${instrumentSerif.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
