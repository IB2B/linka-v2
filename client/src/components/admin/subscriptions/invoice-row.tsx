import { Download, ExternalLink } from "lucide-react";

import { PaymentStatusBadge } from "@/components/admin/subscriptions/payment-status-badge";
import { formatAmount, formatDateTime } from "@/lib/admin/format-amount";
import type { AdminInvoice } from "@/types/admin-payment";

export function InvoiceRow({ invoice }: { invoice: AdminInvoice }) {
  const dt = formatDateTime(invoice.created);
  const status = invoice.status ?? "draft";
  const number = invoice.number ?? `${invoice.id.slice(0, 5)}**${invoice.id.slice(-4)}`;
  const link = invoice.hostedInvoiceUrl ?? invoice.invoicePdf;
  return (
    <tr className="border-t transition hover:bg-muted/40">
      <td className="px-4 py-3 text-xs font-mono tracking-tight text-muted-foreground">{number}</td>
      <td className="px-4 py-3 text-sm tabular-nums tracking-tight">
        <div className="font-medium">{dt.date}</div>
        <div className="text-xs text-muted-foreground">{dt.time}</div>
      </td>
      <td className="px-4 py-3 max-w-md text-sm tracking-tight text-muted-foreground">
        <span className="line-clamp-2">
          {invoice.description ?? invoice.customerEmail ?? "—"}
        </span>
      </td>
      <td className="px-4 py-3 text-sm tracking-tight text-muted-foreground">
        {invoice.customerEmail ?? "—"}
      </td>
      <td className="px-4 py-3 text-sm font-medium tabular-nums tracking-tight">
        {formatAmount(invoice.amountDue, invoice.currency)}
      </td>
      <td className="px-4 py-3"><PaymentStatusBadge status={status} /></td>
      <td className="px-4 py-3 text-right">
        <div className="inline-flex items-center gap-3">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium tracking-tight text-foreground hover:underline"
            >
              <ExternalLink className="size-3" />
              View
            </a>
          ) : null}
          {invoice.invoicePdf ? (
            <a
              href={invoice.invoicePdf}
              target="_blank"
              rel="noreferrer"
              download
              className="inline-flex items-center gap-1 text-xs font-medium tracking-tight text-muted-foreground hover:text-foreground hover:underline"
            >
              <Download className="size-3" />
              Download
            </a>
          ) : null}
        </div>
      </td>
    </tr>
  );
}
