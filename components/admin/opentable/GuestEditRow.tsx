"use client";

import Link from "next/link";
import { useActionState } from "react";
import { updateGuestAction, type FormState } from "@/lib/opentable/actions";
import { guestAdminCopy } from "@/lib/opentable/content";
import { tampilHp } from "@/lib/opentable/kode";
import type { Guest } from "@/lib/opentable/types";

const KELAS =
  "w-full rounded-lg border border-ad-border bg-ad-input px-3 py-2 text-[13.5px] text-ad-text outline-none transition focus:border-ad-accent focus:shadow-[0_0_0_3px_var(--ad-accent-weak)]";

/** Baris tabel yang berubah jadi formulir. Mode sunting didorong ?edit=<id>. */
export default function GuestEditRow({ guest }: { guest: Guest }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    updateGuestAction,
    null,
  );

  return (
    <tr className="border-b border-ad-border/60 bg-ad-accent-weak/40 last:border-0">
      <td colSpan={4} className="px-4 py-4">
        <form action={formAction}>
          <input type="hidden" name="id" value={guest.id} />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <label className="block">
              <span className="mb-1.5 block text-[11px] uppercase tracking-[0.12em] text-ad-subtle">
                Nama
              </span>
              <input name="nama" defaultValue={guest.nama} required maxLength={80} className={KELAS} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[11px] uppercase tracking-[0.12em] text-ad-subtle">
                Jabatan
              </span>
              <input name="jabatan" defaultValue={guest.jabatan} maxLength={100} className={KELAS} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[11px] uppercase tracking-[0.12em] text-ad-subtle">
                Perusahaan
              </span>
              <input name="perusahaan" defaultValue={guest.perusahaan} maxLength={100} className={KELAS} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[11px] uppercase tracking-[0.12em] text-ad-subtle">
                WhatsApp
              </span>
              <input name="hp" defaultValue={tampilHp(guest.hp)} className={KELAS} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[11px] uppercase tracking-[0.12em] text-ad-subtle">
                Email
              </span>
              <input name="email" type="email" defaultValue={guest.email} maxLength={120} className={KELAS} />
            </label>
          </div>

          {state?.error && <p className="mt-3 text-[13px] text-ad-danger">{state.error}</p>}

          <div className="mt-4 flex items-center gap-2">
            <button
              type="submit"
              disabled={pending}
              className="rounded-xl bg-ad-btn px-4 py-2 text-[13px] font-semibold text-ad-btn-fg transition hover:brightness-[1.06] active:scale-[0.98] disabled:opacity-50"
            >
              {pending ? "…" : guestAdminCopy.simpan}
            </button>
            <Link
              href="/admin/open-table"
              className="rounded-xl border border-ad-border px-3.5 py-2 text-[13px] text-ad-muted transition-colors hover:text-ad-text"
            >
              {guestAdminCopy.batal}
            </Link>
          </div>
        </form>
      </td>
    </tr>
  );
}
