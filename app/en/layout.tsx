import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Tiska Catering — Premium Catering in Jakarta & Bogor since 1980",
    template: "%s — Tiska Catering",
  },
  description:
    "Premium catering for corporate events, weddings, and private celebrations across Jakarta, Bogor & Greater Jakarta. Three generations since 1980, Halal & HACCP kitchen.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Tiska Catering Service",
    title: "Tiska Catering — Premium Catering in Jakarta & Bogor since 1980",
    description:
      "Premium catering for corporate events, weddings, and private celebrations across Jakarta, Bogor & Greater Jakarta. Three generations since 1980.",
  },
};

/** Bagian situs berbahasa Inggris — <html lang> tetap "id", jadi tandai di sini. */
export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <div lang="en">{children}</div>;
}
