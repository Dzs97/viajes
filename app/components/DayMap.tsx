"use client";

import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "./mapsLoader";
import type { Location } from "../data/trip";

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

function getCurrentTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return (document.documentElement.dataset.theme as "light" | "dark") || "light";
}

/**
 * Build a Google Maps Directions URL with multiple waypoints.
 * Google Maps allows up to 9 waypoints (10 stops total) per directions URL.
 */
function buildRouteUrl(locations: Location[]): string {
  if (locations.length === 0) return "https://www.google.com/maps";
  if (locations.length === 1) {
    return `https://www.google.com/maps/search/?api=1&query=${locations[0].lat},${locations[0].lng}`;
  }

  const origin = `${locations[0].lat},${locations[0].lng}`;
  const destination = `${locations[locations.length - 1].lat},${locations[locations.length - 1].lng}`;
  const waypoints = locations
    .slice(1, -1)
    .map((l) => `${l.lat},${l.lng}`)
    .join("|");

  const params = new URLSearchParams({
    api: "1",
    origin,
    destination,
    travelmode: "driving",
  });

  let url = `https://www.google.com/maps/dir/?${params.toString()}`;
  if (waypoints) {
    url += `&waypoints=${encodeURIComponent(waypoints)}`;
  }
  return url;
}

export default function DayMap({ locations }: { locations: Location[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const polylineRef = useRef<google.maps.Polyline | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current || locations.length === 0) return;

    let cancelled = false;

    loadGoogleMaps()
      .then((google) => {
        if (cancelled || !containerRef.current) return;

        const theme = getCurrentTheme();
        const bounds = new google.maps.LatLngBounds();
        locations.forEach((loc) => bounds.extend({ lat: loc.lat, lng: loc.lng }));

        const map = new google.maps.Map(containerRef.current, {
          center: bounds.getCenter(),
          zoom: 9,
          styles: theme === "dark" ? darkStyle : lightStyle,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          gestureHandling: "greedy",
        });

        mapRef.current = map;
        infoWindowRef.current = new google.maps.InfoWindow();

        locations.forEach((loc, idx) => {
          const marker = new google.maps.Marker({
            position: { lat: loc.lat, lng: loc.lng },
            map,
            label: {
              text: String(idx + 1),
              color: "#ffffff",
              fontSize: "12px",
              fontWeight: "700",
              fontFamily: "JetBrains Mono, monospace",
            },
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 14,
              fillColor: theme === "dark" ? "#e87a5d" : "#c84c2a",
              fillOpacity: 1,
              strokeColor: theme === "dark" ? "#16201d" : "#fbf6ec",
              strokeWeight: 3,
            },
            title: loc.name,
          });

          marker.addListener("click", () => {
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`;
            const content = `
              <div class="popup-content">
                <div class="popup-title">${escapeHtml(loc.name)}</div>
                ${loc.time ? `<div class="popup-time">${escapeHtml(loc.time)}${loc.duration ? ` · ${escapeHtml(loc.duration)}` : ""}</div>` : ""}
                ${loc.notes ? `<div class="popup-notes">${escapeHtml(loc.notes)}</div>` : ""}
                <a class="popup-link" href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer">Ver ubicación en Google Maps →</a>
              </div>
            `;
            infoWindowRef.current?.setContent(content);
            infoWindowRef.current?.open(map, marker);
          });

          markersRef.current.push(marker);
        });

        polylineRef.current = new google.maps.Polyline({
          path: locations.map((l) => ({ lat: l.lat, lng: l.lng })),
          geodesic: false,
          strokeColor: theme === "dark" ? "#e87a5d" : "#c84c2a",
          strokeOpacity: 0,
          icons: [
            {
              icon: {
                path: "M 0,-1 0,1",
                strokeOpacity: 0.8,
                scale: 3,
              },
              offset: "0",
              repeat: "12px",
            },
          ],
          map,
        });

        if (locations.length > 1) {
          map.fitBounds(bounds, 50);
        }

        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Google Maps error:", err);
        setError(err.message || "Error cargando Google Maps");
        setLoading(false);
      });

    return () => {
      cancelled = true;
      markersRef.current.forEach((m) => m.setMap(null));
      markersRef.current = [];
      polylineRef.current?.setMap(null);
      infoWindowRef.current?.close();
    };
  }, [locations]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (!mapRef.current) return;
      const theme = getCurrentTheme();
      mapRef.current.setOptions({
        styles: theme === "dark" ? darkStyle : lightStyle,
      });
      markersRef.current.forEach((marker) => {
        marker.setIcon({
          path: google.maps.SymbolPath.CIRCLE,
          scale: 14,
          fillColor: theme === "dark" ? "#e87a5d" : "#c84c2a",
          fillOpacity: 1,
          strokeColor: theme === "dark" ? "#16201d" : "#fbf6ec",
          strokeWeight: 3,
        });
      });
      if (polylineRef.current) {
        polylineRef.current.setOptions({
          icons: [
            {
              icon: {
                path: "M 0,-1 0,1",
                strokeOpacity: 0.8,
                strokeColor: theme === "dark" ? "#e87a5d" : "#c84c2a",
                scale: 3,
              },
              offset: "0",
              repeat: "12px",
            },
          ],
        });
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  if (locations.length === 0) return null;

  const routeUrl = buildRouteUrl(locations);
  const isRoute = locations.length >= 2;
  const waypointWarning = locations.length > 10;

  return (
    <div>
      <a
        className="route-button"
        href={routeUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 11 22 2 13 21 11 13 3 11" />
        </svg>
        <span>
          {isRoute ? "Abrir ruta completa del día en Google Maps" : "Abrir ubicación en Google Maps"}
        </span>
      </a>
      {waypointWarning && (
        <p className="route-warning">
          Google Maps soporta máximo 10 paradas. Se mostrarán las primeras.
        </p>
      )}
      <div className="map-wrapper">
        {loading && <div className="map-loading">Cargando mapa…</div>}
        {error && (
          <div className="map-error">
            <strong>No se pudo cargar el mapa</strong>
            <span>{error}</span>
            <span style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
              Verifica que tu API key esté en .env.local y tenga Maps JavaScript API activada.
            </span>
          </div>
        )}
        <div ref={containerRef} className="map-container" />
      </div>
    </div>
  );
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
