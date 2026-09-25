import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostSettingsPanel } from "./post-settings";
import { UsageLimitsCard } from "./usage-limits-card";
import type { PostSettings } from "@/types/content";
import type { UsageSummary } from "@/types/usage";

type Props = {
  settings: PostSettings;
  pending: boolean;
  usage: UsageSummary | null;
  onChange: (s: PostSettings) => void;
  onBack: () => void;
  onNext: () => void;
};

export function GenerateStepTwo({ settings, pending, usage, onChange, onBack, onNext }: Props) {
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <PostSettingsPanel value={settings} onChange={onChange} disabled={pending}
        videoLocked={usage ? !usage.videos.allowed : false} />
      {usage ? <UsageLimitsCard usage={usage} platformCount={settings.platforms.length} /> : null}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="size-4" /> Back
        </Button>
        <Button onClick={onNext} disabled={pending}>
          Next: Topic <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
