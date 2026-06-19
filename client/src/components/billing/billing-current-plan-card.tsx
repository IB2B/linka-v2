import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SegmentedMeter } from "@/components/segmented-meter";
import { STATUS_LABEL, tierLabel, formatMoney } from "@/lib/billing/format";

type Props = {
  tier: string;
  status: string;
  postsThisMonth: number;
  postsLimit: number;
  planAmount: number | null;
  planCurrency: string | null;
  planInterval: string | null;
};

export function BillingCurrentPlanCard(
  { tier, status, postsThisMonth, postsLimit, planAmount, planCurrency, planInterval }: Props,
) {
  const tierKey = tier.toLowerCase();
  const isEnterprise = tierKey === "enterprise";
  // Show what Stripe actually bills. No hardcoded fallback — if the amount is
  // somehow missing we show a dash rather than a number that could be wrong.
  const priceLabel = planAmount != null
    ? formatMoney(planAmount, planCurrency ?? "eur")
    : "—";
  const cadence = planInterval ? `/${planInterval}` : "/month";
  const pct = postsLimit > 0 ? Math.min(100, Math.round((postsThisMonth / postsLimit) * 100)) : 0;
  const statusKey = status.toUpperCase();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardDescription className="text-xs font-medium uppercase tracking-wider">Current plan</CardDescription>
        <div className="flex items-baseline justify-between gap-2 mt-1">
          <CardTitle className="text-2xl font-semibold tracking-tight">{tierLabel(tier)}</CardTitle>
          <Badge variant="secondary" className={cn("gap-1",
            statusKey === "ACTIVE" ? "bg-green-500/15 text-green-600 border-green-500/30" :
            statusKey === "PAST_DUE" ? "bg-destructive/15 text-destructive border-destructive/30" :
            "bg-muted text-muted-foreground"
          )}>
            {statusKey === "ACTIVE" && <CheckCircle2 className="w-3 h-3" />}
            {STATUS_LABEL[statusKey] ?? status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-semibold tracking-tight tabular-nums">
            {isEnterprise ? "Custom" : priceLabel}
          </span>
          <span className="text-sm text-muted-foreground">
            {isEnterprise ? "pricing" : cadence}
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Posts used</span>
            <span className="tabular-nums font-medium">{postsThisMonth} / {postsLimit < 0 || postsLimit >= 10000 ? "∞" : postsLimit}</span>
          </div>
          <SegmentedMeter pct={pct} />
        </div>
      </CardContent>
    </Card>
  );
}
