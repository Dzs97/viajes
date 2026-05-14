"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { Day } from "../data/trip";

// Leaflet must load client-side only
const DayMap = dynamic(() => import("./DayMap"), {
  ssr: false,
  loading: () => (
    <div className="map-wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-faded)" }}>
      Cargando mapa…
    </div>
  ),
});

export default function DayCard({ day }: { day: Day }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="day-card" data-open={open}>
      <div
        className="day-header"
        onClick={() => setOpen((v) => !v)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
        aria-expanded={open}
      >
        <div className="day-number">
          <span className="day-number-label">Día</span>
          <span className="day-number-value">{day.number}</span>
        </div>
        <div className="day-info">
          <h3 className="day-title">{day.title}</h3>
          <p className="day-narrative">{day.narrative}</p>
        </div>
        <span className="day-toggle">+</span>
      </div>

      <div className="day-body">
        {day.sleep && (
          <div className="day-sleep">☾ Noche en {day.sleep}</div>
        )}

        <div className="locations-list">
          {day.locations.map((loc, idx) => (
            <div className="location-item" key={`${loc.name}-${idx}`}>
              <div className="location-dot">{idx + 1}</div>
              <div className="location-content">
                <div className="location-header">
                  <span className="location-name">{loc.name}</span>
                  {loc.time && <span className="location-time">{loc.time}</span>}
                  {loc.duration && <span className="location-duration">{loc.duration}</span>}
                </div>
                {loc.notes && <p className="location-notes">{loc.notes}</p>}
              </div>
            </div>
          ))}
        </div>

        {open && <DayMap locations={day.locations} />}
      </div>
    </article>
  );
}
