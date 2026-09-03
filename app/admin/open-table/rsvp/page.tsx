import Link from "next/link";
import { requireSession } from "@/lib/auth";
import { getRsvps } from "@/lib/opentable/store";
import { RSVP_STATUS_LABEL, type RsvpStatus } from "@/lib/opentable/types";
import RsvpTable from "@/components/admin/opentable/RsvpTable";

export const dynamic = "force-dynamic";

const FILTER: { key: string; label: string }[] = [
  { key: "all", label: "Semua" },
  ...(Object.keys(RSVP_STATUS_LABEL) as RsvpStatus[]).map((s) => ({
    key: s,
    label: RSVP_STATUS_LABEL[s],
  })),
];

type Props = { searchParams: Promise<{ f?: string }> };

export default async function RsvpAdminPage({ searchParams }: Props) {
  await requireSession();
  const { f } = await searchParams;
  const semua = await getRsvps();
  const aktif = FILTER.some((x) => x.key === f) ? f! : "all";
  const rows = aktif === "all" ? semua : semua.filter((r) => r.status === aktif);

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {FILTER.map((x) => {
            const on = x.key === aktif;
            const jml = x.key === "all" ? semua.length : semua.filter((r) => r.status === x.key).length;
            return (
              <Link
                key={x.key}
                href={x.key === "all" ? "/admin/open-table/rsvp" : `/admin/open-table/rsvp?f=${x.key}`}
                className={`rounded-lg border px-3 py-1.5 text-[12.5px] transition-colors ${
                  on
                    ? "border-ad-accent bg-ad-accent-weak text-ad-accent"
                    : "border-ad-border text-ad-muted hover:text-ad-text"
                }`}
              >
                {x.label} <span className="opacity-60">{jml}</span>
              </Link>
            );
          })}
        </div>
        <a
          href="/admin/open-table/rsvp/export"
          className="rounded-xl border border-ad-border px-3.5 py-2 text-[12.5px] text-ad-muted transition-colors hover:border-ad-accent hover:text-ad-accent"
        >
          Unduh CSV
        </a>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ad-border-strong bg-ad-panel px-6 py-16 text-center">
          <h2 className="font-display text-[22px] font-light text-ad-text">Belum ada konfirmasi</h2>
          <p className="mx-auto mt-2 max-w-[440px] text-[14px] leading-[1.7] text-ad-muted">
            RSVP yang masuk dari halaman undangan akan tampil di sini beserta jumlah
            orang, preferensi makanan, dan catatan alergi.
          </p>
        </div>
      ) : (
        <RsvpTable rows={rows} />
      )}
    </>
  );
}
