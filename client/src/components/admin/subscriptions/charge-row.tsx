import { Download, ExternalLink } from "lucide-react";

import { PaymentStatusBadge } from "@/components/admin/subscriptions/payment-status-badge";
import { formatAmount, formatDateTime } from "@/lib/admin/format-amount";
import type { AdminCharge } from "@/types/admin-payment";

export function ChargeRow({ charge }: { charge: AdminCharge }) {
  const dt = formatDateTime(charge.created);
  const status = charge.refunded ? "refunded" : charge.status;
  const shortId = `${charge.id.slice(0, 5)}**${charge.id.slice(-4)}`;
  return (
    <tr className="border-t transition hover:bg-muted/40">
      <td className="px-4 py-3 text-xs font-mono tracking-tight text-muted-foreground">{shortId}</td>
      <td className="px-4 py-3 text-sm tabular-nums tracking-tight">
        <div className="font-medium">{dt.date}</div>
        <div className="text-xs text-muted-foreground">{dt.time}</div>
      </td>
      <td className="px-4 py-3 max-w-md text-sm tracking-tight text-muted-foreground">
        <span className="line-clamp-2">
          {charge.description ?? charge.customerEmail ?? "—"}
        </span>
      </td>
      <td className="px-4 py-3 text-sm tracking-tight">
        {charge.cardBrand ? (
          <>
            <div className="font-medium capitalize">{charge.cardBrand}</div>
            <div className="text-xs text-muted-foreground">ending {charge.cardLast4}</div>
          </>
        ) : "—"}
      </td>
      <td className="px-4 py-3 text-sm font-medium tabular-nums tracking-tight">
        {formatAmount(charge.amount, charge.currency)}
      </td>
      <td className="px-4 py-3"><PaymentStatusBadge status={status} /></td>
      <td className="px-4 py-3 text-right">
        {charge.receiptUrl ? (
          <div className="inline-flex items-center gap-3">
            <a
              href={charge.receiptUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium tracking-tight text-foreground hover:underline"
            >
              <ExternalLink className="size-3" />
              View
            </a>
            <a
              href={charge.receiptUrl}
              target="_blank"
              rel="noreferrer"
              download
              className="inline-flex items-center gap-1 text-xs font-medium tracking-tight text-muted-foreground hover:text-foreground hover:underline"
            >
              <Download className="size-3" />
              Download
            </a>
          </div>
        ) : null}
      </td>
    </tr>
  );
}
