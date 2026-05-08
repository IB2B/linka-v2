import { Badge } from "@/components/ui/badge";

const STYLE: Record<string, string> = {
  posted:    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  scheduled: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  draft:     "border-muted-foreground/30 bg-muted text-muted-foreground",
  failed:    "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-400",
};

const LABEL: Record<string, string> = {
  posted: "Posted", scheduled: "Scheduled", draft: "Draft", failed: "Failed",
};

export function ContentStatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="outline" className={STYLE[status] ?? STYLE.draft}>
      {LABEL[status] ?? status}
    </Badge>
  );
}
