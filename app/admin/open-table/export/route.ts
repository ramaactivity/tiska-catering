import { verifySession } from "@/lib/auth";
import { getGuests } from "@/lib/opentable/store";
import { toCsv } from "@/lib/opentable/csv";
import { tampilHp } from "@/lib/opentable/kode";
import { tautanUndangan } from "@/lib/opentable/config";
import { GUEST_STATUS_LABEL } from "@/lib/opentable/types";

export const dynamic = "force-dynamic";

/** 401, bukan redirect — lihat catatan di rsvp/export/route.ts. */
export async function GET(): Promise<Response> {
  if (!(await verifySession())) {
    return new Response("Perlu masuk sebagai admin.", { status: 401 });
  }

  const rows = await getGuests();
  const csv = toCsv(
    ["Nama", "Jabatan", "Perusahaan", "WhatsApp", "Email", "Status", "Dibuka", "Kali dibuka", "Kode", "Tautan undangan"],
    rows.map((g) => [
      g.nama,
      g.jabatan,
      g.perusahaan,
      tampilHp(g.hp),
      g.email,
      GUEST_STATUS_LABEL[g.status],
      g.openedAt ?? "",
      g.openCount,
      g.kode,
      tautanUndangan(g.nama, g.kode),
    ]),
  );

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="tiska-open-table-tamu.csv"',
      "Cache-Control": "no-store",
    },
  });
}
