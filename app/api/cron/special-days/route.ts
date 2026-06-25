import { NextResponse } from "next/server";
import { runReminders } from "@/lib/special-days/reminder";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

/**
 * Cron harian: kirim reminder email Hari Spesial (H-7, H-1, hari-H).
 * Vercel Cron menyertakan header Authorization: Bearer <CRON_SECRET> bila
 * env CRON_SECRET diset — kita verifikasi agar endpoint tak bisa dipicu publik.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }
  const result = await runReminders();
  return NextResponse.json({ ok: true, ...result });
}
