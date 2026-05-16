"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpgradePlansDialog } from "@/components/billing/upgrade-plans-dialog";
import type { UserTier } from "@/lib/auth/me";

export function SidebarUpgradeCta({ tier }: { tier: UserTier }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="mx-1 mb-1 flex items-center justify-between gap-2 rounded-lg border bg-card px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <Sparkles className="size-4 shrink-0 text-foreground" />
          <p className="truncate text-sm font-medium">Upgrade to Pro</p>
        </div>
        <Button
          size="sm"
          className="h-7 shrink-0 px-2.5 text-xs"
          onClick={() => setOpen(true)}
        >
          Upgrade
        </Button>
      </div>
      <UpgradePlansDialog open={open} onOpenChange={setOpen} currentTier={tier} />
    </>
  );
}
