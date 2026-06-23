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
    <form action={formAction} className="w-full">
      <label htmlFor="pw" className="mb-1.5 block text-[12.5px] font-semibold text-ad-text">
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
          className="w-full rounded-xl border border-ad-border bg-ad-input px-3.5 py-3 pr-16 text-[15px] text-ad-text outline-none transition focus:border-ad-accent focus:shadow-[0_0_0_3px_var(--ad-accent-weak)] aria-[invalid=true]:border-ad-danger"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md px-2.5 py-1.5 text-[12px] text-ad-subtle transition-colors hover:text-ad-text"
        >
          {show ? "Sembunyikan" : "Lihat"}
        </button>
      </div>

      {state?.error && (
        <p className="mt-2.5 text-[13px] text-ad-danger">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-5 w-full rounded-xl bg-ad-btn py-3 text-[13px] font-semibold text-ad-btn-fg shadow-[0_1px_2px_var(--ad-shadow)] transition hover:brightness-[1.06] active:scale-[0.98] disabled:opacity-50"
      >
        {pending ? "Memeriksa…" : "Masuk"}
      </button>
    </form>
  );
}
