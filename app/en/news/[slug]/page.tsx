import KabarDetail, { kabarDetailMetadata } from "@/components/pages/KabarDetail";

// ISR: halaman ini menampilkan konten yang dikelola dari /admin. Jendela 60
// detik hanya jaring pengaman — setiap penyimpanan di admin memanggil
// revalidatePath, jadi perubahan tetap tampil seketika. Sebelumnya
// force-dynamic, yang mengirim no-store dan membuat TTFB ~1,1 detik.
export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  return kabarDetailMetadata((await params).slug, "en");
}

export default async function Page({ params }: Props) {
  return <KabarDetail slug={(await params).slug} lang="en" />;
}
