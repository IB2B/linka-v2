import { postsLimitFor } from "./plan-features";
import { userMrr } from "./admin-user-mrr";
import type { PlanPrices } from "./stripe-plan-prices";

function pickLastActive(a: Date | null, b: Date | null): string | null {
  const at = a ? a.getTime() : 0;
  const bt = b ? b.getTime() : 0;
  if (!at && !bt) return null;
  return new Date(Math.max(at, bt)).toISOString();
}

export function mapAdminUserRow(r: any, prices: PlanPrices) {
  const tier = r.plan_tier ?? "free";
  const { mrr, currency } = userMrr(tier, r.sub_status ?? null, prices);
  return {
    id: r.id, email: r.email,
    firstName: r.first_name, lastName: r.last_name,
    role: r.role, status: r.status,
    createdAt: r.created_at, planTier: tier,
    avatarUrl: r.avatar_url ?? null,
    industry: r.industry ?? null,
    postsThisMonth: Number(r.posts_month ?? 0),
    postsLimit: postsLimitFor(tier),
    mrr, mrrCurrency: currency,
    lastActiveAt: pickLastActive(r.last_gen, r.last_post),
  };
}
