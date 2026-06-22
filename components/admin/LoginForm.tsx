"use client";

import { useActionState } from "react";
import { loginAction, type FormState } from "@/lib/posts/actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    loginAction,
    null,
  );

  return (
    <form action={formAction} className="w-full max-w-[360px]">
      <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-gold-soft">
        Kata sandi
      </label>
      <input
        type="password"
        name="password"
        autoFocus
        required
        className="w-full rounded-lg border border-line bg-ink-2 px-4 py-3 text-[15px] text-paper outline-none transition-colors focus:border-gold/60"
      />
      {state?.error && (
        <p className="mt-3 text-[13px] text-red-400">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-5 w-full rounded-full border border-gold/70 bg-gold/10 py-3 text-[12px] uppercase tracking-[0.2em] text-gold-bright transition-colors hover:bg-gold/20 disabled:opacity-50"
      >
        {pending ? "Memeriksa…" : "Masuk"}
      </button>
    </form>
  );
}
