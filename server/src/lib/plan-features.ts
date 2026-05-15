const PAID_TIERS = new Set<string>([
  "starter", "pro", "scale", "professional", "enterprise",
]);

export function isPaidTier(tier: string | null | undefined): boolean {
  return PAID_TIERS.has((tier ?? "").toLowerCase());
}

export const POSTS_LIMIT_PER_TIER: Record<string, number> = {
  free: 10,
  starter: 100,
  pro: 100,
  professional: 500,
  scale: 500,
  enterprise: 2000,
};

export function postsLimitFor(tier: string | null | undefined): number {
  const key = (tier ?? "free").toLowerCase();
  return POSTS_LIMIT_PER_TIER[key] ?? POSTS_LIMIT_PER_TIER.free;
}
