export function computeDeltaPct(
  current: number, baseline: number,
): number | null {
  if (baseline === 0) return null;
  return Math.round(((current - baseline) / baseline) * 100);
}
