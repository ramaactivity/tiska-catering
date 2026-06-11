import type { Metadata } from "next";
import "./globals.css";
import { fraunces, instrumentSerif, spaceGrotesk } from "./fonts";
import LenisProvider from "@/components/providers/LenisProvider";

export const metadata: Metadata = {
  title: "Tiska Catering — Celebrate Love with the Finest Flavours",
  description:
    "Katering premium di Bogor, Jakarta, dan JaDeTaBek sejak 1980. Tiga generasi menghadirkan rasa istimewa untuk pernikahan, acara korporat, dan perayaan Anda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${fraunces.variable} ${instrumentSerif.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
