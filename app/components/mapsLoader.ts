"use client";

import { Loader } from "@googlemaps/js-api-loader";

let loaderInstance: Loader | null = null;
let loadPromise: Promise<typeof google> | null = null;

export function getGoogleMapsLoader() {
  if (!loaderInstance) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      throw new Error(
        "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not defined. " +
          "Copia .env.example a .env.local y agrega tu API key."
      );
    }
    loaderInstance = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["maps", "marker"],
    });
  }
  return loaderInstance;
}

export async function loadGoogleMaps() {
  if (!loadPromise) {
    const loader = getGoogleMapsLoader();
    loadPromise = loader.load();
  }
  return loadPromise;
}
