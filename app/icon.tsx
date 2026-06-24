import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 16,
          fontFamily: "serif",
          fontWeight: 700,
          color: "#fbf6ec",
          borderRadius: "50%",
        }}
      >
        3W
      </div>
    ),
    { ...size }
  );
}
