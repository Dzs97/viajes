"use client";

import { useEffect, useState } from "react";
import { daysUntilTrip, formatTripDateLong } from "../lib/dates";
import { tripStartDate } from "../data/trip";

export default function Countdown() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    setDays(daysUntilTrip());
    const interval = setInterval(() => setDays(daysUntilTrip()), 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  if (days === null) return null;

  const startLabel = formatTripDateLong(tripStartDate);

  let message: string;
  if (days > 1) {
    message = `Faltan ${days} días`;
  } else if (days === 1) {
    message = "Mañana sale el viaje";
  } else if (days === 0) {
    message = "¡Hoy empieza el viaje!";
  } else if (days > -21) {
    message = `Día ${Math.abs(days) + 1} del viaje`;
  } else {
    message = "Viaje terminado";
  }

  return (
    <div className="countdown">
      <span className="countdown-message">{message}</span>
      <span className="countdown-date">· {startLabel}</span>
    </div>
  );
}
