import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TIER_PRICE, formatMoney, formatDate } from "@/lib/billing/format";

type Props = {
  tier: string;
  upcoming: { amountDue: number; currency: string; nextPaymentAttempt: number | null } | null;
  currentPeriodEnd: number | null;
  hasPaid: boolean;
  cancelAtPeriodEnd: boolean;
};

export function BillingNextCharge({ tier, upcoming, currentPeriodEnd, hasPaid, cancelAtPeriodEnd }: Props) {
  const renewalMs = upcoming?.nextPaymentAttempt ?? currentPeriodEnd ?? null;
  const fallbackPrice = TIER_PRICE[tier] ?? 0;
  const willCharge = hasPaid && !cancelAtPeriodEnd;
  const priceLabel = upcoming
    ? formatMoney(upcoming.amountDue, upcoming.currency)
    : willCharge ? formatMoney(fallbackPrice * 100, "eur") : "—";
  const label = cancelAtPeriodEnd ? "Subscription ends" : "Next charge";
  const description = !hasPaid
    ? "You're on the free plan. Upgrade to unlock more posts and premium features."
    : cancelAtPeriodEnd
    ? "Your subscription ends on this date. No further charges."
    : "Your card will be charged automatically on the renewal date.";

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardDescription className="text-xs font-medium uppercase tracking-wider">{label}</CardDescription>
        <CardTitle className="text-3xl font-semibold tracking-tight tabular-nums mt-1">
          {priceLabel}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          {renewalMs ? `On ${formatDate(renewalMs)}` : "No upcoming charge"}
        </p>
      </CardHeader>
      <CardContent>
        <p className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
          <Calendar className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>{description}</span>
        </p>
      </CardContent>
    </Card>
  );
}
