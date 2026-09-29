import { KabarPage, pageMetadata } from "@/components/pages/SitePages";

export const metadata = pageMetadata("kabar", "en");

// ISR: halaman ini menampilkan konten yang dikelola dari /admin. Jendela 60
// detik hanya jaring pengaman — setiap penyimpanan di admin memanggil
// revalidatePath, jadi perubahan tetap tampil seketika. Sebelumnya
// force-dynamic, yang mengirim no-store dan membuat TTFB ~1,1 detik.
export const revalidate = 60;

export default function Page() {
  return <KabarPage lang="en" />;
}
