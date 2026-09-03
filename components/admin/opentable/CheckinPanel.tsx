"use client";

import { useActionState, useCallback, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { checkinAction, undoCheckinAction, type FormState } from "@/lib/opentable/actions";
import { checkinCopy } from "@/lib/opentable/content";
import { tampilHp } from "@/lib/opentable/kode";
import type { Rsvp } from "@/lib/opentable/types";

const QrScanner = dynamic(() => import("./QrScanner"), {
  ssr: false,
  loading: () => (
    <div className="aspect-square w-full animate-pulse rounded-xl border border-ad-border bg-ad-input" />
  ),
});

const FMT = new Intl.DateTimeFormat("id-ID", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Jakarta",
});

/**
 * Panel check-in dengan rantai cadangan berlapis, dibangun dari yang paling
 * sederhana: cari nama (jalan di perangkat apa pun) → kode manual → foto QR →
 * pindai kamera. Izin kamera yang gagal jam 18.05 tidak boleh mematikan absensi.
 */
export default function CheckinPanel({ rows }: { rows: Rsvp[] }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(checkinAction, null);
  const [cari, setCari] = useState("");
  const [scan, setScan] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const kodeRef = useRef<HTMLInputElement>(null);

  const hasil = useMemo(() => {
    const q = cari.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.nama, r.perusahaan, r.jabatan, r.kode, r.hp].join(" ").toLowerCase().includes(q),
    );
  }, [rows, cari]);

  const kirimKode = useCallback((kode: string) => {
    if (!kodeRef.current || !formRef.current) return;
    kodeRef.current.value = kode;
    formRef.current.requestSubmit();
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div>
        <input
          value={cari}
          onChange={(e) => setCari(e.target.value)}
          placeholder={checkinCopy.cariPlaceholder}
          className="mb-4 w-full rounded-xl border border-ad-border bg-ad-input px-3.5 py-2.5 text-[14px] text-ad-text outline-none transition focus:border-ad-accent focus:shadow-[0_0_0_3px_var(--ad-accent-weak)]"
        />

        {hasil.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ad-border-strong bg-ad-panel px-6 py-12 text-center text-[14px] text-ad-muted">
            {rows.length === 0 ? checkinCopy.kosong : checkinCopy.tidakKetemu}
          </div>
        ) : (
          <ul className="overflow-hidden rounded-2xl border border-ad-border bg-ad-panel">
            {hasil.map((r) => (
              <li
                key={r.id}
                className="flex items-center justify-between gap-4 border-b border-ad-border/60 px-4 py-3 last:border-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-medium text-ad-text">
                    {r.nama}
                    {r.pax > 1 && <span className="ml-2 text-[12px] text-ad-accent">+{r.pax - 1}</span>}
                  </p>
                  <p className="truncate text-[12.5px] text-ad-muted">
                    {[r.jabatan, r.perusahaan].filter(Boolean).join(" · ") || tampilHp(r.hp)}
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ad-subtle">
                    {r.kode}
                  </p>
                </div>
                {r.checkedInAt ? (
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-[12px] font-medium text-ad-accent">
                      {checkinCopy.sudah} · {FMT.format(new Date(r.checkedInAt))}
                    </span>
                    <form action={undoCheckinAction}>
                      <input type="hidden" name="id" value={r.id} />
                      <button
                        type="submit"
                        className="rounded-lg px-2 py-1 text-[11.5px] text-ad-subtle transition-colors hover:text-ad-danger"
                      >
                        {checkinCopy.tombolBatal}
                      </button>
                    </form>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => kirimKode(r.kode)}
                    className="shrink-0 rounded-xl bg-ad-btn px-3.5 py-2 text-[12.5px] font-semibold text-ad-btn-fg transition hover:brightness-[1.06] active:scale-[0.98]"
                  >
                    {checkinCopy.tombolCheckin}
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <aside className="lg:sticky lg:top-6 lg:self-start">
        <form ref={formRef} action={formAction} className="rounded-2xl border border-ad-border bg-ad-panel p-4">
          <input
            ref={kodeRef}
            name="kode"
            placeholder={checkinCopy.kodePlaceholder}
            autoComplete="off"
            spellCheck={false}
            className="w-full rounded-xl border border-ad-border bg-ad-input px-3.5 py-2.5 font-mono text-[14px] uppercase tracking-[0.14em] text-ad-text outline-none transition focus:border-ad-accent focus:shadow-[0_0_0_3px_var(--ad-accent-weak)]"
          />
          <button
            type="submit"
            disabled={pending}
            className="mt-3 w-full rounded-xl bg-ad-btn py-2.5 text-[13px] font-semibold text-ad-btn-fg transition hover:brightness-[1.06] active:scale-[0.98] disabled:opacity-50"
          >
            {pending ? "…" : checkinCopy.tombolKode}
          </button>

          {state?.error && <p className="mt-3 text-[13px] text-ad-danger">{state.error}</p>}
          {state?.ok && state.info && <p className="mt-3 text-[13px] text-ad-accent">{state.info}</p>}

          <button
            type="button"
            onClick={() => setScan((s) => !s)}
            className="mt-3 w-full rounded-xl border border-ad-border py-2.5 text-[12.5px] text-ad-muted transition-colors hover:border-ad-accent hover:text-ad-accent"
          >
            {scan ? checkinCopy.tombolTutupScan : checkinCopy.tombolScan}
          </button>

          {scan && (
            <div className="mt-4">
              <QrScanner onKode={kirimKode} />
            </div>
          )}

          <p className="mt-4 text-[12px] leading-[1.65] text-ad-subtle">{checkinCopy.petunjuk}</p>
        </form>
      </aside>
    </div>
  );
}
