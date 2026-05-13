import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { IntentBadge } from "./intent-badge";
import type { AssistResult } from "@/lib/inbox/assist.types";

type Props = {
  onSuggest: () => void;
  pending: boolean;
  disabled: boolean;
  assist: AssistResult | null;
};

export function AiSuggestBar({ onSuggest, pending, disabled, assist }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Button type="button" size="sm" variant="outline" onClick={onSuggest} disabled={pending || disabled}>
        {pending ? <Spinner aria-hidden /> : <Sparkles className="size-3.5" />}
        AI suggest
      </Button>
      {assist && <IntentBadge intent={assist.intent} confidence={assist.confidence} />}
    </div>
  );
}
