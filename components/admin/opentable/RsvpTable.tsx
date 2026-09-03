import { setRsvpStatusAction, deleteRsvpAction } from "@/lib/opentable/actions";
import { tautanTiket } from "@/lib/opentable/config";
import { tampilHp } from "@/lib/opentable/kode";
import { labelPreferensi, RSVP_STATUS_LABEL, type Rsvp, type RsvpStatus } from "@/lib/opentable/types";

const WARNA: Record<RsvpStatus, string> = {
  confirmed: "#4f9a8f",
  waitlist: "#bf922f",
  declined: "#8f8160",
  cancelled: "#bd6f80",
};

const FMT = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Jakarta",
});

function StatusPil({ status }: { status: RsvpStatus }) {
  const warna = WARNA[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium tracking-wide"
      style={{ backgroundColor: `${warna}1f`, color: warna }}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: warna }} />
      {RSVP_STATUS_LABEL[status]}
    </span>
  );
}

export default function RsvpTable({ rows }: { rows: Rsvp[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ad-border bg-ad-panel">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-ad-border text-[11px] uppercase tracking-[0.12em] text-ad-subtle">
            <th className="px-4 py-3 font-medium">Tamu</th>
            <th className="hidden px-4 py-3 font-medium lg:table-cell">Preferensi</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 text-right font-medium">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-ad-border/60 align-top last:border-0">
              <td className="px-4 py-3.5">
                <p className="text-[14px] font-medium leading-tight text-ad-text">
                  {r.nama}
                  {r.pax > 1 && <span className="ml-2 text-[12px] text-ad-accent">+{r.pax - 1}</span>}
                </p>
                {(r.jabatan || r.perusahaan) && (
                  <p className="mt-0.5 text-[12.5px] leading-snug text-ad-muted">
                    {[r.jabatan, r.perusahaan].filter(Boolean).join(" · ")}
                  </p>
                )}
                <p className="mt-1 font-mono text-[11px] text-ad-subtle">
                  {tampilHp(r.hp)}
                  {r.email && ` · ${r.email}`}
                </p>
                {r.pendamping.length > 0 && (
                  <p className="mt-1 text-[11.5px] text-ad-subtle">Pendamping: {r.pendamping.join(", ")}</p>
                )}
                <p className="mt-1 text-[11px] text-ad-subtle">
                  {FMT.format(new Date(r.createdAt))}
                  {r.checkedInAt && <span className="ml-2 text-ad-accent">· sudah check-in</span>}
                </p>
              </td>
              <td className="hidden px-4 py-3.5 lg:table-cell">
                {r.preferensi.length > 0 && (
                  <p className="text-[12.5px] leading-snug text-ad-muted">
                    {r.preferensi.map(labelPreferensi).join(", ")}
                  </p>
                )}
                {r.alergi && <p className="mt-1 text-[12px] text-ad-danger/80">Alergi: {r.alergi}</p>}
                {r.catatan && <p className="mt-1 text-[12px] italic text-ad-subtle">“{r.catatan}”</p>}
              </td>
              <td className="px-4 py-3.5">
                <StatusPil status={r.status} />
              </td>
              <td className="px-4 py-3.5">
                <div className="flex flex-col items-end gap-1.5">
                  <form action={setRsvpStatusAction} className="flex items-center gap-1.5">
                    <input type="hidden" name="id" value={r.id} />
                    <select
                      name="status"
                      defaultValue={r.status}
                      className="rounded-lg border border-ad-border bg-ad-input px-2 py-1.5 text-[12px] text-ad-text outline-none focus:border-ad-accent"
                    >
                      {(Object.keys(RSVP_STATUS_LABEL) as RsvpStatus[]).map((s) => (
                        <option key={s} value={s}>
                          {RSVP_STATUS_LABEL[s]}
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
                    <a
                      href={tautanTiket(r.kode)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg px-2.5 py-1 text-[11.5px] text-ad-subtle transition-colors hover:text-ad-accent"
                    >
                      E-tiket
                    </a>
                    <form action={deleteRsvpAction}>
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
