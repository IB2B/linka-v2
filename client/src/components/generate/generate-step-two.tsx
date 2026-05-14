import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostSettingsPanel } from "./post-settings";
import type { PostSettings } from "@/types/content";

type Props = {
  settings: PostSettings;
  pending: boolean;
  onChange: (s: PostSettings) => void;
  onBack: () => void;
  onNext: () => void;
};

export function GenerateStepTwo({ settings, pending, onChange, onBack, onNext }: Props) {
  return (
    <div className="mx-auto max-w-sm space-y-6">
      <PostSettingsPanel value={settings} onChange={onChange} disabled={pending} />
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
