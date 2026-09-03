import type { Stats } from "@/lib/opentable/types";

function Kartu({
  label,
  nilai,
  sub,
  aksen,
}: {
  label: string;
  nilai: string | number;
  sub?: string;
  aksen?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border px-4 py-3 ${
        aksen ? "border-ad-accent/35 bg-ad-accent-weak" : "border-ad-border bg-ad-panel"
      }`}
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ad-subtle">{label}</p>
      <p
        className={`mt-1 font-display text-[26px] font-light leading-none ${
          aksen ? "text-ad-accent" : "text-ad-text"
        }`}
      >
        {nilai}
      </p>
      {sub && <p className="mt-1 text-[11.5px] text-ad-subtle">{sub}</p>}
    </div>
  );
}

export default function StatsBar({ stats, kapasitas }: { stats: Stats; kapasitas: number }) {
  return (
    <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      <Kartu label="Sisa kursi" nilai={stats.sisaKursi} sub={`dari ${kapasitas} kursi`} aksen />
      <Kartu label="Konfirmasi hadir" nilai={stats.jmlHadir} sub={`${stats.totalPax} orang`} />
      <Kartu label="Daftar tunggu" nilai={stats.jmlWaitlist} />
      <Kartu label="Tidak hadir" nilai={stats.jmlTidakHadir} />
      <Kartu label="Sudah check-in" nilai={stats.jmlCheckin} />
    </div>
  );
}
