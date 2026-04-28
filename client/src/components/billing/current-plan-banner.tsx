"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CreditCard, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { BILLING_PLANS } from "@/lib/billing/plans";
import type { PlanTier } from "@/types/billing-plan";

type Subscription = {
  plan_tier: PlanTier;
  current_period_end: string;
  cancel_at_period_end: boolean;
};

export function CurrentPlanBanner({ sub }: { sub: Subscription }) {
  const [pending, setPending] = useState(false);
  const plan = BILLING_PLANS.find((p) => p.id === sub.plan_tier);
  const renewDate = new Date(sub.current_period_end).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  async function openPortal() {
    setPending(true);
    const res = await fetch("/api/billing/portal", { method: "POST" });
    const { url, error } = await res.json();
    if (error) { toast.error(error); setPending(false); return; }
    window.location.href = url;
  }

  return (
    <div className="mb-8 flex items-center justify-between gap-4 rounded-xl border bg-card p-5">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
          <CreditCard className="size-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-semibold">{plan?.name} plan</p>
          <p className="text-xs text-muted-foreground">
            {sub.cancel_at_period_end
              ? `Cancels on ${renewDate}`
              : `Renews on ${renewDate}`}
          </p>
        </div>
        {sub.cancel_at_period_end && (
          <span className="flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
            <AlertTriangle className="size-3" /> Canceling
          </span>
        )}
      </div>
      <Button size="sm" variant="outline" onClick={openPortal} disabled={pending} className="gap-1.5">
        {pending && <Spinner size="xs" />}
        Manage billing
      </Button>
    </div>
  );
}
