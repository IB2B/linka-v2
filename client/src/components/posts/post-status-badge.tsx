import { Badge } from "@/components/ui/badge";
import type { PostStatus } from "@/types/post";

const VARIANT: Record<PostStatus, { label: string; className: string }> = {
  draft: {
    label: "Draft",
    className: "bg-muted text-muted-foreground",
  },
  scheduled: {
    label: "Scheduled",
    className: "bg-amber-500/15 text-amber-700",
  },
  posted: {
    label: "Posted",
    className: "bg-emerald-500/15 text-emerald-700",
  },
  failed: {
    label: "Failed",
    className: "bg-destructive/15 text-destructive",
  },
};

export function PostStatusBadge({ status }: { status: PostStatus }) {
  const v = VARIANT[status];
  return (
    <Badge variant="outline" className={v.className}>
      {v.label}
    </Badge>
  );
}
