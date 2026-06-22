import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
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
    <main className="flex min-h-svh flex-col items-center justify-center bg-ink px-6">
      <h1 className="mb-1 font-display text-[28px] font-light text-paper">
        Backoffice Tiska
      </h1>
      <p className="mb-8 text-[13px] text-paper/55">Kelola Kabar & Sorotan</p>

      {isProd && !configured ? (
        <p className="max-w-[360px] text-center text-[13px] leading-[1.7] text-red-400">
          Backoffice belum dikonfigurasi. Set environment variable
          <code className="mx-1 text-gold-soft">ADMIN_PASSWORD</code> dan
          <code className="mx-1 text-gold-soft">ADMIN_SESSION_SECRET</code> di
          Vercel, lalu redeploy.
        </p>
      ) : (
        <LoginForm />
      )}

      {!isProd && (
        <p className="mt-6 text-[12px] text-paper/40">
          Dev: kata sandi default <code className="text-gold-soft">tiska-dev</code>
        </p>
      )}
    </main>
  );
}
