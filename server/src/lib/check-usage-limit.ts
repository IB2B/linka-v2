import { db } from "./db";
import { postsLimitFor } from "./plan-features";
import { effectiveTier } from "./comp-accounts";
import { notifyUserIfEnabled } from "./notify-user";
import { currentPeriodKey, tryClaimNotification } from "./notification-log";
import { escapeHtml } from "./email/escape";
import type { RowDataPacket } from "mysql2";

type UsageRow = RowDataPacket & {
  n: number; tier: string | null; email: string | null; verified: Date | null;
};

async function loadUsage(userId: string) {
  const [rows] = await db.query<UsageRow[]>(
    `SELECT (SELECT COUNT(*) FROM generated_content
              WHERE user_id = u.id
                AND created_at >= DATE_FORMAT(NOW(), '%Y-%m-01 00:00:00')) AS n,
            u.email AS email,
            u.email_verified_at AS verified,
            s.plan_tier AS tier
     FROM users u
       LEFT JOIN subscriptions s ON s.user_id = u.id
     WHERE u.id = ? LIMIT 1`,
    [userId],
  );
  return rows[0] ?? null;
}

function buildEmail(pct: number, used: number, limit: number) {
  const heading = pct >= 100
    ? "You've hit your monthly post limit"
    : "You're at 80% of your monthly post limit";
  return (name: string) => ({
    subject: heading,
    html: `<p>Hi ${escapeHtml(name)},</p>
<p>You've used <strong>${used} of ${limit}</strong> posts this month
(${pct}%).</p>
<p>${pct >= 100
  ? "New posts will be blocked until your plan resets. Upgrade if you need more."
  : "Just a heads-up so you don't get caught off-guard."}</p>
<p><a href="${process.env.NEXT_PUBLIC_APP_URL ?? ""}/dashboard/billing">Manage your plan →</a></p>`,
  });
}

export async function checkAndNotifyUsageLimit(userId: string): Promise<void> {
  const u = await loadUsage(userId);
  if (!u) return;
  const limit = postsLimitFor(effectiveTier(u.email, u.tier, u.verified != null));
  if (limit <= 0) return;
  const pct = Math.floor((u.n / limit) * 100);
  const period = currentPeriodKey();
  const kind = pct >= 100 ? "limit_100" : pct >= 80 ? "limit_80" : null;
  if (!kind) return;
  const claimed = await tryClaimNotification(userId, kind, period);
  if (!claimed) return;
  await notifyUserIfEnabled(userId, "notif_limit", buildEmail(pct, u.n, limit));
}
