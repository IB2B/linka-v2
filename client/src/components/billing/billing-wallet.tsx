import { Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatMoney } from "@/lib/billing/format";

type Props = { balance: number; currency: string };

export function BillingWallet({ balance, currency }: Props) {
  const credit = balance < 0 ? Math.abs(balance) : 0;
  const owed = balance > 0 ? balance : 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardDescription className="text-xs font-medium uppercase tracking-wider flex items-center gap-1.5">
          <Wallet className="w-3.5 h-3.5" />
          Wallet balance
        </CardDescription>
        <CardTitle className={cn(
          "text-3xl font-semibold tracking-tight tabular-nums mt-1",
          credit > 0 && "text-green-600",
          owed > 0 && "text-destructive"
        )}>
          {credit > 0
            ? `+${formatMoney(credit, currency)}`
            : owed > 0
              ? `-${formatMoney(owed, currency)}`
              : formatMoney(0, currency)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {credit > 0
            ? "Credit will be applied automatically to your next invoice."
            : owed > 0
              ? "Outstanding balance from a past invoice."
              : "No credits or outstanding balance. All settled."}
        </p>
      </CardContent>
    </Card>
  );
}
