// How far through the monthly billing cycle we are, 0–100. The cycle is the
// month that ends at `resetsAt`.
export function cycleElapsedPct(resetsAt: string, now = Date.now()): number {
  const end = new Date(resetsAt);
  const start = new Date(end);
  start.setMonth(start.getMonth() - 1);
  const span = end.getTime() - start.getTime();
  if (span <= 0) return 0;
  return Math.min(100, Math.max(0, ((now - start.getTime()) / span) * 100));
}
