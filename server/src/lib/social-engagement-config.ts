function num(env: string | undefined, fallback: number): number {
  const n = env ? Number(env) : NaN;
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export const POLL_MS = num(process.env.SOCIAL_POLL_MS, 5 * 60_000);
export const LOOKBACK_DAYS = num(process.env.SOCIAL_LOOKBACK_DAYS, 7);
export const MIN_DELTA = num(process.env.SOCIAL_MIN_DELTA, 1);
export const HIGH_VOLUME_THRESHOLD = num(process.env.SOCIAL_HIGH_VOLUME_THRESHOLD, 5);
