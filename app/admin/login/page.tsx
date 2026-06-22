import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { NAV_LOGO } from "@/lib/logos-base64";
import { verifySession, adminConfigured } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Masuk — Backoffice Tiska",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await verifySession()) redirect("/admin");
  const configured = adminConfigured();
  const isProd = process.env.NODE_ENV === "production";

  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_35%,var(--ad-accent-weak),transparent_70%)]"
      />
      <div className="relative w-full max-w-[380px]">
        <div className="mb-7 flex flex-col items-center text-center">
          <span className="mb-5 inline-flex items-center rounded-2xl bg-ink px-5 py-3.5 shadow-[0_4px_16px_-6px_var(--ad-shadow)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={NAV_LOGO} alt="Tiska Catering" className="h-9 w-auto" />
          </span>
          <h1 className="font-display text-[24px] font-light text-ad-text">
            Backoffice
          </h1>
          <p className="mt-1 text-[13px] text-ad-muted">Kelola Kabar & Banner</p>
        </div>

        <div className="rounded-2xl border border-ad-border bg-ad-panel p-6 shadow-[0_6px_24px_-8px_var(--ad-shadow)]">
          {isProd && !configured ? (
            <p className="text-center text-[13px] leading-[1.7] text-ad-danger">
              Backoffice belum dikonfigurasi. Set{" "}
              <code className="text-ad-accent">ADMIN_PASSWORD</code> dan{" "}
              <code className="text-ad-accent">ADMIN_SESSION_SECRET</code> di Vercel,
              lalu redeploy.
            </p>
          ) : (
            <LoginForm />
          )}
        </div>

        {!isProd && (
          <p className="mt-5 text-center text-[12px] text-ad-subtle">
            Dev: sandi default <code className="text-ad-accent">tiska-dev</code>
          </p>
        )}
      </div>
    </main>
  );
}
