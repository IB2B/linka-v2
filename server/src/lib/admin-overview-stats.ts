import { db } from "./db";

export async function getUsersRollup() {
  const [[u]] = await db.query<any[]>(
    `SELECT
       COUNT(*)                                  AS total,
       SUM(status='ACTIVE')                      AS active,
       SUM(status='SUSPENDED')                   AS suspended,
       SUM(created_at >= NOW() - INTERVAL 7 DAY) AS new_week,
       SUM(created_at >= NOW() - INTERVAL 14 DAY AND created_at < NOW() - INTERVAL 7 DAY) AS new_prev_week
     FROM users`,
  );
  return {
    total: Number(u.total ?? 0),
    active: Number(u.active ?? 0),
    suspended: Number(u.suspended ?? 0),
    newThisWeek: Number(u.new_week ?? 0),
    newPrevWeek: Number(u.new_prev_week ?? 0),
  };
}

export async function getPostsRollup() {
  const [[p]] = await db.query<any[]>(
    `SELECT
       COUNT(*) AS total,
       SUM(created_at >= NOW() - INTERVAL 30 DAY) AS month,
       SUM(created_at >= NOW() - INTERVAL 60 DAY AND created_at < NOW() - INTERVAL 30 DAY) AS prev_month
     FROM generated_content`,
  );
  return {
    total: Number(p.total ?? 0),
    thisMonth: Number(p.month ?? 0),
    prevMonth: Number(p.prev_month ?? 0),
  };
}

export async function getSubscriptionsRollup() {
  const [[s]] = await db.query<any[]>(
    `SELECT
       SUM(status='active' AND plan_tier <> 'free') AS paying,
       SUM(plan_tier='free' OR plan_tier IS NULL)   AS free
     FROM subscriptions`,
  );
  return { paying: Number(s?.paying ?? 0), free: Number(s?.free ?? 0) };
}

export async function getTicketsRollup() {
  const [[t]] = await db.query<any[]>(
    `SELECT
       SUM(status='open') AS open_count,
       SUM(status IN ('open','pending') AND priority='urgent') AS urgent_count
     FROM support_tickets`,
  );
  return { open: Number(t?.open_count ?? 0), urgent: Number(t?.urgent_count ?? 0) };
}

export async function getFeedbackRollup() {
  const [[f]] = await db.query<any[]>(
    `SELECT SUM(status='new') AS new_count FROM feedback`,
  );
  return { newCount: Number(f?.new_count ?? 0) };
}

export async function getSubscriptionsMonth(month: string | null) {
  const start = month
    ? new Date(`${month}-01T00:00:00Z`)
    : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const end = new Date(start);
  end.setUTCMonth(end.getUTCMonth() + 1);
  const [[s]] = await db.query<any[]>(
    `SELECT
       SUM(plan_tier <> 'free' AND plan_tier IS NOT NULL) AS paying,
       SUM(plan_tier = 'free' OR plan_tier IS NULL)       AS free
     FROM subscriptions WHERE created_at >= ? AND created_at < ?`,
    [start, end],
  );
  return { paying: Number(s?.paying ?? 0), free: Number(s?.free ?? 0) };
}
