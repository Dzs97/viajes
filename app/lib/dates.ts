import { tripStartDate } from "../data/trip";

const SPANISH_WEEKDAYS = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
const SPANISH_MONTHS = [
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic",
];

export function dateForDay(globalDayNumber: number): Date {
  const d = new Date(tripStartDate);
  d.setDate(d.getDate() + (globalDayNumber - 1));
  return d;
}

export function formatTripDate(date: Date): string {
  const wd = SPANISH_WEEKDAYS[date.getDay()];
  const day = date.getDate();
  const month = SPANISH_MONTHS[date.getMonth()];
  return `${wd} ${day} ${month}`;
}

export function formatTripDateLong(date: Date): string {
  return `${formatTripDate(date)} ${date.getFullYear()}`;
}

export function daysUntilTrip(now: Date = new Date()): number {
  const start = new Date(tripStartDate);
  start.setHours(0, 0, 0, 0);
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const diff = start.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
