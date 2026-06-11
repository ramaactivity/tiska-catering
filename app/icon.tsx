import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon sementara: monogram T emas di atas ink (diganti SVG resmi di Fase 4). */
export default function Icon() {
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
          borderRadius: 6,
          color: "#c4a05a",
          fontSize: 22,
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
