import { requireSession } from "@/lib/auth";
import { getGuests } from "@/lib/opentable/store";
import GuestImport from "@/components/admin/opentable/GuestImport";
import GuestTable from "@/components/admin/opentable/GuestTable";

export const dynamic = "force-dynamic";

export default async function DaftarUndanganPage() {
  await requireSession();
  const guests = await getGuests();

  const terkirim = guests.filter((g) => g.status !== "belum-kirim").length;
  const dibuka = guests.filter((g) => g.openedAt).length;

  return (
    <>
      <GuestImport />

      {guests.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ad-border-strong bg-ad-panel px-6 py-16 text-center">
          <h2 className="font-display text-[22px] font-light text-ad-text">
            Daftar undangan masih kosong
          </h2>
          <p className="mx-auto mt-2 max-w-[480px] text-[14px] leading-[1.7] text-ad-muted">
            Impor daftar tamu dari Excel atau Google Sheets. Setiap tamu otomatis
            mendapat tautan undangan personal beserta pelacak dibuka atau belum.
          </p>
        </div>
      ) : (
        <>
          <p className="mb-3 text-[12.5px] text-ad-subtle">
            {guests.length} tamu · {terkirim} sudah dikirimi · {dibuka} membuka undangan
          </p>
          <GuestTable guests={guests} />
        </>
      )}
    </>
  );
}
