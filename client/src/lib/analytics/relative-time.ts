export function relativeTime(iso: string | null): string {
  if (!iso) return "";
  const diffMin = Math.max(0, (Date.now() - Date.parse(iso)) / 60_000);
  if (diffMin < 1) return "now";
  if (diffMin < 60) return `${Math.floor(diffMin)}m`;
  const h = diffMin / 60;
  if (h < 24) return `${Math.floor(h)}h`;
  return `${Math.floor(h / 24)}d`;
}
