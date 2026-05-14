import { stripe } from "./stripe";
import type Stripe from "stripe";

export type SubsRow = {
  id: string; email: string; firstName: string; lastName: string;
  avatarUrl: string | null; planTier: string; status: string;
  currentPeriodEnd: string | null; cancelAtPeriodEnd: boolean;
  canceledAt: string | null; mrr: number; createdAt: string | null;
  currency: string;
};

function mrrFromSub(sub: Stripe.Subscription): number {
  const item = sub.items.data[0];
  if (!item) return 0;
  const amount = item.price.unit_amount ?? 0;
  return item.price.recurring?.interval === "year" ? Math.round(amount / 12) : amount;
}

function rowFromSub(sub: Stripe.Subscription): SubsRow {
  const customer = typeof sub.customer === "object" ? sub.customer as Stripe.Customer : null;
  const email = customer?.email ?? null;
  const name = customer?.name ?? email ?? "—";
  const parts = (name ?? "").split(" ");
  const item = sub.items.data[0];
  const periodEnd = item?.current_period_end ?? null;
  return {
    id: sub.id,
    email: email ?? "—",
    firstName: parts[0] ?? "—",
    lastName: parts.slice(1).join(" ") || "",
    avatarUrl: null,
    planTier: item?.price?.nickname ?? "paid",
    status: sub.status,
    currentPeriodEnd: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
    cancelAtPeriodEnd: sub.cancel_at_period_end,
    canceledAt: sub.canceled_at ? new Date(sub.canceled_at * 1000).toISOString() : null,
    mrr: mrrFromSub(sub),
    createdAt: sub.created ? new Date(sub.created * 1000).toISOString() : null,
    currency: item?.price?.currency ?? "usd",
  };
}

export async function listSubscriptions(f: {
  q?: string; status?: string; from?: string; to?: string;
}) {
  const params: Stripe.SubscriptionListParams = {
    limit: 100,
    expand: ["data.customer"],
    status: (f.status as Stripe.SubscriptionListParams["status"]) ?? "all",
  };
  if (f.from || f.to) {
    params.created = {};
    if (f.from) params.created.gte = Math.floor(new Date(f.from).getTime() / 1000);
    if (f.to) params.created.lte = Math.floor(new Date(`${f.to}T23:59:59Z`).getTime() / 1000);
  }

  const all = await stripe.subscriptions.list(params).autoPagingToArray({ limit: 500 });
  let rows = all.map(rowFromSub);

  if (f.q) {
    const q = f.q.toLowerCase();
    rows = rows.filter((r) =>
      r.email.toLowerCase().includes(q) ||
      `${r.firstName} ${r.lastName}`.toLowerCase().includes(q),
    );
  }
  return { rows, total: rows.length };
}
