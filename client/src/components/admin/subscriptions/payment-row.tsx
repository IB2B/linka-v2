import { Download, ExternalLink } from "lucide-react";
import { PaymentStatusBadge } from "@/components/admin/subscriptions/payment-status-badge";
import { CopyId } from "@/components/admin/subscriptions/copy-id";
import { formatAmount, formatDateTime } from "@/lib/admin/format-amount";
import type { AdminPayment } from "@/types/admin-payment";

export function PaymentTableRow({ row }: { row: AdminPayment }) {
  const dt = formatDateTime(row.created);
  const display = row.number ?? `${row.id.slice(0, 5)}**${row.id.slice(-4)}`;
  const viewUrl = row.hostedInvoiceUrl ?? row.receiptUrl;
  const downloadUrl = row.invoicePdf ?? row.receiptUrl;

  return (
    <tr className="border-t transition-colors hover:bg-muted/40 hover:border-l-2 hover:border-l-primary">
      <td className="px-4 py-3 font-mono text-xs tracking-tight text-muted-foreground">
        <CopyId value={row.id} display={display} />
      </td>
      <td className="px-4 py-3 text-sm tabular-nums tracking-tight">
        <div className="font-medium">{dt.date}</div>
        <div className="text-xs text-muted-foreground">{dt.time}</div>
      </td>
      <td className="px-4 py-3 text-sm tracking-tight text-muted-foreground">
        {row.customerEmail ?? "—"}
      </td>
      <td className="max-w-xs px-4 py-3 text-sm tracking-tight text-muted-foreground">
        <div className="line-clamp-1">{row.description ?? "—"}</div>
        {row.cardBrand && (
          <div className="text-xs capitalize">{row.cardBrand} ···· {row.cardLast4}</div>
        )}
      </td>
      <td className="px-4 py-3 text-right text-sm font-semibold tabular-nums tracking-tight">
        {formatAmount(row.amount, row.currency)}
      </td>
      <td className="px-4 py-3"><PaymentStatusBadge status={row.status ?? "unknown"} /></td>
      <td className="px-4 py-3 text-right">
        <div className="inline-flex items-center gap-3">
          {viewUrl && (
            <a href={viewUrl} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium tracking-tight text-foreground hover:underline">
              <ExternalLink className="size-3" /> View
            </a>
          )}
          {downloadUrl && (
            <a href={downloadUrl} target="_blank" rel="noreferrer" download
              className="inline-flex items-center gap-1 text-xs font-medium tracking-tight text-muted-foreground hover:text-foreground hover:underline">
              <Download className="size-3" /> Download
            </a>
          )}
        </div>
      </td>
    </tr>
  );
}
