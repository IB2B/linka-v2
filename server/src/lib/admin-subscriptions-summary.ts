import { db } from "./db";
import { PLAN_PRICE } from "./admin-subscriptions";

export type SubsByTier = { tier: string; count: number; mrr: number };

export type SubsSummary = {
  mrr: number;
  arr: number;
  paying: number;
  free: number;
  trialing: number;
  canceledLast30d: number;
  byTier: SubsByTier[];
};

const PAYING = ["active", "trialing"];

export async function getSubscriptionsSummary(): Promise<SubsSummary> {
  const [tierRows] = await db.query<any[]>(
    `SELECT plan_tier, status, COUNT(*) AS c FROM subscriptions GROUP BY plan_tier, status`,
  );
  const [[canceled]] = await db.query<any[]>(
    `SELECT COUNT(*) AS c FROM subscriptions
     WHERE canceled_at IS NOT NULL AND canceled_at >= NOW() - INTERVAL 30 DAY`,
  );

  const tiers = new Map<string, { count: number; mrr: number }>();
  let mrr = 0, paying = 0, free = 0, trialing = 0;
  for (const r of tierRows) {
    const tier = (r.plan_tier ?? "free") as string;
    const status = (r.status ?? "active") as string;
    const count = Number(r.c ?? 0);
    const price = PLAN_PRICE[tier] ?? 0;
    const isPaying = PAYING.includes(status);
    const tMrr = isPaying ? price * count : 0;
    const cur = tiers.get(tier) ?? { count: 0, mrr: 0 };
    tiers.set(tier, { count: cur.count + count, mrr: cur.mrr + tMrr });
    mrr += tMrr;
    if (status === "trialing") trialing += count;
    if (isPaying && tier !== "free") paying += count;
    if (tier === "free" || price === 0) free += count;
  }

  const byTier: SubsByTier[] = Array.from(tiers.entries())
    .map(([tier, v]) => ({ tier, count: v.count, mrr: v.mrr }))
    .sort((a, b) => b.mrr - a.mrr);

  return { mrr, arr: mrr * 12, paying, free, trialing,
    canceledLast30d: Number(canceled?.c ?? 0), byTier };
}
