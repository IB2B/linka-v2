import { PlanCard } from "@/components/billing/plan-card";
import { BILLING_PLANS } from "@/lib/billing/plans";
import type { PlanTier } from "@/types/billing-plan";

export function PlanGrid({ currentTier }: { currentTier?: PlanTier }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {BILLING_PLANS.map((plan) => (
        <PlanCard key={plan.id} plan={plan} currentTier={currentTier} />
      ))}
    </div>
  );
}
