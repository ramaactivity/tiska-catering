import type { Metadata } from "next";
import LayananIndex from "@/components/landing/LayananIndex";
import { layananIndex } from "@/lib/landing";

const t = layananIndex.id;

export const metadata: Metadata = {
  title: { absolute: t.metaTitle },
  description: t.metaDescription,
  alternates: { canonical: "/layanan" },
  openGraph: { url: "/layanan", title: t.metaTitle, description: t.metaDescription },
};

export default function LayananPage() {
  return <LayananIndex lang="id" />;
}
