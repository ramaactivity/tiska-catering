import { Fraunces, Instrument_Serif, Space_Grotesk } from "next/font/google";

// Display / heading — variable font, opsz 9..144, weight 300 untuk heading besar
export const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

// Aksen italic emas (kata kunci: love, flavours, kisah Anda)
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

// Body / UI / label uppercase
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});
