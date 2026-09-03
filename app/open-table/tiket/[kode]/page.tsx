import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRsvpByKode } from "@/lib/opentable/store";
import { bersihkanKode } from "@/lib/opentable/kode";
import TiketCard from "@/components/opentable/TiketCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "E-Tiket — Tiska Open Table",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ kode: string }> };

/**
 * Kode yang salah, kedaluwarsa, maupun tidak dikenal semuanya berakhir di
 * notFound() yang identik — halaman ini tidak boleh bisa dipakai menebak kode
 * tamu yang valid, karena isinya nama dan jabatan tokoh korporat.
 */
export default async function TiketPage({ params }: Props) {
  const { kode } = await params;
  const rsvp = await getRsvpByKode(bersihkanKode(kode));
  if (!rsvp) notFound();

  return (
    <main className="flex min-h-svh items-center justify-center bg-ink px-6 py-16">
      <TiketCard rsvp={rsvp} />
    </main>
  );
}
