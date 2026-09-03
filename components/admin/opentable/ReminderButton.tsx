"use client";

import { useActionState } from "react";
import { sendReminderEmailAction, type FormState } from "@/lib/opentable/actions";

/**
 * Pengingat dikirim manual lewat tombol, bukan cron: Vercel Hobby hanya
 * mengizinkan sedikit cron job dan satu slot sudah dipakai Hari Spesial.
 * Untuk acara sekali jalan, kendali penuh di tangan admin justru lebih baik.
 */
export default function ReminderButton() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    sendReminderEmailAction,
    null,
  );

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!confirm("Kirim email pengingat ke semua tamu yang belum mengonfirmasi?")) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl border border-ad-border px-3.5 py-2 text-[12.5px] text-ad-muted transition-colors hover:border-ad-accent hover:text-ad-accent disabled:opacity-50"
      >
        {pending ? "Mengirim…" : "Kirim pengingat"}
      </button>
      {state?.error && <p className="mt-2 text-[12px] leading-[1.5] text-ad-danger">{state.error}</p>}
      {state?.ok && state.info && <p className="mt-2 text-[12px] text-ad-accent">{state.info}</p>}
    </form>
  );
}
