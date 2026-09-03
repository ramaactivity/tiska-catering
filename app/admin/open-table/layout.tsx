import type { Metadata } from "next";
import { requireSession } from "@/lib/auth";
import { getStats, openTableEnabled } from "@/lib/opentable/store";
import { KAPASITAS, ACARA_MULAI, VENUE } from "@/lib/opentable/config";
import Tabs from "@/components/admin/opentable/Tabs";
import StatsBar from "@/components/admin/opentable/StatsBar";

export const metadata: Metadata = { title: "Open Table — Backoffice Tiska" };
export const dynamic = "force-dynamic";

const FMT = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

export default async function OpenTableLayout({ children }: { children: React.ReactNode }) {
  await requireSession();
  const aktif = openTableEnabled();
  const stats = await getStats();

  return (
    <>
      <div className="mb-6">
        <h1 className="font-display text-[clamp(26px,3vw,34px)] font-light tracking-tight text-ad-text">
          Tiska Open Table
        </h1>
        <p className="mt-1 max-w-[680px] text-[14px] leading-[1.6] text-ad-muted">
          {FMT.format(ACARA_MULAI)} · {VENUE.nama}. Kelola daftar undangan, kirim
          undangan personal, pantau RSVP, dan lakukan check-in di lokasi.
        </p>
      </div>

      {!aktif && (
        <div className="mb-8 rounded-xl border border-ad-danger/40 bg-ad-danger/10 px-4 py-3.5">
          <p className="text-[13.5px] font-medium text-ad-danger">Database belum aktif</p>
          <p className="mt-1 text-[13px] leading-[1.6] text-ad-muted">
            Kredensial Supabase belum lengkap di server. Jalankan isi{" "}
            <code className="rounded bg-ad-input px-1 py-0.5 text-[12px]">db/open-table.sql</code>{" "}
            di Supabase → SQL Editor, lalu pastikan{" "}
            <code className="rounded bg-ad-input px-1 py-0.5 text-[12px]">SUPABASE_URL</code> dan{" "}
            <code className="rounded bg-ad-input px-1 py-0.5 text-[12px]">SUPABASE_SERVICE_ROLE_KEY</code>{" "}
            terpasang di Vercel.
          </p>
        </div>
      )}

      <StatsBar stats={stats} kapasitas={KAPASITAS} />
      <Tabs />
      {children}
    </>
  );
}
