import type { Metadata } from "next";
import { getGuestByKode, getRsvpByGuestKode } from "@/lib/opentable/store";
import { bersihkanKode, tampilHp } from "@/lib/opentable/kode";
import { terbitkanToken } from "@/lib/opentable/antispam";
import { WAJIB_KODE, rsvpDitutup, tautanUndangan } from "@/lib/opentable/config";
import { fotoOpenTable } from "@/lib/opentable/images";
import OpenTableExperience from "@/components/opentable/OpenTableExperience";
import Pembuka from "@/components/opentable/Pembuka";
import DetailAcara from "@/components/opentable/DetailAcara";
import Rundown from "@/components/opentable/Rundown";
import MenuTasting from "@/components/opentable/MenuTasting";
import Lokasi from "@/components/opentable/Lokasi";
import RsvpForm from "@/components/opentable/RsvpForm";
import ReferralForm from "@/components/opentable/ReferralForm";
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

  // Bila tamu ini sudah pernah RSVP, formulir tampil terisi datanya —
  // submit ulang memperbarui baris yang sama, bukan memakan kursi baru.
  const rsvpLama = guest ? await getRsvpByGuestKode(guest.kode) : null;

  const awal = {
    nama: rsvpLama?.nama ?? guest?.nama ?? nama,
    jabatan: rsvpLama?.jabatan ?? guest?.jabatan ?? "",
    perusahaan: rsvpLama?.perusahaan ?? guest?.perusahaan ?? "",
    // Tampilkan nomor dalam format lokal (0812-…), bukan 62… yang tersimpan.
    hp: tampilHp(rsvpLama?.hp ?? guest?.hp ?? ""),
    email: rsvpLama?.email ?? guest?.email ?? "",
  };

  // WAJIB_KODE adalah sakelar darurat: bila tautan bocor dan mulai kena spam,
  // formulir hanya dirender untuk pengunjung dengan kode undangan yang sah.
  const formTampil = !WAJIB_KODE || !!guest;

  return (
    <OpenTableExperience nama={nama} kode={guest ? kode : ""} fotoSampul={fotoOpenTable.sampul}>
      <Pembuka />
      <DetailAcara />
      <Rundown />
      <MenuTasting foto={fotoOpenTable.menu} />
      <Lokasi foto={fotoOpenTable.lokasi} />
      {formTampil && (
        <>
          <RsvpForm
            token={terbitkanToken()}
            kode={guest?.kode ?? ""}
            awal={awal}
            ditutup={rsvpDitutup()}
          />
          <ReferralForm
            token={terbitkanToken()}
            kode={guest?.kode ?? ""}
            perujuk={awal.nama}
            tautanUmum={tautanUndangan()}
          />
        </>
      )}
      <Penutup />
    </OpenTableExperience>
  );
}
