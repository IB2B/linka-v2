// Stripe subscription statuses where the current period is not paid for.
// past_due keeps access while Stripe retries the card; everything here falls
// back to the Free plan. Every feature gate reads plan_tier alone, so this is
// where paid access ends.
const NO_ACCESS = new Set([
  "canceled", "unpaid", "incomplete", "incomplete_expired", "paused",
]);

export function tierForStatus(status: string, paidTier: string): string {
  return NO_ACCESS.has(status) ? "free" : paidTier;
}
