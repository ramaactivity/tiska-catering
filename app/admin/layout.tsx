import type { Metadata } from "next";
import { cookies } from "next/headers";
import AdminThemeProvider from "@/components/admin/AdminThemeProvider";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/** Kanvas backoffice: tema dari cookie (default terang) + shell sidebar. */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme =
    (await cookies()).get("admin_theme")?.value === "dark" ? "dark" : "light";

  return (
    <AdminThemeProvider initialTheme={theme}>
      <AdminShell>{children}</AdminShell>
    </AdminThemeProvider>
  );
}
