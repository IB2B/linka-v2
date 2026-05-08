import { Badge } from "@/components/ui/badge";

const DOT: Record<string, string> = {
  active: "bg-emerald-500",
  trialing: "bg-sky-500",
  past_due: "bg-amber-500",
  canceled: "bg-rose-500",
  incomplete: "bg-muted-foreground",
  incomplete_expired: "bg-muted-foreground",
  unpaid: "bg-rose-500",
};

const LABEL: Record<string, string> = {
  active: "Active", trialing: "Trialing", past_due: "Past due",
  canceled: "Canceled", incomplete: "Incomplete",
  incomplete_expired: "Expired", unpaid: "Unpaid",
};

export function SubStatusBadge({ status }: { status: string }) {
  const dot = DOT[status] ?? "bg-muted-foreground";
  const label = LABEL[status] ?? status;
  if (status === "canceled" || status === "unpaid") {
    return <Badge variant="destructive">{label}</Badge>;
  }
  return (
    <Badge variant="outline" className="gap-1.5">
      <span className={`size-1.5 rounded-full ${dot}`} />
      {label}
    </Badge>
  );
}
