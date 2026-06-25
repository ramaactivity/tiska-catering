import type { Metadata } from "next";
import Link from "next/link";
import { requireSession } from "@/lib/auth";
import { getAllDays, getUpcoming, todayJakarta, daysUntil } from "@/lib/special-days/store";
import { addDaysStr } from "@/lib/special-days/source";
import SpecialDayManager from "@/components/admin/SpecialDayManager";

export const metadata: Metadata = { title: "Hari Spesial — Backoffice Tiska" };
export const dynamic = "force-dynamic";

function fmtTanggal(t: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${t}T00:00:00`));
}

export default async function HariSpesialPage() {
  await requireSession();
  const today = todayJakarta();
  const [all, upcoming] = await Promise.all([getAllDays(), getUpcoming(1)]);
  const nearest = upcoming[0] ?? null;
  const n = nearest ? daysUntil(nearest.tanggal, today) : null;
  const hitung = n === null ? "" : n === 0 ? "Hari ini" : n === 1 ? "Besok" : `${n} hari lagi`;

  const bannerLink = nearest
    ? `/admin/banners/new?${new URLSearchParams({
        judul: nearest.nama,
        label: nearest.nama,
        mulai: addDaysStr(nearest.tanggal, -7),
        selesai: nearest.tanggal,
      }).toString()}`
    : "#";

  return (
    <>
      <div className="mb-8 max-w-[680px]">
        <h1 className="font-display text-[clamp(26px,3vw,34px)] font-light tracking-tight text-ad-text">
          Hari Spesial
        </h1>
        <p className="mt-2 text-[14px] leading-[1.65] text-ad-muted">
          Hari besar nasional, keagamaan &amp; festive (Lebaran, Natal, HUT RI, Imlek, Cap Go
          Meh, dll). Ditarik otomatis per tahun, bisa kamu sesuaikan, lengkap dengan countdown
          dan (segera) reminder email agar momentumnya tak terlewat.
        </p>
      </div>

      {nearest && (
        <div className="mb-9 overflow-hidden rounded-2xl bg-ad-panel p-6 shadow-[0_1px_3px_var(--ad-shadow)] ring-1 ring-inset ring-ad-border/70 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ad-subtle">
              Hitung mundur · hari spesial terdekat
            </p>
            <p className="mt-2 font-display text-[clamp(30px,4vw,46px)] font-light leading-none tracking-tight text-ad-text">
              {hitung}
            </p>
            <p className="mt-2.5 text-[16px] font-semibold text-ad-text">{nearest.nama}</p>
            <p className="text-[13px] text-ad-subtle">{fmtTanggal(nearest.tanggal)}</p>
          </div>
          <Link
            href={bannerLink}
            className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-xl bg-ad-btn px-5 py-2.5 text-[13px] font-semibold text-ad-btn-fg shadow-[0_1px_2px_var(--ad-shadow)] transition hover:brightness-[1.06] active:scale-[0.98] sm:mt-0"
          >
            + Buat banner untuk hari ini
          </Link>
        </div>
      )}

      <SpecialDayManager days={all} today={today} />
    </>
  );
}
