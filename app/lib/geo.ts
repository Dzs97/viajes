import type { Location } from "../data/trip";

const EARTH_RADIUS_KM = 6371;

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

// Haversine distance in kilometers between two coordinates.
export function distanceKm(a: Location, b: Location): number {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

// Estimate driving time between two coordinates using straight-line distance
// scaled by a road factor (~1.3x) and average speed (60 km/h mixed driving).
// Returns formatted string like "1h 25min" or "20 min".
// Returns null if locations are very close (under 1 km) — usually same city stops.
export function estimateDriveTime(a: Location, b: Location): { minutes: number; label: string; km: number } | null {
  const km = distanceKm(a, b) * 1.3;
  if (km < 1) return null;
  const minutes = Math.round((km / 60) * 60);
  if (minutes < 5) return null;

  let label: string;
  if (minutes < 60) {
    label = `${minutes} min`;
  } else {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    label = m === 0 ? `${h}h` : `${h}h ${m}min`;
  }
  return { minutes, label, km: Math.round(km) };
}
