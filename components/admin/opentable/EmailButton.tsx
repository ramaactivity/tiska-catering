"use client";

import { useActionState } from "react";
import { sendInviteEmailAction, type FormState } from "@/lib/opentable/actions";

/** Tombol kirim undangan lewat email — per tamu (id) atau massal (id kosong). */
export default function EmailButton({
  id,
  label,
  labelProses,
  utama,
}: {
  id?: string;
  label: string;
  labelProses: string;
  utama?: boolean;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    sendInviteEmailAction,
    null,
  );

  return (
    <form action={formAction} className={utama ? "" : "contents"}>
      {id && <input type="hidden" name="id" value={id} />}
      <button
        type="submit"
        disabled={pending}
        className={
          utama
            ? "rounded-xl border border-ad-border px-3.5 py-2 text-[12.5px] text-ad-muted transition-colors hover:border-ad-accent hover:text-ad-accent disabled:opacity-50"
            : "rounded-lg px-2.5 py-1.5 text-[12px] text-ad-subtle transition-colors hover:bg-ad-accent-weak hover:text-ad-accent disabled:opacity-50"
        }
      >
        {pending ? labelProses : label}
      </button>
      {state?.error && <p className="mt-2 text-[12px] leading-[1.5] text-ad-danger">{state.error}</p>}
      {state?.ok && state.info && <p className="mt-2 text-[12px] text-ad-accent">{state.info}</p>}
    </form>
  );
}
