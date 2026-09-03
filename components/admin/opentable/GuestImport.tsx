"use client";

import { useActionState, useRef, useState } from "react";
import { importGuestsAction, type FormState } from "@/lib/opentable/actions";
import { adminCopy } from "@/lib/opentable/content";

export default function GuestImport() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    importGuestsAction,
    null,
  );
  const [buka, setBuka] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  if (!buka) {
    return (
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setBuka(true)}
          className="rounded-xl bg-ad-btn px-4 py-2.5 text-[13px] font-semibold text-ad-btn-fg shadow-[0_1px_2px_var(--ad-shadow)] transition hover:brightness-[1.06] active:scale-[0.98]"
        >
          Impor daftar tamu
        </button>
        {state?.info && <p className="text-[13px] text-ad-muted">{state.info}</p>}
      </div>
    );
  }

  return (
    <form action={formAction} className="mb-8 rounded-2xl border border-ad-border bg-ad-panel p-5">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[15px] font-semibold text-ad-text">{adminCopy.imporJudul}</h2>
          <p className="mt-1 max-w-[720px] text-[13px] leading-[1.65] text-ad-muted">
            {adminCopy.imporPetunjuk}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setBuka(false)}
          className="shrink-0 rounded-lg px-2.5 py-1.5 text-[12.5px] text-ad-subtle transition-colors hover:text-ad-text"
        >
          Tutup
        </button>
      </div>

      <textarea
        ref={ref}
        name="teks"
        rows={9}
        spellCheck={false}
        placeholder={adminCopy.imporContoh}
        className="w-full rounded-xl border border-ad-border bg-ad-input px-3.5 py-3 font-mono text-[12.5px] leading-[1.7] text-ad-text outline-none transition placeholder:text-ad-subtle focus:border-ad-accent focus:shadow-[0_0_0_3px_var(--ad-accent-weak)]"
      />

      {state?.error && <p className="mt-2.5 text-[13px] text-ad-danger">{state.error}</p>}
      {state?.ok && state.info && <p className="mt-2.5 text-[13px] text-ad-accent">{state.info}</p>}

      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-ad-btn px-4 py-2.5 text-[13px] font-semibold text-ad-btn-fg transition hover:brightness-[1.06] active:scale-[0.98] disabled:opacity-50"
        >
          {pending ? "Menyimpan…" : "Tambahkan ke daftar"}
        </button>
        <button
          type="button"
          onClick={() => {
            if (ref.current) ref.current.value = "";
          }}
          className="rounded-xl border border-ad-border px-3.5 py-2.5 text-[13px] text-ad-muted transition-colors hover:text-ad-text"
        >
          Kosongkan
        </button>
      </div>
    </form>
  );
}
