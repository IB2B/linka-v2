import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/billing/format";

type Props = {
  status: string;
  cancelAtPeriodEnd: boolean;
  currentPeriodEnd: number | null;
  onPortal: () => void;
  portalPending: boolean;
};

export function BillingStatusBanners({ status, cancelAtPeriodEnd, currentPeriodEnd, onPortal, portalPending }: Props) {
  return (
    <>
      {status === "PAST_DUE" && (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-destructive">Payment past due</p>
              <p className="text-xs text-muted-foreground mt-0.5">Update your payment method to avoid service interruption.</p>
            </div>
            <Button size="sm" onClick={onPortal} disabled={portalPending} className="bg-destructive hover:bg-destructive/90 text-white">
              Update payment
            </Button>
          </CardContent>
        </Card>
      )}
      {cancelAtPeriodEnd && (
        <Card className="border-yellow-500/30 bg-yellow-500/5">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400">Subscription ending</p>
              <p className="text-xs text-muted-foreground mt-0.5">Your plan will end on {formatDate(currentPeriodEnd)}. Reactivate anytime before then.</p>
            </div>
            <Button size="sm" variant="outline" onClick={onPortal} disabled={portalPending} className="border-yellow-500/40 text-yellow-600 hover:bg-yellow-500/10">
              Reactivate
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
