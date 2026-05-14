import { stripe } from "./stripe";
import type Stripe from "stripe";

export type SubsByTier = { tier: string; count: number; mrr: number; currency: string };

export type SubsSummary = {
  mrr: number; arr: number; paying: number; free: number;
  trialing: number; canceledLast30d: number; byTier: SubsByTier[];
  currency: string;
};

const PAGE_CAP = 500;

function mrrFromSub(sub: Stripe.Subscription): number {
  const item = sub.items.data[0];
  if (!item) return 0;
  const amount = item.price.unit_amount ?? 0;
  return item.price.recurring?.interval === "year" ? Math.round(amount / 12) : amount;
}

function tierLabel(sub: Stripe.Subscription): string {
  return (sub.items.data[0]?.price?.nickname ?? "paid").toLowerCase();
}

async function fetchAll(status: Stripe.SubscriptionListParams["status"]) {
  return stripe.subscriptions
    .list({ limit: 100, status, expand: ["data.customer"] })
    .autoPagingToArray({ limit: PAGE_CAP });
}

export async function getSubscriptionsSummary(): Promise<SubsSummary> {
  const [active, trialing, canceled] = await Promise.all([
    fetchAll("active"), fetchAll("trialing"), fetchAll("canceled"),
  ]);

  const allActive = [...active, ...trialing];
  const tiers = new Map<string, { count: number; mrr: number; currency: string }>();
  let mrr = 0;

  for (const sub of allActive) {
    const tier = tierLabel(sub);
    const subMrr = mrrFromSub(sub);
    const currency = sub.items.data[0]?.price?.currency ?? "usd";
    const cur = tiers.get(tier) ?? { count: 0, mrr: 0, currency };
    tiers.set(tier, { count: cur.count + 1, mrr: cur.mrr + subMrr, currency });
    mrr += subMrr;
  }

  const thirtyDaysAgo = Math.floor(Date.now() / 1000) - 30 * 86400;
  const canceledLast30d = canceled.filter(
    (s) => s.canceled_at && s.canceled_at >= thirtyDaysAgo,
  ).length;

  const topCurrency = allActive[0]?.items.data[0]?.price?.currency ?? "usd";
  const byTier = Array.from(tiers.entries())
    .map(([tier, v]) => ({ tier, count: v.count, mrr: v.mrr, currency: v.currency }))
    .sort((a, b) => b.mrr - a.mrr);

  return {
    mrr, arr: mrr * 12,
    paying: active.length,
    free: 0,
    trialing: trialing.length,
    canceledLast30d,
    byTier,
    currency: topCurrency,
  };
}
