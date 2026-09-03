import { ImageResponse } from "next/og";

export const alt = "Tiska Open Table — 7 Oktober 2026, Plaza Mutiara Jakarta";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Kartu pratinjau di gelembung WhatsApp. Wajib ada: tautan tanpa pratinjau
 * terlihat seperti phishing — persis sinyal yang salah saat meminta seorang
 * direktur menekan URL yang belum dikenalnya.
 */
async function loadFraunces() {
  try {
    const css = await (
      await fetch("https://fonts.googleapis.com/css2?family=Fraunces:wght@300&display=swap")
    ).text();
    const url = css.match(/src: url\((.+?)\) format/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OgImage() {
  const fraunces = await loadFraunces();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e0d0a",
          fontFamily: fraunces ? "Fraunces" : "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 21,
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: "#a07c34",
            marginBottom: 34,
          }}
        >
          Undangan Khusus
        </div>
        <div style={{ display: "flex", fontSize: 88, fontWeight: 300, color: "#f6f1e7", lineHeight: 1 }}>
          Tiska&nbsp;
          <span style={{ fontStyle: "italic", color: "#d8b876" }}>Open Table</span>
        </div>
        <div
          style={{
            width: 340,
            height: 1,
            marginTop: 42,
            background: "linear-gradient(90deg, rgba(196,160,90,0), #c4a05a, rgba(196,160,90,0))",
          }}
        />
        <div style={{ fontSize: 32, fontWeight: 300, color: "#f6f1e7", marginTop: 40, opacity: 0.9 }}>
          Rabu, 7 Oktober 2026 · 18.00 WIB
        </div>
        <div style={{ fontSize: 24, color: "#f6f1e7", marginTop: 14, opacity: 0.55 }}>
          Plaza Mutiara, Lantai 9 — Mega Kuningan, Jakarta
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fraunces ? [{ name: "Fraunces", data: fraunces, weight: 300 as const }] : undefined,
    },
  );
}
