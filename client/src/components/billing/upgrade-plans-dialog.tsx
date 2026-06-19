"use client";

import { useEffect, useState } from "react";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { PlanCard } from "@/components/billing/plan-card";
import { upgradesFrom } from "@/lib/billing/upgrade-options";
import { plansService } from "@/lib/api/services";
import type { UserTier } from "@/lib/auth/me";
import type { PlanPrices } from "@/types/plan-prices";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  currentTier: UserTier;
};

export function UpgradePlansDialog({ open, onOpenChange, currentTier }: Props) {
  const plans = upgradesFrom(currentTier);
  const [prices, setPrices] = useState<PlanPrices>({});
  useEffect(() => {
    if (open) plansService.prices().then(setPrices).catch(() => {});
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl lg:max-w-5xl">
        <DialogHeader>
          <DialogTitle>Upgrade your plan</DialogTitle>
          <DialogDescription>
            Pick a plan that fits — you'll be redirected to checkout to confirm.
          </DialogDescription>
        </DialogHeader>
        {plans.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            You're already on the top plan.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} currentTier={undefined} prices={prices} />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
