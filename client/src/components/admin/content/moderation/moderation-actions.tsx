"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { EyeOff, ShieldOff, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { resolveFlagAction } from "@/app/admin/content/moderation-actions";

type Action = "dismiss" | "hide" | "suspend";

const LABEL: Record<Action, string> = {
  dismiss: "Dismissed flag",
  hide: "Hid post",
  suspend: "Suspended user",
};

export function ModerationActions({ flagId, resolved }: { flagId: string; resolved: boolean }) {
  const [pending, start] = useTransition();
  const [busy, setBusy] = useState<Action | null>(null);

  if (resolved) return null;

  function run(action: Action) {
    setBusy(action);
    start(async () => {
      const res = await resolveFlagAction(flagId, action);
      setBusy(null);
      if ("error" in res) toast.error(res.error);
      else toast.success(LABEL[action]);
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm" variant="outline" onClick={() => run("dismiss")} disabled={pending}>
        <X className="size-3.5" />
        {busy === "dismiss" ? "Dismissing…" : "Dismiss"}
      </Button>
      <Button size="sm" variant="outline" onClick={() => run("hide")} disabled={pending}>
        <EyeOff className="size-3.5" />
        {busy === "hide" ? "Hiding…" : "Hide post"}
      </Button>
      <Button size="sm" variant="destructive" onClick={() => run("suspend")} disabled={pending}>
        <ShieldOff className="size-3.5" />
        {busy === "suspend" ? "Suspending…" : "Suspend user"}
      </Button>
    </div>
  );
}
