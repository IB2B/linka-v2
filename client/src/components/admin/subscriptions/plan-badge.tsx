import { Badge } from "@/components/ui/badge";

const TIER_CLASS: Record<string, string> = {
  free: "border-muted-foreground/30 text-muted-foreground",
  starter: "border-sky-500/30 text-sky-600 dark:text-sky-400",
  pro: "border-violet-500/30 text-violet-600 dark:text-violet-400",
  scale: "border-amber-500/30 text-amber-600 dark:text-amber-400",
};

export function PlanBadge({ tier }: { tier: string }) {
  const cls = TIER_CLASS[tier] ?? TIER_CLASS.free;
  return (
    <Badge variant="outline" className={`capitalize ${cls}`}>
      {tier}
    </Badge>
  );
}
