const KEY = "linka.timezone";

export function browserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
}

export function loadTimezone(): string {
  if (typeof window === "undefined") return "UTC";
  return localStorage.getItem(KEY) || browserTimezone();
}

export function saveTimezone(tz: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, tz);
  window.dispatchEvent(new CustomEvent("linka:tz-change", { detail: tz }));
}

export const TIMEZONES: { value: string; label: string }[] = [
  { value: "UTC", label: "UTC" },
  { value: "America/New_York", label: "Eastern Time" },
  { value: "America/Chicago", label: "Central Time" },
  { value: "America/Los_Angeles", label: "Pacific Time" },
  { value: "Europe/London", label: "London" },
  { value: "Europe/Paris", label: "Paris" },
  { value: "Africa/Casablanca", label: "Casablanca" },
  { value: "Asia/Dubai", label: "Dubai" },
  { value: "Asia/Tokyo", label: "Tokyo" },
];
