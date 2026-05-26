const PAID_TIERS = new Set<string>([
  "starter", "pro", "scale", "professional", "enterprise",
]);

const BUSINESS_AND_UP = new Set<string>(["scale", "professional", "enterprise"]);

export function isPaidTier(tier: string | null | undefined): boolean {
  return PAID_TIERS.has((tier ?? "").toLowerCase());
}

export function hasBusinessFeature(tier: string | null | undefined): boolean {
  return BUSINESS_AND_UP.has((tier ?? "").toLowerCase());
}

export const POSTS_LIMIT_PER_TIER: Record<string, number> = {
  free: 5,
  starter: 5,
  pro: 30,
  professional: 150,
  scale: 150,
  enterprise: 10000,
};

export function postsLimitFor(tier: string | null | undefined): number {
  const key = (tier ?? "free").toLowerCase();
  return POSTS_LIMIT_PER_TIER[key] ?? POSTS_LIMIT_PER_TIER.free;
}
