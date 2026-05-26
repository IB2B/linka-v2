export const TIER_PRICE: Record<string, number> = {
  free: 0, starter: 0, pro: 29, scale: 79, professional: 79, enterprise: 0,
};

export const TIER_LABEL: Record<string, string> = {
  free: "Free", starter: "Free", pro: "Creator",
  scale: "Business", professional: "Business", enterprise: "Enterprise",
};

export const STATUS_LABEL: Record<string, string> = {
  ACTIVE: "Active", PAST_DUE: "Past due", CANCELED: "Canceled",
  UNPAID: "Unpaid", TRIALING: "Trialing", INCOMPLETE: "Incomplete",
  FREE: "Free",
};

export function tierLabel(tier: string | null | undefined): string {
  const t = (tier ?? "free").toLowerCase();
  return TIER_LABEL[t] ?? t.charAt(0).toUpperCase() + t.slice(1);
}

export function formatMoney(cents: number, currency = "usd") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

export function formatDate(ms: number | null) {
  if (!ms) return "—";
  return new Date(ms).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
