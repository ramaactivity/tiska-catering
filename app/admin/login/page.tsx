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
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_38%,rgba(196,160,90,0.08),transparent_70%)]"
      />
      <div className="relative flex flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={NAV_LOGO} alt="Tiska Catering" className="mb-6 h-11 w-auto" />
        <h1 className="font-display text-[26px] font-light text-paper">
          Backoffice
        </h1>
        <p className="mb-9 mt-1 text-[13px] text-paper/50">
          Kelola Kabar & Sorotan
        </p>

        {isProd && !configured ? (
          <p className="max-w-[340px] text-center text-[13px] leading-[1.7] text-red-400">
            Backoffice belum dikonfigurasi. Set{" "}
            <code className="text-gold-soft">ADMIN_PASSWORD</code> dan{" "}
            <code className="text-gold-soft">ADMIN_SESSION_SECRET</code> di Vercel,
            lalu redeploy.
          </p>
        ) : (
          <LoginForm />
        )}

        {!isProd && (
          <p className="mt-6 text-[12px] text-paper/40">
            Dev: sandi default <code className="text-gold-soft">tiska-dev</code>
          </p>
        )}
      </div>
    </main>
  );
}
