import { verifySession } from "@/lib/auth";
import { getRsvps } from "@/lib/opentable/store";
import { toCsv } from "@/lib/opentable/csv";
import { tampilHp } from "@/lib/opentable/kode";
import { labelPreferensi, RSVP_STATUS_LABEL } from "@/lib/opentable/types";
import { tautanTiket } from "@/lib/opentable/config";

export const dynamic = "force-dynamic";

/**
 * Membalas 401, bukan redirect ke halaman login: redirect dari URL unduhan
 * menghasilkan halaman login yang tersimpan sebagai rsvp.csv — terlihat
 * berhasil padahal berkasnya sampah.
 */
export async function GET(): Promise<Response> {
  if (!(await verifySession())) {
    return new Response("Perlu masuk sebagai admin.", { status: 401 });
  }

  const rows = await getRsvps();
  const csv = toCsv(
    [
      "Waktu",
      "Nama",
      "Jabatan",
      "Perusahaan",
      "WhatsApp",
      "Email",
      "Status",
      "Jumlah",
      "Pendamping",
      "Preferensi",
      "Alergi",
      "Catatan",
      "Check-in",
      "Kode",
      "E-tiket",
    ],
    rows.map((r) => [
      r.createdAt,
      r.nama,
      r.jabatan,
      r.perusahaan,
      tampilHp(r.hp),
      r.email,
      RSVP_STATUS_LABEL[r.status],
      r.pax,
      r.pendamping.join(", "),
      r.preferensi.map(labelPreferensi).join(", "),
      r.alergi,
      r.catatan,
      r.checkedInAt ?? "",
      r.kode,
      tautanTiket(r.kode),
    ]),
  );

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="tiska-open-table-rsvp.csv"',
      "Cache-Control": "no-store",
    },
  });
}
