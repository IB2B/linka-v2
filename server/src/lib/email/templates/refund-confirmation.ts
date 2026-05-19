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
      We&rsquo;ve refunded <strong>${amount}</strong> to the card on file. Expect
      it to land in <strong>5&ndash;10 business days</strong> depending on your
      bank.
    </p>
    ${subCanceled ? `<p>Your subscription has been canceled &mdash; no future charges will be made.</p>` : ""}
    <p class="small" style="margin-top:32px">
      Want to tell us what didn&rsquo;t work? Reply to this email &mdash; we
      read every word and use it to make linka better.
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
