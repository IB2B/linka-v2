import { Badge } from "@/components/ui/badge";
import type { UserStatus } from "@/types/admin";

export function StatusBadge({ status }: { status: UserStatus }) {
  if (status === "SUSPENDED") {
    return <Badge variant="destructive">Suspended</Badge>;
  }
  return (
    <Badge variant="outline" className="gap-1.5">
      <span className="size-1.5 rounded-full bg-emerald-500" />
      Active
    </Badge>
  );
}
