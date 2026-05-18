import { emailLayout } from "./layout";

export type RefundInput = {
  firstName: string;
  amountCents: number;
  currency: string;
  subCanceled: boolean;
};

export function refundConfirmationEmail({ firstName, amountCents, currency, subCanceled }: RefundInput) {
  const name = firstName?.trim() || "there";
  const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amountCents / 100);

  const body = `
    <p>Hey ${escape(name)},</p>
    <p>
      We've refunded <strong>${amount}</strong> to the card on file. Expect it to land in
      <strong>5&ndash;10 business days</strong> depending on your bank.
    </p>
    ${subCanceled ? `<p>Your subscription has been canceled — no future charges will be made.</p>` : ""}
    <p style="font-size:13px;color:#737373">
      Want to tell us what didn't work? Reply to this email — we read every word and use it to
      make linka better.
    </p>
  `;
  return {
    subject: `Your linka refund (${amount}) has been processed`,
    html: emailLayout({
      preheader: `${amount} refunded — should arrive in 5–10 business days.`,
      heading: "Refund processed",
      body,
    }),
  };
}

function escape(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
