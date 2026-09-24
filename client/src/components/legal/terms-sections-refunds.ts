import type { LegalSection } from "./legal.types";

export const TERMS_REFUNDS: LegalSection[] = [
  {
    id: "failed-payments",
    heading: "Failed payments",
    blocks: [
      { type: "p", text: "If a payment fails, Stripe may retry it over the following days, and you keep access while it does. If the payment still cannot be collected, your subscription ends and your account moves to the Free plan. You can subscribe again at any time." },
    ],
  },
  {
    id: "refunds",
    heading: "Refunds",
    blocks: [
      { type: "p", text: "Every post uses paid AI resources, so payments are not refundable once you have used the service. We do give refunds in these cases:" },
      { type: "list", items: [
        "You have not used it yet — if you have not generated any posts, we refund your most recent payment in full.",
        "EU and UK consumers — if you subscribed as a consumer (not for your business), you can withdraw within 14 days of your first payment. Because you asked us to start the service straight away, we refund that payment minus a proportional amount for the days it was active.",
        "Our mistake — if you were charged twice, charged the wrong amount, or charged after you cancelled, we refund the extra charge.",
        "Any other case where the law requires a refund.",
      ] },
      { type: "p", text: "To ask for a refund, email support@intelligentb2b.com from the address on your account. Refunds go back to your original payment method and usually appear within 5–10 business days. When we refund a payment, the subscription it paid for ends right away and your account moves to the Free plan." },
    ],
  },
  {
    id: "price-changes",
    heading: "Price changes",
    blocks: [
      { type: "p", text: "We may change our prices. We will email you at least 30 days before a new price applies to you. It takes effect from your first billing date after that notice, and you can cancel before then if you do not want to continue." },
    ],
  },
  {
    id: "chargebacks",
    heading: "Billing disputes",
    blocks: [
      { type: "p", text: "If you think a charge is wrong, contact us first — we can usually fix it faster than your bank. If you open a chargeback instead, we may pause your account until it is resolved." },
    ],
  },
];
