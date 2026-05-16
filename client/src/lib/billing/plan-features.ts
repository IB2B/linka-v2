import type { UserTier } from "@/lib/auth/me";

export type PaidFeature = "inbox" | "trends" | "analytics";

const PAID_TIERS = new Set<string>([
  "starter", "pro", "scale", "professional", "enterprise",
]);

const PRO_AND_UP = new Set<string>(["scale", "professional", "enterprise"]);

export function isPaidTier(tier: string | null | undefined): boolean {
  return PAID_TIERS.has((tier ?? "").toLowerCase());
}

export function hasFeature(tier: UserTier, _feature: PaidFeature): boolean {
  return PRO_AND_UP.has((tier ?? "").toLowerCase());
}

export const POSTS_LIMIT_PER_TIER: Record<string, number> = {
  free: 10,
  starter: 10,
  pro: 50,
  professional: 500,
  scale: 500,
  enterprise: 2000,
};

export function postsLimitFor(tier: string | null | undefined): number {
  const key = (tier ?? "free").toLowerCase();
  return POSTS_LIMIT_PER_TIER[key] ?? POSTS_LIMIT_PER_TIER.free;
}
