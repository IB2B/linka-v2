import type { AnalyticsDelta } from "./analytics.types";

export function makeDelta(current: number, previous: number): AnalyticsDelta {
  const diff = current - previous;
  const pct = previous === 0 ? null : Math.round((diff / previous) * 100);
  return { current, previous, diff, pct };
}
