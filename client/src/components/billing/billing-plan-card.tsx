import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TIER_PRICE } from "@/lib/billing/format";

type Props = { tier: string; status: string; postsThisMonth: number; postsLimit: number };

export function BillingPlanCard({ tier, status, postsThisMonth, postsLimit }: Props) {
  const monthlyPrice = TIER_PRICE[tier] ?? 0;
  const usagePercent = postsLimit > 0 ? Math.min(100, Math.round((postsThisMonth / postsLimit) * 100)) : 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardDescription className="text-xs font-medium uppercase tracking-wider">Current plan</CardDescription>
        <div className="flex items-baseline justify-between mt-1">
          <CardTitle className="text-2xl font-semibold tracking-tight">{tier}</CardTitle>
          <Badge variant="secondary" className={cn("gap-1",
            status === "ACTIVE" ? "bg-green-500/15 text-green-600 border-green-500/30" :
            status === "PAST_DUE" ? "bg-destructive/15 text-destructive border-destructive/30" :
            "bg-muted text-muted-foreground"
          )}>
            {status === "ACTIVE" && <CheckCircle2 className="w-3 h-3" />}
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-semibold tracking-tight tabular-nums">${monthlyPrice}</span>
          <span className="text-sm text-muted-foreground">/month</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Posts used</span>
            <span className="tabular-nums font-medium">{postsThisMonth} / {postsLimit < 0 ? "∞" : postsLimit}</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div className={cn("h-full rounded-full transition-all",
              usagePercent >= 100 ? "bg-destructive" : usagePercent >= 80 ? "bg-yellow-500" : "bg-primary"
            )} style={{ width: `${usagePercent}%` }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
