import type { Metadata } from "next";
import "./globals.css";
import { fraunces, instrumentSerif, spaceGrotesk } from "./fonts";
import LenisProvider from "@/components/providers/LenisProvider";
import { company } from "@/lib/content";

const SITE_URL = "https://tiskacatering.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tiska Catering — Celebrate Love with the Finest Flavours",
    template: "%s — Tiska Catering",
  },
  description:
    "Katering premium di Bogor, Jakarta, dan JaDeTaBek sejak 1980. Tiga generasi menghadirkan rasa istimewa untuk pernikahan, acara korporat, dan perayaan Anda.",
  keywords: [
    "katering Bogor",
    "katering Jakarta",
    "katering pernikahan",
    "katering korporat",
    "catering premium",
    "Tiska Catering",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: company.namaLengkap,
    title: "Tiska Catering — Celebrate Love with the Finest Flavours",
    description:
      "Katering premium di Bogor, Jakarta, dan JaDeTaBek sejak 1980. Tiga generasi menghadirkan rasa istimewa untuk perayaan Anda.",
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
  areaServed: ["Bogor", "Jakarta", "Depok", "Tangerang", "Bekasi"],
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
