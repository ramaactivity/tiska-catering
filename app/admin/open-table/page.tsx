import Link from "next/link";
import { requireSession } from "@/lib/auth";
import { getGuests } from "@/lib/opentable/store";
import { tautanUndangan } from "@/lib/opentable/config";
import { guestAdminCopy } from "@/lib/opentable/content";
import type { Guest } from "@/lib/opentable/types";
import GuestImport from "@/components/admin/opentable/GuestImport";
import GuestTable from "@/components/admin/opentable/GuestTable";
import EmailButton from "@/components/admin/opentable/EmailButton";
import CopyAllButton from "@/components/admin/opentable/GuestToolbar";

export const dynamic = "force-dynamic";

const F = guestAdminCopy.filter;

const FILTER: { key: keyof typeof F; cocok: (g: Guest) => boolean }[] = [
  { key: "all", cocok: () => true },
  { key: "belum-kirim", cocok: (g) => g.status === "belum-kirim" },
  { key: "terkirim", cocok: (g) => g.status === "terkirim" },
  { key: "dibuka", cocok: (g) => !!g.openedAt },
  { key: "rsvp", cocok: (g) => g.status === "rsvp" },
  { key: "nohp", cocok: (g) => !g.hp },
];

type Props = { searchParams: Promise<{ f?: string; q?: string; edit?: string }> };

export default async function DaftarUndanganPage({ searchParams }: Props) {
  await requireSession();
  const { f, q, edit } = await searchParams;
  const guests = await getGuests();

  const aktif = FILTER.find((x) => x.key === f) ?? FILTER[0];
  const cari = (q ?? "").trim().toLowerCase();
  const rows = guests
    .filter(aktif.cocok)
    .filter((g) =>
      cari
        ? [g.nama, g.jabatan, g.perusahaan, g.hp, g.email, g.kode]
            .join(" ")
            .toLowerCase()
            .includes(cari)
        : true,
    );

  const terkirim = guests.filter((g) => g.status !== "belum-kirim").length;
  const dibuka = guests.filter((g) => g.openedAt).length;
  const belumEmail = guests.filter((g) => g.email && g.status === "belum-kirim").length;
  const semuaTautan = guests.map((g) => `${g.nama}\t${tautanUndangan(g.nama, g.kode)}`).join("\n");

  const url = (key: string) => {
    const p = new URLSearchParams();
    if (key !== "all") p.set("f", key);
    if (cari) p.set("q", cari);
    const s = p.toString();
    return `/admin/open-table${s ? `?${s}` : ""}`;
  };

  return (
    <>
      <GuestImport />

      {guests.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ad-border-strong bg-ad-panel px-6 py-16 text-center">
          <h2 className="font-display text-[22px] font-light text-ad-text">
            Daftar undangan masih kosong
          </h2>
          <p className="mx-auto mt-2 max-w-[480px] text-[14px] leading-[1.7] text-ad-muted">
            Impor daftar tamu dari Excel atau Google Sheets. Setiap tamu otomatis
            mendapat tautan undangan personal beserta pelacak dibuka atau belum.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {FILTER.map((x) => {
                const on = x.key === aktif.key;
                const jml = guests.filter(x.cocok).length;
                return (
                  <Link
                    key={x.key}
                    href={url(x.key)}
                    className={`rounded-lg border px-3 py-1.5 text-[12.5px] transition-colors ${
                      on
                        ? "border-ad-accent bg-ad-accent-weak text-ad-accent"
                        : "border-ad-border text-ad-muted hover:text-ad-text"
                    }`}
                  >
                    {F[x.key]} <span className="opacity-60">{jml}</span>
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-wrap items-start gap-2">
              <CopyAllButton baris={semuaTautan} />
              <a
                href="/admin/open-table/export"
                className="rounded-xl border border-ad-border px-3.5 py-2 text-[12.5px] text-ad-muted transition-colors hover:border-ad-accent hover:text-ad-accent"
              >
                {guestAdminCopy.unduhCsv}
              </a>
              {belumEmail > 0 && (
                <EmailButton
                  utama
                  label={`Kirim email ke ${belumEmail} tamu`}
                  labelProses="Mengirim…"
                />
              )}
            </div>
          </div>

          {/* Pencarian lewat GET biasa — hasilnya dirender server, tanpa JS. */}
          <form action="/admin/open-table" method="get" className="mb-4 flex gap-2">
            {aktif.key !== "all" && <input type="hidden" name="f" value={aktif.key} />}
            <input
              name="q"
              defaultValue={q ?? ""}
              placeholder={guestAdminCopy.cariPlaceholder}
              className="w-full max-w-[380px] rounded-xl border border-ad-border bg-ad-input px-3.5 py-2 text-[13.5px] text-ad-text outline-none transition focus:border-ad-accent focus:shadow-[0_0_0_3px_var(--ad-accent-weak)]"
            />
            <button
              type="submit"
              className="rounded-xl border border-ad-border px-3.5 py-2 text-[12.5px] text-ad-muted transition-colors hover:border-ad-accent hover:text-ad-accent"
            >
              Cari
            </button>
            {cari && (
              <Link
                href={url(aktif.key === "all" ? "all" : aktif.key).replace(/[?&]q=[^&]*/, "")}
                className="self-center px-1 text-[12.5px] text-ad-subtle transition-colors hover:text-ad-text"
              >
                Hapus
              </Link>
            )}
          </form>

          <p className="mb-3 text-[12.5px] text-ad-subtle">
            {guests.length} tamu · {terkirim} sudah dikirimi · {dibuka} membuka undangan
            {rows.length !== guests.length && ` · menampilkan ${rows.length}`}
          </p>

          {rows.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-ad-border-strong bg-ad-panel px-6 py-12 text-center text-[14px] text-ad-muted">
              {guestAdminCopy.tidakKetemu}
            </div>
          ) : (
            <GuestTable guests={rows} editId={edit} />
          )}
        </>
      )}
    </>
  );
}
