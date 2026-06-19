"use client";

import { useEffect, useState } from "react";
import { PlanCard } from "@/components/billing/plan-card";
import { BILLING_PLANS } from "@/lib/billing/plans";
import { plansService } from "@/lib/api/services";
import type { PlanTier } from "@/types/billing-plan";
import type { PlanPrices } from "@/types/plan-prices";

// Client component: the grid is shown both in server pages (onboarding) and
// inside the client billing dashboard, so it fetches live prices itself.
export function PlanGrid({ currentTier }: { currentTier?: PlanTier }) {
  const [prices, setPrices] = useState<PlanPrices>({});
  useEffect(() => {
    plansService.prices().then(setPrices).catch(() => {});
  }, []);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {BILLING_PLANS.map((plan) => (
        <PlanCard key={plan.id} plan={plan} currentTier={currentTier} prices={prices} />
      ))}
    </div>
  );
}
