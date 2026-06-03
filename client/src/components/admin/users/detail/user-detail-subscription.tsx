import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefundAction } from "./refund-action";
import { tierLabel } from "@/lib/billing/format";
import type { AdminUserDetail } from "@/types/admin";

const fmtDate = (s: string | null) =>
  s ? new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

type Props = {
  subscription: AdminUserDetail["subscription"];
  userId: string;
  email: string;
  eligibility: AdminUserDetail["refundEligibility"];
};

export function UserDetailSubscription({ subscription, userId, email, eligibility }: Props) {
  const rows: { label: string; value: React.ReactNode }[] = subscription
    ? [
        { label: "Plan", value: <span className="font-medium">{tierLabel(subscription.planTier)}</span> },
        {
          label: "Status",
          value: (
            <Badge variant={subscription.status === "active" ? "default" : "secondary"} className="capitalize">
              {subscription.status}
            </Badge>
          ),
        },
        { label: "Renews", value: fmtDate(subscription.currentPeriodEnd) },
        { label: "Canceled", value: fmtDate(subscription.canceledAt) },
      ]
    : [{ label: "Plan", value: <span className="text-muted-foreground">Free</span> }];

  return (
    <Card size="sm" className="gap-0 p-0">
      <div className="border-b px-5 py-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Subscription
        </h3>
      </div>
      <div className="px-5 py-4">
        <dl className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-3 text-sm">
          {rows.map((r) => (
            <div key={r.label} className="contents">
              <dt className="tracking-tight text-muted-foreground">{r.label}</dt>
              <dd className="tracking-tight">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="flex items-center justify-between border-t bg-muted/30 px-5 py-3">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {eligibility.draftCount} drafts generated
        </span>
        <RefundAction userId={userId} email={email} eligibility={eligibility} />
      </div>
    </Card>
  );
}
