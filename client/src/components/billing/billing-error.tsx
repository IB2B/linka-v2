import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Props = { error: string; onRetry: () => void };

export function BillingError({ error, onRetry }: Props) {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-semibold tracking-tight">Billing</h1>
      <Card className="border-destructive/30 bg-destructive/5">
        <CardContent className="p-5 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-destructive">Could not load billing</p>
            <p className="text-xs text-muted-foreground mt-1">{error}</p>
            <Button variant="outline" size="sm" onClick={onRetry} className="mt-3">
              Try again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
