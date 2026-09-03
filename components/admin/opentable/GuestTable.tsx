import { tautanUndangan } from "@/lib/opentable/config";
import { naskahWa } from "@/lib/opentable/content";
import { isiNaskah, tampilHp, waLink } from "@/lib/opentable/kode";
import { GUEST_STATUS_LABEL, type Guest, type GuestStatus } from "@/lib/opentable/types";
import Link from "next/link";
import { deleteGuestAction } from "@/lib/opentable/actions";
import { guestAdminCopy } from "@/lib/opentable/content";
import SendButtons from "./SendButtons";
import EmailButton from "./EmailButton";
import GuestEditRow from "./GuestEditRow";

const WARNA: Record<GuestStatus, string> = {
  "belum-kirim": "#8f8160",
  terkirim: "#bf922f",
  dibuka: "#4f9a8f",
  rsvp: "#4f9a8f",
};

function StatusPil({ status, kali }: { status: GuestStatus; kali: number }) {
  const warna = WARNA[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium tracking-wide"
      style={{ backgroundColor: `${warna}1f`, color: warna }}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: warna }} />
      {GUEST_STATUS_LABEL[status]}
      {status === "dibuka" && kali > 1 && ` ${kali}×`}
    </span>
  );
}

export default function GuestTable({
  guests,
  editId,
}: {
  guests: Guest[];
  /** id tamu yang sedang disunting, dari ?edit= — mode sunting server-rendered. */
  editId?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ad-border bg-ad-panel">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-ad-border text-[11px] uppercase tracking-[0.12em] text-ad-subtle">
            <th className="px-4 py-3 font-medium">Tamu</th>
            <th className="hidden px-4 py-3 font-medium md:table-cell">Kontak</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 text-right font-medium">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((g) => {
            if (g.id === editId) return <GuestEditRow key={g.id} guest={g} />;
            const tautan = tautanUndangan(g.nama, g.kode);
            const pesan = isiNaskah(naskahWa, { nama: g.nama, link: tautan });
            return (
              <tr key={g.id} className="border-b border-ad-border/60 last:border-0 align-top">
                <td className="px-4 py-3.5">
                  <p className="text-[14px] font-medium leading-tight text-ad-text">{g.nama}</p>
                  {(g.jabatan || g.perusahaan) && (
                    <p className="mt-0.5 text-[12.5px] leading-snug text-ad-muted">
                      {[g.jabatan, g.perusahaan].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  <p className="mt-1 font-mono text-[11px] text-ad-subtle md:hidden">
                    {tampilHp(g.hp) || g.email || "—"}
                  </p>
                </td>
                <td className="hidden px-4 py-3.5 md:table-cell">
                  <p className="font-mono text-[12px] text-ad-muted">{tampilHp(g.hp) || "—"}</p>
                  {g.email && <p className="mt-0.5 text-[12px] text-ad-subtle">{g.email}</p>}
                </td>
                <td className="px-4 py-3.5">
                  <StatusPil status={g.status} kali={g.openCount} />
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex flex-wrap items-center justify-end gap-x-1 gap-y-1">
                    <SendButtons
                      id={g.id}
                      waHref={waLink(g.hp, pesan)}
                      tautan={tautan}
                      punyaHp={!!g.hp}
                    />
                    {g.email && (
                      <EmailButton id={g.id} label={guestAdminCopy.kirimEmail} labelProses="…" />
                    )}
                    <Link
                      href={`/admin/open-table?edit=${g.id}`}
                      className="rounded-lg px-2.5 py-1.5 text-[12px] text-ad-subtle transition-colors hover:bg-ad-accent-weak hover:text-ad-accent"
                    >
                      {guestAdminCopy.ubah}
                    </Link>
                    <form action={deleteGuestAction}>
                      <input type="hidden" name="id" value={g.id} />
                      <button
                        type="submit"
                        className="rounded-lg px-2.5 py-1.5 text-[12px] text-ad-subtle transition-colors hover:bg-ad-danger/10 hover:text-ad-danger"
                      >
                        {guestAdminCopy.hapus}
                      </button>
                    </form>
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
