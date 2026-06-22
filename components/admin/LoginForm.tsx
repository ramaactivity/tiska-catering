"use client";

import { useActionState, useState } from "react";
import { loginAction, type FormState } from "@/lib/posts/actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    loginAction,
    null,
  );
  const [show, setShow] = useState(false);

  return (
    <form action={formAction} className="w-full max-w-[340px]">
      <label htmlFor="pw" className="mb-2 block text-[12px] font-medium text-paper/60">
        Kata sandi
      </label>
      <div className="relative">
        <input
          id="pw"
          type={show ? "text" : "password"}
          name="password"
          autoFocus
          required
          aria-invalid={!!state?.error}
          className="w-full rounded-lg border border-line bg-ink-3/60 px-3.5 py-3 pr-16 text-[15px] text-paper outline-none transition-colors placeholder:text-paper/30 focus:border-gold/60 focus:bg-ink-3 aria-[invalid=true]:border-red-500/60"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md px-2.5 py-1.5 text-[12px] text-paper/45 transition-colors hover:text-paper"
        >
          {show ? "Sembunyikan" : "Lihat"}
        </button>
      </div>

      {state?.error && (
        <p className="mt-2.5 text-[13px] text-red-400">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-5 w-full rounded-lg bg-gold py-3 text-[13px] font-semibold text-ink transition-colors hover:bg-gold-soft disabled:opacity-50"
      >
        {pending ? "Memeriksa…" : "Masuk"}
      </button>
    </form>
  );
}
