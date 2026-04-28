import { CreditCard, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { BillingOverview } from "@/types/billing-overview";

type Props = { paymentMethods: BillingOverview["paymentMethods"]; onPortal: () => void; portalPending: boolean };

export function BillingPaymentMethods({ paymentMethods, onPortal, portalPending }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              Payment methods
            </CardTitle>
            <CardDescription>Cards used to pay for your subscription.</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={onPortal} disabled={portalPending} className="gap-1.5 shrink-0 border-primary/30 text-primary hover:bg-primary/10 hover:text-primary">
            <Plus className="w-3.5 h-3.5" /> Add card
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {paymentMethods.length === 0 ? (
          <div className="text-center py-10 border border-dashed rounded-lg">
            <div className="w-10 h-10 mx-auto rounded-full bg-muted flex items-center justify-center mb-3">
              <CreditCard className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium mb-1">No cards on file</p>
            <p className="text-xs text-muted-foreground mb-4">Add a payment method to upgrade your plan.</p>
            <Button size="sm" onClick={onPortal} disabled={portalPending}>Add payment method</Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {paymentMethods.map((pm) => (
              <div key={pm.id} className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-muted/40 transition-colors">
                <div className="w-12 h-8 rounded-md bg-gradient-to-br from-primary/20 to-primary/5 border flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider">{pm.brand.slice(0, 4)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium capitalize">{pm.brand} ·· {pm.last4}</p>
                    {pm.isDefault && <Badge variant="secondary" className="h-5 text-[10px] bg-primary/10 text-primary border-primary/30">Default</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Expires {String(pm.expMonth).padStart(2, "0")}/{String(pm.expYear).slice(-2)} · <span className="capitalize">{pm.funding}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
