import type { TimeSlot } from "./schedule-times";

export type TimeFormat = "12h" | "24h";

export function formatSlot(slot: TimeSlot, format: TimeFormat): string {
  const m = String(slot.minute).padStart(2, "0");
  if (format === "24h") {
    return `${String(slot.hour).padStart(2, "0")}:${m}`;
  }
  const period = slot.hour >= 12 ? "pm" : "am";
  const h12 = slot.hour % 12 === 0 ? 12 : slot.hour % 12;
  return `${h12}:${m}${period}`;
}

export function formatDayHeader(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "numeric",
  }).format(date);
}
