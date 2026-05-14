"use client";

import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "./mapsLoader";
import { trip } from "../data/trip";

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
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#7a7361" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0f1614" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#1f2a27" }] },
  { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
];

const COUNTRY_COLORS: Record<string, { light: string; dark: string }> = {
  inglaterra: { light: "#c84c2a", dark: "#e87a5d" }, // terracota
  irlanda: { light: "#5a7d3a", dark: "#7ea35a" }, // verde musgo
  escocia: { light: "#b89322", dark: "#d4b04a" }, // mostaza
};

function getCurrentTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return (document.documentElement.dataset.theme as "light" | "dark") || "light";
}

export default function OverviewMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const polylinesRef = useRef<google.maps.Polyline[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;

    loadGoogleMaps()
      .then((google) => {
        if (cancelled || !containerRef.current) return;

        const theme = getCurrentTheme();
        const bounds = new google.maps.LatLngBounds();

        trip.forEach((country) => {
          country.days.forEach((day) => {
            day.locations.forEach((loc) => {
              bounds.extend({ lat: loc.lat, lng: loc.lng });
            });
          });
        });

        // Fallback bounds if no locations yet
        const hasLocations = !bounds.isEmpty();
        if (!hasLocations) {
          // Center on British Isles
          bounds.extend({ lat: 51.5, lng: -0.1 }); // London
          bounds.extend({ lat: 56.5, lng: -4.2 }); // Scotland
          bounds.extend({ lat: 53.3, lng: -8.5 }); // Ireland
        }

        const map = new google.maps.Map(containerRef.current, {
          center: bounds.getCenter(),
          zoom: 6,
          styles: theme === "dark" ? darkStyle : lightStyle,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          gestureHandling: "greedy",
        });

        mapRef.current = map;

        trip.forEach((country) => {
          const color = COUNTRY_COLORS[country.id];
          if (!color) return;
          const fillColor = theme === "dark" ? color.dark : color.light;
          const strokeColor = theme === "dark" ? "#16201d" : "#fbf6ec";

          const path: google.maps.LatLngLiteral[] = [];

          country.days.forEach((day) => {
            day.locations.forEach((loc) => {
              const marker = new google.maps.Marker({
                position: { lat: loc.lat, lng: loc.lng },
                map,
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 7,
                  fillColor,
                  fillOpacity: 1,
                  strokeColor,
                  strokeWeight: 2,
                },
                title: `${country.name} · Día ${day.number} · ${loc.name}`,
              });
              markersRef.current.push(marker);
              path.push({ lat: loc.lat, lng: loc.lng });
            });
          });

          if (path.length > 1) {
            const polyline = new google.maps.Polyline({
              path,
              geodesic: false,
              strokeColor: fillColor,
              strokeOpacity: 0,
              icons: [
                {
                  icon: {
                    path: "M 0,-1 0,1",
                    strokeOpacity: 0.7,
                    scale: 2,
                  },
                  offset: "0",
                  repeat: "10px",
                },
              ],
              map,
            });
            polylinesRef.current.push(polyline);
          }
        });

        if (hasLocations) {
          map.fitBounds(bounds, 60);
        } else {
          map.fitBounds(bounds, 80);
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
      polylinesRef.current.forEach((p) => p.setMap(null));
      polylinesRef.current = [];
    };
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (!mapRef.current) return;
      const theme = getCurrentTheme();
      mapRef.current.setOptions({ styles: theme === "dark" ? darkStyle : lightStyle });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="overview-map-section">
      <div className="overview-map-header">
        <div className="hero-eyebrow">Ruta completa</div>
        <h2 className="overview-map-title">Vista general del viaje</h2>
        <div className="overview-map-legend">
          {trip.map((c) => {
            const color = COUNTRY_COLORS[c.id];
            if (!color) return null;
            return (
              <span key={c.id} className="legend-item">
                <span
                  className="legend-dot"
                  style={{ background: `var(--legend-${c.id}, ${color.light})` }}
                />
                {c.name}
              </span>
            );
          })}
        </div>
      </div>
      <div className="overview-map-wrapper">
        {loading && <div className="map-loading">Cargando mapa…</div>}
        {error && (
          <div className="map-error">
            <strong>No se pudo cargar el mapa</strong>
            <span>{error}</span>
          </div>
        )}
        <div ref={containerRef} className="overview-map-container" />
      </div>
    </section>
  );
}
