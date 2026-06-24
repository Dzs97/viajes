import { ImageResponse } from "next/og";
import { IconArt } from "../lib/iconArt";

export const runtime = "edge";

// Maskable icon: Android may crop into circle/squircle/rounded square shapes.
// Safe zone = central 80% of canvas. Background terracota fills full 512x512.
export async function GET() {
  return new ImageResponse(<IconArt pixelSize={512} maskable />, {
    width: 512,
    height: 512,
  });
}
