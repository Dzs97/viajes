import { ImageResponse } from "next/og";

export const runtime = "edge";

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
          fontSize: 92,
          fontFamily: "serif",
          fontWeight: 700,
          color: "#fbf6ec",
          letterSpacing: "-0.02em",
        }}
      >
        3W
      </div>
    ),
    { width: 192, height: 192 }
  );
}
