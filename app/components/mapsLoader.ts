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

const lightStyle: google.maps.MapTypeStyle[] = [
  { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "transit", elementType: "labels", stylers: [{ visibility: "off" }] },
];

const darkStyle: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#16201d" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#16201d" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#b0a690" }] },
  { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#2d3a36" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#1a2421" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#7a7361" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0f1614" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#5a5246" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#1f2a27" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#2d3a36" }] },
  { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
];

export function getCurrentTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return (document.documentElement.dataset.theme as "light" | "dark") || "light";
}

export const mapStyles = { light: lightStyle, dark: darkStyle };
