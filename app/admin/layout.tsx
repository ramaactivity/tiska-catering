import type { Metadata } from "next";
import { cookies } from "next/headers";
import AdminThemeProvider from "@/components/admin/AdminThemeProvider";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/** Kanvas backoffice: tema dibaca dari cookie (default terang) → tanpa flash. */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme =
    (await cookies()).get("admin_theme")?.value === "dark" ? "dark" : "light";

  return <AdminThemeProvider initialTheme={theme}>{children}</AdminThemeProvider>;
}
