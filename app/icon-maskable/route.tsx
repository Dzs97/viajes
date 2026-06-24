import { ImageResponse } from "next/og";

export const runtime = "edge";

// Maskable icon — safe zone is the central 80% (Android crops the edges with various shapes).
// We use a larger background area and smaller text to ensure the "3W" stays visible regardless of mask.
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#c84c2a",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "70%",
            height: "70%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 160,
            fontFamily: "serif",
            fontWeight: 700,
            color: "#fbf6ec",
            letterSpacing: "-0.02em",
          }}
        >
          3W
        </div>
      </div>
    ),
    { width: 512, height: 512 }
  );
}
