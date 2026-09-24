import type { LegalSection } from "./legal.types";

export const TERMS_BILLING: LegalSection[] = [
  {
    id: "plans",
    heading: "Plans and prices",
    blocks: [
      { type: "p", text: "linka has a Free plan and paid monthly plans. Enterprise plans are priced separately under a written agreement." },
      { type: "list", items: [
        "The Free plan needs no card and has no time limit. We may change what it includes.",
        "Current prices and what each plan includes are shown on our pricing page. The exact price is always shown at checkout before you pay.",
        "Prices are in the currency shown at checkout. Where we are required to charge VAT or sales tax, it is shown at checkout.",
      ] },
    ],
  },
  {
    id: "payment",
    heading: "Payment and renewal",
    blocks: [
      { type: "p", text: "Paid plans are billed monthly in advance through our payment processor, Stripe. We never see or store your full card number." },
      { type: "list", items: [
        "Your plan renews automatically every month on the day you subscribed. By subscribing, you authorize us to charge your payment method each month until you cancel.",
        "Your invoices are on the Billing page, where you can view or download each one as a PDF.",
        "Keep your payment details up to date on the Billing page.",
      ] },
    ],
  },
  {
    id: "usage",
    heading: "Usage limits",
    blocks: [
      { type: "p", text: "Each plan includes a number of AI posts per month, shown on the pricing page and on your Billing page." },
      { type: "list", items: [
        "Your post allowance resets on the first day of each calendar month, not on your billing date. Unused posts do not carry over.",
        "AI images and avatar videos also have daily limits, to keep the service fair and costs predictable.",
        "When you reach a limit, new generation pauses until the limit resets or you upgrade. Nothing you have already made is affected.",
      ] },
    ],
  },
  {
    id: "plan-changes",
    heading: "Upgrading, downgrading, and cancelling",
    blocks: [
      { type: "list", items: [
        "You can upgrade, downgrade, or cancel at any time from the Billing page.",
        "When you switch plans, Stripe shows any prorated charge or credit before you confirm.",
        "If you cancel, your plan stays active until the end of the period you have already paid for. It then does not renew, and your account moves to the Free plan. Your posts and settings stay.",
        "Deleting your account cancels your subscription immediately. Unused time is not refunded, except as described under Refunds.",
      ] },
    ],
  },
];
