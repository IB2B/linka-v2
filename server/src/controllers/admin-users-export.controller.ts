import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/admin";
import { listAdminUsers } from "../lib/admin-users-list";

function esc(v: string | number | null): string {
  if (v === null || v === undefined) return "";
  const s = String(v);
  const safe = /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
  if (/[",\n\r]/.test(safe)) return `"${safe.replace(/"/g, '""')}"`;
  return safe;
}

const TIER_LABEL: Record<string, string> = {
  free: "Free", starter: "Free", pro: "Creator",
  scale: "Business", professional: "Business", enterprise: "Enterprise",
};
const planLabel = (t: string | null): string =>
  TIER_LABEL[(t ?? "free").toLowerCase()] ?? (t ?? "");

export async function exportAdminUsers(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const q = String(req.query.q ?? "").trim() || undefined;
    const role = typeof req.query.role === "string" ? req.query.role : undefined;
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    const { users } = await listAdminUsers({ q, role, status, limit: 10000, offset: 0 });

    const headers = ["ID", "Email", "First name", "Last name", "Role", "Status",
      "Plan", "Posts this month", "MRR", "Currency", "Last active", "Joined"];
    const rows = users.map((u) => [
      esc(u.id), esc(u.email), esc(u.firstName), esc(u.lastName),
      esc(u.role), esc(u.status), esc(planLabel(u.planTier)), esc(u.postsThisMonth),
      esc(u.mrr != null ? (u.mrr / 100).toFixed(2) : ""),
      esc(u.mrrCurrency ? u.mrrCurrency.toUpperCase() : ""),
      esc(u.lastActiveAt), esc(u.createdAt),
    ].join(","));

    const csv = [headers.join(","), ...rows].join("\n");
    const filename = `linka-users-${new Date().toISOString().slice(0, 10)}.csv`;

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(csv);
  } catch (e) { next(e); }
}
