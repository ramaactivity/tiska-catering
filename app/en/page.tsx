import type { Metadata } from "next";
import { HomePage } from "@/components/pages/SitePages";
import { alternates } from "@/lib/i18n";

export const metadata: Metadata = { alternates: alternates("/", "en") };

export const dynamic = "force-dynamic";

export default function Home() {
  return <HomePage lang="en" />;
}
