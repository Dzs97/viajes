import { ImageResponse } from "next/og";
import { IconArt } from "../lib/iconArt";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(<IconArt pixelSize={192} />, {
    width: 192,
    height: 192,
  });
}
