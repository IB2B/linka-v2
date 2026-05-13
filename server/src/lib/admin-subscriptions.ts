import { db } from "./db";

export const PLAN_PRICE: Record<string, number> = {
  free: 0, starter: 29, pro: 49, scale: 99,
};

export type SubsFilters = { q?: string; tier?: string; status?: string; from?: string; to?: string; limit: number; offset: number };

export type SubsRow = {
  id: string; userId: string; email: string; firstName: string; lastName: string;
  avatarUrl: string | null; planTier: string; status: string;
  currentPeriodEnd: string | null; cancelAtPeriodEnd: boolean;
  canceledAt: string | null; mrr: number; createdAt: string | null;
};

function mrrFor(tier: string, status: string): number {
  if (status !== "active" && status !== "trialing") return 0;
  return PLAN_PRICE[tier] ?? 0;
}

export async function listSubscriptions(f: SubsFilters) {
  const conds: string[] = []; const params: any[] = [];
  if (f.q) {
    conds.push("(u.email LIKE ? OR CONCAT_WS(' ', u.first_name, u.last_name) LIKE ?)");
    params.push(`%${f.q}%`, `%${f.q}%`);
  }
  if (f.tier) { conds.push("s.plan_tier = ?"); params.push(f.tier); }
  if (f.status) { conds.push("s.status = ?"); params.push(f.status); }
  if (f.from) { conds.push("s.created_at >= ?"); params.push(f.from); }
  if (f.to) { conds.push("s.created_at <= ?"); params.push(`${f.to} 23:59:59`); }
  const where = conds.length ? `WHERE ${conds.join(" AND ")}` : "";

  const [rows] = await db.query<any[]>(
    `SELECT s.id, s.user_id, s.plan_tier, s.status, s.current_period_end,
            s.cancel_at_period_end, s.canceled_at, s.created_at,
            u.email, u.first_name, u.last_name, p.avatar_url
     FROM subscriptions s
     INNER JOIN users u ON u.id = s.user_id
     LEFT JOIN user_profiles p ON p.user_id = s.user_id
     ${where}
     ORDER BY s.created_at DESC
     LIMIT ? OFFSET ?`,
    [...params, f.limit, f.offset],
  );
  const [[c]] = await db.query<any[]>(
    `SELECT COUNT(*) AS total FROM subscriptions s INNER JOIN users u ON u.id = s.user_id ${where}`,
    params,
  );
  return {
    rows: rows.map<SubsRow>((r) => ({
      id: r.id, userId: r.user_id, email: r.email,
      firstName: r.first_name, lastName: r.last_name,
      avatarUrl: r.avatar_url ?? null,
      planTier: r.plan_tier ?? "free", status: r.status ?? "active",
      currentPeriodEnd: r.current_period_end ? new Date(r.current_period_end).toISOString() : null,
      cancelAtPeriodEnd: !!r.cancel_at_period_end,
      canceledAt: r.canceled_at ? new Date(r.canceled_at).toISOString() : null,
      createdAt: r.created_at ? new Date(r.created_at).toISOString() : null,
      mrr: mrrFor(r.plan_tier ?? "free", r.status ?? "active"),
    })),
    total: Number(c.total ?? 0),
  };
}
