"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { updateSettingsAction } from "@/app/admin/settings/actions";

export function MaintenanceToggle({ initial }: { initial: boolean }) {
  const [enabled, setEnabled] = useState(initial);
  const [pending, start] = useTransition();

  function toggle() {
    const next = !enabled;
    if (next && !confirm("Put the platform into maintenance mode? Users will see a banner and may be locked out.")) return;
    start(async () => {
      const r = await updateSettingsAction({ maintenanceMode: next });
      if (r.error) { toast.error(r.error); return; }
      setEnabled(next);
      toast.success(next ? "Maintenance mode enabled." : "Maintenance mode disabled.");
    });
  }

  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium tracking-tight">Maintenance mode</span>
        <span className="text-xs tracking-tight text-muted-foreground">
          Show a maintenance banner and pause publishing while you work on the platform.
        </span>
      </div>
      <Button
        type="button"
        size="sm"
        variant={enabled ? "default" : "outline"}
        onClick={toggle}
        disabled={pending}
      >
        {pending && <Spinner aria-hidden />}
        {enabled ? "Turn off" : "Enable"}
      </Button>
    </div>
  );
}
