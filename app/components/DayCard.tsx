"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { Day } from "../data/trip";
import { dateForDay, formatTripDate } from "../lib/dates";
import { estimateDriveTime } from "../lib/geo";

const DayMap = dynamic(() => import("./DayMap"), {
  ssr: false,
  loading: () => (
    <div className="map-wrapper">
      <div className="map-loading">Cargando mapa…</div>
    </div>
  ),
});

export default function DayCard({ day }: { day: Day }) {
  const [open, setOpen] = useState(false);
  const dayDate = dateForDay(day.number);
  const dateLabel = formatTripDate(dayDate);

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
          <span className="day-date">{dateLabel}</span>
        </div>
        <div className="day-info">
          <h3 className="day-title">{day.title}</h3>
          <p className="day-narrative">{day.narrative}</p>
        </div>
        <span className="day-toggle">+</span>
      </div>

      <div className="day-body">
        {day.sleep && <div className="day-sleep">☾ Noche en {day.sleep}</div>}

        <div className="locations-list">
          {day.locations.map((loc, idx) => {
            const prev = idx > 0 ? day.locations[idx - 1] : null;
            const leg = prev ? estimateDriveTime(prev, loc) : null;
            return (
              <div key={`${loc.name}-${idx}`}>
                {leg && (
                  <div className="leg-pill" aria-label={`Aproximado entre paradas: ${leg.label}`}>
                    <span className="leg-arrow">↓</span>
                    <span className="leg-label">~{leg.label}</span>
                    <span className="leg-distance">{leg.km} km</span>
                  </div>
                )}
                <div className="location-item">
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
              </div>
            );
          })}
        </div>

        {open && <DayMap locations={day.locations} />}
      </div>
    </article>
  );
}
