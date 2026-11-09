"use client";

import { useEffect, useState } from "react";
import { countdownMessage, daysUntilTrip, formatTripDateLong } from "../lib/dates";
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
  const message = countdownMessage(days);

  return (
    <div className="countdown">
      <span className="countdown-message">{message}</span>
      <span className="countdown-date">· {startLabel}</span>
    </div>
  );
}
