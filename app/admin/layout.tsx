import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/** Kanvas backoffice: latar ink, teks sans (bukan serif display), antialias. */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh bg-ink font-sans text-paper antialiased">
      {children}
    </div>
  );
}
