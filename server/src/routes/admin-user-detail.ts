import { Router } from "express";
import { adminOnly } from "../middleware/admin";
import { fetchUserDetail } from "../lib/admin-user-detail";
import { getUserAiStats, getUserRecentDrafts } from "../lib/admin-user-ai";

const router = Router();
router.use(adminOnly);

function shape(d: any) {
  const u = d.user;
  return {
    user: {
      id: u.id, email: u.email,
      firstName: u.first_name, lastName: u.last_name,
      role: u.role, status: u.status,
      createdAt: u.created_at, avatarUrl: u.avatar_url ?? null,
      planTier: u.plan_tier ?? "free",
    },
    profile: { industry: u.industry ?? null, bio: u.bio ?? null, jobTitle: u.job_title ?? null },
    subscription: u.plan_tier
      ? {
          planTier: u.plan_tier, status: u.sub_status,
          currentPeriodEnd: u.current_period_end,
          canceledAt: u.canceled_at,
        }
      : null,
    stats: {
      generated: Number(d.counts.generated ?? 0),
      published: Number(d.counts.published ?? 0),
      failed: Number(d.counts.failed ?? 0),
      last30d: Number(d.counts.last30d ?? 0),
    },
    activity: d.activity.map((a: any) => ({
      type: a.type,
      detail: a.detail ?? null,
      at: a.at instanceof Date ? a.at.toISOString() : String(a.at),
      actor: null,
    })),
    platforms: d.platforms,
  };
}

router.get("/:id/detail", async (req, res, next) => {
  try {
    const month = String(req.query.month ?? "").slice(0, 7) || undefined;
    const d = await fetchUserDetail(req.params.id, month);
    if (!d) { res.status(404).json({ error: "User not found" }); return; }
    res.json(shape(d));
  } catch (e) { next(e); }
});

router.get("/:id/ai-usage", async (req, res, next) => {
  try {
    const id = req.params.id;
    const month = String(req.query.month ?? "").slice(0, 7) || undefined;
    const [stats, drafts] = await Promise.all([
      getUserAiStats(id, month), getUserRecentDrafts(id, month),
    ]);
    res.json({ stats, drafts });
  } catch (e) { next(e); }
});

export default router;
