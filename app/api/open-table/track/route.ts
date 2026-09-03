import { trackOpen } from "@/lib/opentable/store";
import { bersihkanKode } from "@/lib/opentable/kode";

export const dynamic = "force-dynamic";

/**
 * Beacon "sampul dibuka". Selalu membalas 204 — termasuk untuk kode yang tidak
 * dikenal — supaya endpoint ini tidak bisa dipakai menebak kode tamu yang valid.
 */
export async function POST(req: Request): Promise<Response> {
  try {
    const body = (await req.json()) as { kode?: unknown };
    const kode = bersihkanKode(String(body?.kode ?? ""));
    if (kode) await trackOpen(kode);
  } catch {
    /* payload rusak atau DB bermasalah — pelacakan tidak boleh berisik */
  }
  return new Response(null, { status: 204 });
}
