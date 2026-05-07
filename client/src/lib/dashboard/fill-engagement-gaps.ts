import type { EngagementDay } from "./engagement.types";

function isoDay(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function fillEngagementGaps(
  series: EngagementDay[], days: number,
): EngagementDay[] {
  const map = new Map(series.map((s) => [s.date, s]));
  const out: EngagementDay[] = [];
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  start.setUTCDate(start.getUTCDate() - (days - 1));
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setUTCDate(start.getUTCDate() + i);
    const key = isoDay(d);
    out.push(
      map.get(key) ?? {
        date: key, likes: 0, comments: 0, views: 0, impressions: 0, posts: 0,
      },
    );
  }
  return out;
}
