import { ImageResponse } from "next/og";

export const alt = "Tiska Catering — Celebrate Love with the Finest Flavours";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Fraunces untuk judul OG — di-fetch saat build, fallback serif bila gagal
async function loadFraunces() {
  try {
    const css = await (
      await fetch(
        "https://fonts.googleapis.com/css2?family=Fraunces:wght@300&display=swap",
      )
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
            fontSize: 22,
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: "#a07c34",
            marginBottom: 36,
          }}
        >
          Est. 1980 — Bogor
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 300,
            color: "#f6f1e7",
            lineHeight: 1,
          }}
        >
          Celebrate&nbsp;
          <span style={{ fontStyle: "italic", color: "#d8b876" }}>love</span>
        </div>
        <div
          style={{
            fontSize: 38,
            fontWeight: 300,
            color: "#f6f1e7",
            marginTop: 18,
            opacity: 0.85,
          }}
        >
          with the finest flavours
        </div>
        <div
          style={{
            width: 340,
            height: 1,
            marginTop: 44,
            background:
              "linear-gradient(90deg, rgba(196,160,90,0), #c4a05a, rgba(196,160,90,0))",
          }}
        />
        <div
          style={{
            fontSize: 24,
            letterSpacing: "0.34em",
            textTransform: "uppercase",
            color: "#d8b876",
            marginTop: 40,
          }}
        >
          Tiska Catering Service
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fraunces
        ? [{ name: "Fraunces", data: fraunces, weight: 300 as const }]
        : undefined,
    },
  );
}
