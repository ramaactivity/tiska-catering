import { requireSession } from "@/lib/auth";
import { getReferrals } from "@/lib/opentable/store";
import {
  setReferralStatusAction,
  deleteReferralAction,
  referralKeUndanganAction,
} from "@/lib/opentable/actions";
import { referralAdminCopy } from "@/lib/opentable/content";
import { REFERRAL_STATUS_LABEL, type ReferralStatus } from "@/lib/opentable/types";

export const dynamic = "force-dynamic";

const WARNA: Record<ReferralStatus, string> = {
  baru: "#bf922f",
  diproses: "#4f9a8f",
  diundang: "#4f9a8f",
  ditolak: "#8f8160",
};

const FMT = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Jakarta",
});

export default async function ReferralAdminPage() {
  await requireSession();
  const rows = await getReferrals();

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ad-border-strong bg-ad-panel px-6 py-16 text-center">
        <h2 className="font-display text-[22px] font-light text-ad-text">{referralAdminCopy.kosong}</h2>
        <p className="mx-auto mt-2 max-w-[460px] text-[14px] leading-[1.7] text-ad-muted">
          Nama yang direkomendasikan tamu dari halaman undangan akan tampil di sini,
          lengkap dengan siapa yang merekomendasikan.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-ad-border bg-ad-panel">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-ad-border text-[11px] uppercase tracking-[0.12em] text-ad-subtle">
            <th className="px-4 py-3 font-medium">Nama direkomendasikan</th>
            <th className="hidden px-4 py-3 font-medium md:table-cell">Dari</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 text-right font-medium">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const warna = WARNA[r.status];
            return (
              <tr key={r.id} className="border-b border-ad-border/60 align-top last:border-0">
                <td className="px-4 py-3.5">
                  <p className="text-[14px] font-medium leading-tight text-ad-text">{r.nama}</p>
                  {(r.jabatan || r.perusahaan) && (
                    <p className="mt-0.5 text-[12.5px] leading-snug text-ad-muted">
                      {[r.jabatan, r.perusahaan].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  <p className="mt-1 font-mono text-[11.5px] text-ad-subtle">{r.kontak}</p>
                </td>
                <td className="hidden px-4 py-3.5 md:table-cell">
                  <p className="text-[13px] text-ad-muted">{r.referrerNama || "—"}</p>
                  <p className="mt-0.5 text-[11.5px] text-ad-subtle">
                    {r.channel === "sendiri"
                      ? referralAdminCopy.channelSendiri
                      : referralAdminCopy.channelTitip}
                  </p>
                  <p className="mt-0.5 text-[11px] text-ad-subtle">{FMT.format(new Date(r.createdAt))}</p>
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium"
                    style={{ backgroundColor: `${warna}1f`, color: warna }}
                  >
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: warna }} />
                    {REFERRAL_STATUS_LABEL[r.status]}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex flex-col items-end gap-1.5">
                    <form action={setReferralStatusAction} className="flex items-center gap-1.5">
                      <input type="hidden" name="id" value={r.id} />
                      <select
                        name="status"
                        defaultValue={r.status}
                        className="rounded-lg border border-ad-border bg-ad-input px-2 py-1.5 text-[12px] text-ad-text outline-none focus:border-ad-accent"
                      >
                        {(Object.keys(REFERRAL_STATUS_LABEL) as ReferralStatus[]).map((s) => (
                          <option key={s} value={s}>
                            {REFERRAL_STATUS_LABEL[s]}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="rounded-lg border border-ad-border px-2.5 py-1.5 text-[12px] text-ad-text transition-colors hover:border-ad-accent hover:text-ad-accent"
                      >
                        Simpan
                      </button>
                    </form>
                    <div className="flex items-center gap-1">
                      <form action={referralKeUndanganAction}>
                        <input type="hidden" name="id" value={r.id} />
                        <button
                          type="submit"
                          className="rounded-lg px-2.5 py-1 text-[11.5px] text-ad-subtle transition-colors hover:text-ad-accent"
                        >
                          {referralAdminCopy.jadikanTamu}
                        </button>
                      </form>
                      <form action={deleteReferralAction}>
                        <input type="hidden" name="id" value={r.id} />
                        <button
                          type="submit"
                          className="rounded-lg px-2.5 py-1 text-[11.5px] text-ad-subtle transition-colors hover:bg-ad-danger/10 hover:text-ad-danger"
                        >
                          Hapus
                        </button>
                      </form>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
