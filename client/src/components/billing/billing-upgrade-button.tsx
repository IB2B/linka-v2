"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpgradePlansDialog } from "@/components/billing/upgrade-plans-dialog";
import { upgradesFrom } from "@/lib/billing/upgrade-options";
import type { UserTier } from "@/lib/auth/me";

export function BillingUpgradeButton({ tier }: { tier: string }) {
  const [open, setOpen] = useState(false);
  const normalized = (tier ?? "free").toLowerCase() as UserTier;
  if (upgradesFrom(normalized).length === 0) return null;
  return (
    <>
      <Button onClick={() => setOpen(true)} className="gap-2">
        <Sparkles className="w-4 h-4" />
        Upgrade plan
      </Button>
      <UpgradePlansDialog open={open} onOpenChange={setOpen} currentTier={normalized} />
    </>
  );
}
