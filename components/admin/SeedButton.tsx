"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { seedExamplesAction, type SeedState } from "@/lib/seed-actions";

export default function SeedButton() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<SeedState, FormData>(
    seedExamplesAction,
    null,
  );

  useEffect(() => {
    if (state?.ok) router.refresh();
  }, [state, router]);

  return (
    <form action={formAction} className="flex flex-col items-end gap-1.5">
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg border border-ad-border bg-ad-input px-4 py-2.5 text-[13px] font-medium text-ad-text transition-colors hover:border-ad-accent hover:text-ad-accent active:scale-[0.98] disabled:opacity-50"
      >
        {pending ? "Mengisi…" : "Isi contoh"}
      </button>
      {state?.error && (
        <p className="max-w-[320px] text-right text-[12px] leading-[1.5] text-ad-danger">
          {state.error}
        </p>
      )}
      {state?.ok && (
        <p className="text-[12px] text-ad-accent">{state.info}</p>
      )}
    </form>
  );
}
