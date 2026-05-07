"use client";

import { useState, useTransition } from "react";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { SettingsSection } from "./settings-section";
import { FeatureRow } from "./feature-row";
import { FeatureToggleConfirm } from "./feature-toggle-confirm";
import { setRecyclerEnabledAction } from "@/app/dashboard/settings/feature-actions";

type Props = { recyclerEnabled: boolean };

export function FeaturesSection({ recyclerEnabled }: Props) {
  const [recycler, setRecycler] = useState(recyclerEnabled);
  const [confirmTarget, setConfirmTarget] = useState<boolean | null>(null);
  const [pending, start] = useTransition();
  const router = useRouter();

  function applyRecycler(next: boolean) {
    start(async () => {
      const res = await setRecyclerEnabledAction(next);
      if (res.error) {
        toast.error(res.error);
        return;
      }
      setRecycler(next);
      setConfirmTarget(null);
      toast.success(next ? "Recycler enabled." : "Recycler disabled.");
      router.refresh();
    });
  }

  return (
    <SettingsSection
      title="Features"
      description="Turn modules on or off. Disabled features are hidden from the sidebar."
    >
      <FeatureRow
        icon={RefreshCw}
        title="Recycler"
        description="Resurface your top-performing posts as fresh rewrites you can repost."
        checked={recycler}
        onChange={(next) => setConfirmTarget(next)}
        pending={pending}
      />
      <FeatureToggleConfirm
        open={confirmTarget !== null}
        feature="Recycler"
        willEnable={confirmTarget === true}
        pending={pending}
        onOpenChange={(v) => !v && setConfirmTarget(null)}
        onConfirm={() => applyRecycler(confirmTarget!)}
      />
    </SettingsSection>
  );
}
