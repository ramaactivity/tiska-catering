import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon sementara: monogram T emas di atas ink. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e0d0a",
          color: "#c4a05a",
          fontSize: 120,
          fontFamily: "Georgia, serif",
          fontWeight: 400,
        }}
      >
        T
      </div>
    ),
    size,
  );
}
