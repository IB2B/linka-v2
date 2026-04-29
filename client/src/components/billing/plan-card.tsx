"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { PlanFeature } from "@/components/billing/plan-feature";
import { cn } from "@/lib/utils";
import { stripeService } from "@/lib/api/services";
import { getErrorMessage } from "@/lib/api/http";
import type { BillingPlan, PlanTier } from "@/types/billing-plan";

type Props = { plan: BillingPlan; currentTier?: PlanTier };

export function PlanCard({ plan, currentTier }: Props) {
  const [pending, setPending] = useState(false);
  const isCurrent = currentTier === plan.id;

  async function handleChoose() {
    setPending(true);
    try {
      const { url } = await stripeService.checkout({ tier: plan.id });
      window.location.href = url;
    } catch (e) {
      toast.error(getErrorMessage(e));
      setPending(false);
    }
  }

  return (
    <Card className={cn("flex flex-col", plan.highlighted && "border-primary shadow-sm")}>
      <CardHeader className="space-y-2">
        <CardTitle className="flex items-center justify-between text-base">
          {plan.name}
          {plan.highlighted && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Popular</span>
          )}
        </CardTitle>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-semibold">{plan.price}</span>
          <span className="text-sm text-muted-foreground">{plan.cadence}</span>
        </div>
        <p className="text-sm text-muted-foreground">{plan.description}</p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-4">
        <ul className="space-y-2">
          {plan.features.map((f) => <PlanFeature key={f}>{f}</PlanFeature>)}
        </ul>
        <Button
          className="w-full gap-1.5"
          variant={plan.highlighted ? "default" : "outline"}
          disabled={isCurrent || pending}
          onClick={handleChoose}
        >
          {pending && <Spinner size="xs" />}
          {isCurrent ? "Current plan" : "Choose plan"}
        </Button>
      </CardContent>
    </Card>
  );
}
