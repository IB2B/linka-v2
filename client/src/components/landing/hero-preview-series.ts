// Daily impressions in thousands, sampled every ~2.5 days across the 30-day
// window. The mean is ~6.1K/day, so the series adds up to the 184K on the stat
// tile, and it sits ~28% above `PREV` to match the "+28% vs prev" badge.
export const NOW = [3.4, 3.9, 4.2, 4.0, 4.8, 5.3, 5.6, 6.4, 6.9, 7.4, 8.1, 8.8, 9.6];
export const PREV = [3.4, 3.6, 3.8, 3.7, 4.2, 4.4, 4.5, 4.9, 5.1, 5.3, 5.5, 5.8, 6.0];

export const W = 600;
export const H = 200;
/** Top of the plot area, in thousands — the y-axis labels read from the same cap. */
export const MAX = 12;
/** Fractions of the plot height where the gridlines sit (12K, 8K, 4K, 0). */
export const GRID = [0, 1 / 3, 2 / 3, 1];

type Point = readonly [number, number];

export function points(series: readonly number[]): Point[] {
  return series.map((v, i) => [
    (i / (series.length - 1)) * W,
    (1 - v / MAX) * H,
  ]);
}

/**
 * Catmull-Rom spline flattened to cubic béziers: reads as a smooth trend
 * without overshooting any of the sampled values the way a hand-tuned `S`
 * curve does.
 */
export function smoothPath(pts: readonly Point[]): string {
  const r = (n: number) => n.toFixed(1);
  let d = `M ${r(pts[0][0])} ${r(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const [p1, p2] = [pts[i], pts[i + 1]];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${r(c1[0])} ${r(c1[1])}, ${r(c2[0])} ${r(c2[1])}, ${r(p2[0])} ${r(p2[1])}`;
  }
  return d;
}

export const NOW_POINTS = points(NOW);
export const NOW_LINE = smoothPath(NOW_POINTS);
export const PREV_LINE = smoothPath(points(PREV));
export const NOW_AREA = `${NOW_LINE} L ${W} ${H} L 0 ${H} Z`;
/** Where the live marker goes, as a percentage of the plot box. */
export const LAST = {
  left: `${(NOW_POINTS.at(-1)![0] / W) * 100}%`,
  top: `${(NOW_POINTS.at(-1)![1] / H) * 100}%`,
};
