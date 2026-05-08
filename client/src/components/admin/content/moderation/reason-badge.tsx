import { Badge } from "@/components/ui/badge";
import { REASON_LABEL, REASON_TONE } from "@/components/admin/content/moderation/reason-meta";

export function ReasonBadge({ reason }: { reason: string }) {
  return (
    <Badge variant="outline" className={REASON_TONE[reason] ?? REASON_TONE.other}>
      {REASON_LABEL[reason] ?? reason}
    </Badge>
  );
}
