// The generate flow for one calendar day (YYYY-MM-DD); the new post then opens
// with its schedule dialog on that day.
export function generateHref(dayKey: string): string {
  return `/dashboard/generate?date=${dayKey}`;
}
