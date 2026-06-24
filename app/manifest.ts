import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Three Weeks · Inglaterra, Irlanda & Escocia",
    short_name: "Three Weeks",
    description: "Itinerario de viaje de 24 días por las Islas Británicas, mayo 2027",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f4ede0",
    theme_color: "#c84c2a",
    orientation: "portrait-primary",
    lang: "es",
    categories: ["travel", "lifestyle"],
    icons: [
      {
        src: "/icon-192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
