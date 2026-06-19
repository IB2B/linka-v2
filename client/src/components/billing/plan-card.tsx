import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlanFeature } from "@/components/billing/plan-feature";
import { PlanCardButton } from "@/components/billing/plan-card-button";
import { cn } from "@/lib/utils";
import { planPriceDisplay } from "@/lib/billing/plan-price-display";
import type { BillingPlan, PlanTier } from "@/types/billing-plan";
import type { PlanPrices } from "@/types/plan-prices";

type Props = { plan: BillingPlan; currentTier?: PlanTier; prices: PlanPrices };

export function PlanCard({ plan, currentTier, prices }: Props) {
  const isCurrent = currentTier === plan.id;
  const { price, cadence } = planPriceDisplay(plan, prices);

  return (
    <Card
      className={cn(
        "flex flex-col transition",
        plan.highlighted &&
          "relative ring-2 ring-primary shadow-lg shadow-primary/20 sm:-translate-y-1",
      )}
    >
      <CardHeader className="space-y-2">
        <CardTitle className="flex items-center justify-between text-base">
          {plan.name}
          {plan.highlighted && (
            <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground shadow-sm">
              {plan.badge ?? "Popular"}
            </span>
          )}
        </CardTitle>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-semibold">{price}</span>
          <span className="text-sm text-muted-foreground">{cadence}</span>
        </div>
        <p className="text-sm text-muted-foreground">{plan.description}</p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-4">
        <ul className="space-y-2">
          {plan.features.map((f) => <PlanFeature key={f}>{f}</PlanFeature>)}
        </ul>
        <PlanCardButton plan={plan} isCurrent={isCurrent} />
      </CardContent>
    </Card>
  );
}
