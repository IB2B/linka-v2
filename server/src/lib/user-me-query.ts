import { db } from "./db";

export async function getUserMe(userId: string) {
  const [rows] = await db.query<any[]>(
    `SELECT u.id, u.email, u.role, u.first_name, u.last_name,
            p.avatar_url, p.industry, p.bio,
            r.enabled AS recycler_enabled
     FROM users u
       LEFT JOIN user_profiles p ON p.user_id = u.id
       LEFT JOIN recycle_settings r ON r.user_id = u.id
     WHERE u.id = ?`, [userId],
  );
  const u = rows[0];
  if (!u) return null;
  return {
    id: u.id, email: u.email, role: u.role,
    firstName: u.first_name, lastName: u.last_name,
    avatarUrl: u.avatar_url ?? null,
    industry: u.industry ?? null,
    bio: u.bio ?? null,
    features: { recycler: u.recycler_enabled === 1 },
  };
}
