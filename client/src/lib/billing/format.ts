export const TIER_PRICE: Record<string, number> = {
  FREE: 0, STARTER: 0, PRO: 19, SCALE: 49, PROFESSIONAL: 49, ENTERPRISE: 149,
};

export const TIER_LABEL: Record<string, string> = {
  FREE: "Free", STARTER: "Free", PRO: "Creator",
  SCALE: "Pro", PROFESSIONAL: "Pro", ENTERPRISE: "Enterprise",
};

export const STATUS_LABEL: Record<string, string> = {
  ACTIVE: "Active", PAST_DUE: "Past due", CANCELED: "Canceled",
  UNPAID: "Unpaid", TRIALING: "Trialing", INCOMPLETE: "Incomplete",
  FREE: "Free",
};

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
