import type { Metadata } from "next";
import LayananIndex from "@/components/landing/LayananIndex";
import { layananIndex } from "@/lib/landing";
import { alternates } from "@/lib/i18n";

const t = layananIndex.en;
const alt = alternates("/layanan", "en");

export const metadata: Metadata = {
  title: { absolute: t.metaTitle },
  description: t.metaDescription,
  alternates: alt,
  openGraph: { url: alt.canonical, title: t.metaTitle, description: t.metaDescription },
};

export default function ServicesPage() {
  return <LayananIndex lang="en" />;
}
