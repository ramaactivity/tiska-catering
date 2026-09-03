import type { Metadata } from "next";
import { getGuestByKode } from "@/lib/opentable/store";
import { bersihkanKode } from "@/lib/opentable/kode";
import { fotoOpenTable } from "@/lib/opentable/images";
import OpenTableExperience from "@/components/opentable/OpenTableExperience";
import Pembuka from "@/components/opentable/Pembuka";
import DetailAcara from "@/components/opentable/DetailAcara";
import Rundown from "@/components/opentable/Rundown";
import MenuTasting from "@/components/opentable/MenuTasting";
import Lokasi from "@/components/opentable/Lokasi";
import Penutup from "@/components/opentable/Penutup";

export const dynamic = "force-dynamic";

/**
 * noindex: undangan ini disebar lewat WhatsApp ke daftar tamu tertentu, bukan
 * untuk ditemukan lewat pencarian. Halaman ini juga tidak didaftarkan di
 * app/sitemap.ts, dan sengaja TIDAK ditulis di robots.txt — robots.txt bersifat
 * publik, mencantumkan path di sana justru mengiklankannya.
 */
export const metadata: Metadata = {
  title: "Tiska Open Table — 7 Oktober 2026",
  description:
    "Undangan khusus: sesi cicip rasa dan temu kolega bersama Tiska Catering di Plaza Mutiara, Jakarta.",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ to?: string; k?: string }> };

export default async function OpenTablePage({ searchParams }: Props) {
  const sp = await searchParams;
  const kode = bersihkanKode(sp.k ?? "");
  const guest = kode ? await getGuestByKode(kode) : null;

  // Nama pada sampul: utamakan data tamu tersimpan, jatuh ke ?to= bila
  // kodenya tidak dikenal, lalu ke sapaan umum. Undangan tetap utuh tanpa keduanya.
  const nama = (guest?.nama ?? sp.to ?? "").toString().trim().slice(0, 70);

  return (
    <OpenTableExperience nama={nama} kode={guest ? kode : ""} fotoSampul={fotoOpenTable.sampul}>
      <Pembuka />
      <DetailAcara />
      <Rundown />
      <MenuTasting foto={fotoOpenTable.menu} />
      <Lokasi foto={fotoOpenTable.lokasi} />
      <Penutup />
    </OpenTableExperience>
  );
}
