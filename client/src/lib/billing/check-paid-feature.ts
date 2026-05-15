import { fetchMe } from "@/lib/auth/me";
import { hasFeature, type PaidFeature } from "./plan-features";

export type FeatureAccess = { hasAccess: true } | { hasAccess: false; tier: string };

export async function checkPaidFeature(feature: PaidFeature): Promise<FeatureAccess> {
  const user = await fetchMe();
  if (!user || user.role !== "USER") return { hasAccess: true };
  if (hasFeature(user.tier, feature)) return { hasAccess: true };
  return { hasAccess: false, tier: user.tier };
}
