import { stripe, PRICE_IDS } from "./stripe";

export type PlanPrice = { amount: number; currency: string; interval: string };
export type PlanPrices = Record<string, PlanPrice>;

// Live prices straight from Stripe, keyed by our tier id. Cached briefly so the
// public pricing page doesn't hit Stripe on every render. This is the single
// source of truth for paid amounts — nothing in the app hardcodes a price.
let cached: { at: number; data: PlanPrices } | null = null;
const TTL_MS = 5 * 60 * 1000;

export async function getPlanPrices(): Promise<PlanPrices> {
  if (cached && Date.now() - cached.at < TTL_MS) return cached.data;
  const entries = await Promise.all(
    Object.entries(PRICE_IDS)
      .filter(([, id]) => !!id)
      .map(async ([tier, id]) => {
        const price = await stripe.prices.retrieve(id);
        return [tier, {
          amount: price.unit_amount ?? 0,
          currency: price.currency,
          interval: price.recurring?.interval ?? "month",
        }] as const;
      }),
  );
  cached = { at: Date.now(), data: Object.fromEntries(entries) };
  return cached.data;
}
