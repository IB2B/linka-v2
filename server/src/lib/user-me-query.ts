import { db } from "./db";
import { postsLimitFor } from "./plan-features";

export async function getUserMe(userId: string) {
  const [userResult, usageResult] = await Promise.all([
    db.query<any[]>(
      `SELECT u.id, u.email, u.role, u.first_name, u.last_name,
              u.onboarding_completed, u.email_verified_at,
              p.avatar_url, p.industry, p.bio, p.job_title,
              r.enabled AS recycler_enabled,
              s.plan_tier
       FROM users u
         LEFT JOIN user_profiles p ON p.user_id = u.id
         LEFT JOIN recycle_settings r ON r.user_id = u.id
         LEFT JOIN subscriptions s ON s.user_id = u.id
       WHERE u.id = ?`, [userId],
    ),
    db.query<any[]>(
      "SELECT COUNT(*) AS n FROM generated_content WHERE user_id = ?",
      [userId],
    ),
  ]);
  const u = userResult[0][0];
  if (!u) return null;
  const tier = String(u.plan_tier ?? "free").toLowerCase();
  return {
    id: u.id, email: u.email, role: u.role,
    firstName: u.first_name, lastName: u.last_name,
    avatarUrl: u.avatar_url ?? null,
    industry: u.industry ?? null,
    bio: u.bio ?? null,
    jobTitle: u.job_title ?? null,
    tier,
    onboardingCompleted: u.onboarding_completed === 1,
    emailVerified: u.email_verified_at !== null,
    postsUsed: Number(usageResult[0][0]?.n ?? 0),
    postsLimit: postsLimitFor(tier),
    features: { recycler: u.recycler_enabled === 1 },
  };
}
