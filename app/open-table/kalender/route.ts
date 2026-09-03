import { icsAcara } from "@/lib/opentable/calendar";

export const dynamic = "force-dynamic";

/** Unduhan berkas kalender untuk tombol "Simpan ke kalender". */
export function GET(): Response {
  return new Response(icsAcara(), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="tiska-open-table.ics"',
      "Cache-Control": "no-store",
    },
  });
}
