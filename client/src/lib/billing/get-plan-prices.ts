import { cache } from "react";
import type { PlanPrices } from "@/types/plan-prices";

const API_BASE = process.env.API_URL ?? "http://localhost:4000";

// Live plan prices from Stripe (via the server). Wrapped in React cache() so a
// single render that shows pricing in several places only fetches once; the
// server also caches, and we revalidate every 5 minutes.
export const getPlanPrices = cache(async (): Promise<PlanPrices> => {
  try {
    const res = await fetch(`${API_BASE}/api/plans/prices`, { next: { revalidate: 300 } });
    if (!res.ok) return {};
    return (await res.json()) as PlanPrices;
  } catch {
    return {};
  }
});
