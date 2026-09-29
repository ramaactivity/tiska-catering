import type { Metadata } from "next";
import { HomePage } from "@/components/pages/SitePages";
import { alternates } from "@/lib/i18n";

export const metadata: Metadata = { alternates: alternates("/", "en") };

// ISR: halaman ini menampilkan konten yang dikelola dari /admin. Jendela 60
// detik hanya jaring pengaman — setiap penyimpanan di admin memanggil
// revalidatePath, jadi perubahan tetap tampil seketika. Sebelumnya
// force-dynamic, yang mengirim no-store dan membuat TTFB ~1,1 detik.
export const revalidate = 60;

export default function Home() {
  return <HomePage lang="en" />;
}
