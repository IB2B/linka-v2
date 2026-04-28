import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatMoney, formatDate } from "@/lib/billing/format";

type Props = {
  upcoming: { amountDue: number; currency: string; nextPaymentAttempt: number | null } | null;
  currentPeriodEnd: number | null;
  hasPaid: boolean;
};

export function BillingNextCharge({ upcoming, currentPeriodEnd, hasPaid }: Props) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardDescription className="text-xs font-medium uppercase tracking-wider">Next charge</CardDescription>
        <CardTitle className="text-3xl font-semibold tracking-tight tabular-nums mt-1">
          {upcoming ? formatMoney(upcoming.amountDue, upcoming.currency) : "—"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>
            {upcoming?.nextPaymentAttempt
              ? formatDate(upcoming.nextPaymentAttempt)
              : currentPeriodEnd
                ? formatDate(currentPeriodEnd)
                : "No upcoming charge"}
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {hasPaid
            ? "Your card will be charged automatically on the renewal date. Cancel anytime from Stripe."
            : "You're on the free plan. Upgrade to unlock more posts and premium features."}
        </p>
      </CardContent>
    </Card>
  );
}
