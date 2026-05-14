import { Receipt, FileText, Download, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatMoney, formatDate } from "@/lib/billing/format";
import type { BillingOverview } from "@/types/billing-overview";

type Props = { invoices: BillingOverview["invoices"] };

export function BillingInvoices({ invoices }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Receipt className="w-4 h-4 text-muted-foreground" /> Invoices
        </CardTitle>
        <CardDescription>Your billing history. Click an invoice to view or download as PDF.</CardDescription>
      </CardHeader>
      <CardContent>
        {invoices.length === 0 ? (
          <div className="text-center py-10 border border-dashed rounded-lg">
            <div className="w-10 h-10 mx-auto rounded-full bg-muted flex items-center justify-center mb-3">
              <FileText className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium mb-1">No invoices yet</p>
            <p className="text-xs text-muted-foreground">Invoices will appear here after your first payment.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  {["Invoice", "Date", "Amount", "Status", ""].map((h) => (
                    <th key={h} className="text-left font-medium text-xs text-muted-foreground uppercase tracking-wider px-4 py-2.5 last:text-right">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, i) => (
                  <tr key={inv.id} className={cn("transition-colors hover:bg-muted/30", i !== invoices.length - 1 && "border-b")}>
                    <td className="px-4 py-3 font-medium">{inv.number || inv.id.slice(-8).toUpperCase()}</td>
                    <td className="px-4 py-3 text-muted-foreground">{formatDate(inv.created)}</td>
                    <td className="px-4 py-3 font-medium tabular-nums">{formatMoney(inv.amountPaid || inv.amountDue, inv.currency)}</td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className={cn("capitalize",
                        inv.status === "paid" && "bg-green-500/15 text-green-600 border-green-500/30",
                        inv.status === "open" && "bg-yellow-500/15 text-yellow-600 border-yellow-500/30",
                        inv.status === "uncollectible" && "bg-destructive/15 text-destructive border-destructive/30",
                      )}>
                        {inv.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {inv.hostedInvoiceUrl && (
                          <Button variant="ghost" size="sm" className="h-7 px-2 gap-1 text-xs text-primary hover:bg-primary/10" render={<a href={inv.hostedInvoiceUrl} target="_blank" rel="noopener noreferrer" />}>
                            View <ArrowUpRight className="w-3 h-3" />
                          </Button>
                        )}
                        {inv.invoicePdf && (
                          <Button variant="ghost" size="sm" className="h-7 px-2 gap-1 text-xs text-primary hover:bg-primary/10" render={<a href={inv.invoicePdf} target="_blank" rel="noopener noreferrer" />}>
                            <Download className="w-3 h-3" /> PDF
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
