"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import type { Location } from "../data/trip";

// Fix Leaflet's default icon paths for Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function FitBounds({ locations }: { locations: Location[] }) {
  const map = useMap();
  useEffect(() => {
    if (locations.length === 0) return;
    const bounds = L.latLngBounds(locations.map((l) => [l.lat, l.lng]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 11 });
  }, [locations, map]);
  return null;
}

function makeIcon(index: number) {
  return L.divIcon({
    className: "custom-marker-wrapper",
    html: `<div class="custom-marker">${index + 1}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
}

export default function DayMap({ locations }: { locations: Location[] }) {
  if (locations.length === 0) return null;

  const center: [number, number] = [locations[0].lat, locations[0].lng];
  const polyline: [number, number][] = locations.map((l) => [l.lat, l.lng]);

  return (
    <div className="map-wrapper">
      <MapContainer
        center={center}
        zoom={9}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline
          positions={polyline}
          pathOptions={{
            color: "#c84c2a",
            weight: 3,
            opacity: 0.8,
            dashArray: "8 6",
          }}
        />
        {locations.map((loc, idx) => (
          <Marker
            key={`${loc.name}-${idx}`}
            position={[loc.lat, loc.lng]}
            icon={makeIcon(idx)}
          >
            <Popup>
              <div className="popup-title">{loc.name}</div>
              {loc.time && <div className="popup-time">{loc.time}</div>}
              {loc.notes && <div style={{ fontSize: "0.85rem", marginBottom: "0.5rem" }}>{loc.notes}</div>}
              <a
                className="popup-link"
                href={`https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir en Google Maps →
              </a>
            </Popup>
          </Marker>
        ))}
        <FitBounds locations={locations} />
      </MapContainer>
    </div>
  );
}
