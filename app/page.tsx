import type { Metadata } from "next";
import { HomePage } from "@/components/pages/SitePages";
import { alternates } from "@/lib/i18n";

export const metadata: Metadata = { alternates: alternates("/", "id") };

// Selalu render segar agar banner & foto yang diganti dari /admin langsung tampil.
// (Catatan: edge-caching/ISR butuh adopsi model "use cache" Next 16 + invalidasi
//  ber-tag — ditunda sebagai pekerjaan terpisah agar tak ada risiko konten basi.)
export const dynamic = "force-dynamic";

export default function Home() {
  return <HomePage lang="id" />;
}
