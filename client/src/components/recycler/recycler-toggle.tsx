"use client";

import { useState, useTransition } from "react";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { FeatureRow } from "@/components/settings/feature-row";
import { FeatureToggleConfirm } from "@/components/settings/feature-toggle-confirm";
import { setRecyclerEnabledAction } from "@/app/dashboard/settings/feature-actions";

type Props = { enabled: boolean };

export function RecyclerToggle({ enabled }: Props) {
  const [on, setOn] = useState(enabled);
  const [confirmTarget, setConfirmTarget] = useState<boolean | null>(null);
  const [pending, start] = useTransition();
  const router = useRouter();

  function apply(next: boolean) {
    start(async () => {
      const res = await setRecyclerEnabledAction(next);
      if (res.error) {
        toast.error(res.error);
        return;
      }
      setOn(next);
      setConfirmTarget(null);
      toast.success(next ? "Recycler enabled." : "Recycler disabled.");
      router.refresh();
    });
  }

  return (
    <>
      <FeatureRow
        icon={RefreshCw}
        title="Recycler"
        description="Resurface your top-performing posts as fresh rewrites you can repost."
        checked={on}
        onChange={(next) => setConfirmTarget(next)}
        pending={pending}
      />
      <FeatureToggleConfirm
        open={confirmTarget !== null}
        feature="Recycler"
        willEnable={confirmTarget === true}
        pending={pending}
        onOpenChange={(v) => !v && setConfirmTarget(null)}
        onConfirm={() => apply(confirmTarget!)}
      />
    </>
  );
}
