import { db } from "./db";

export type ContentFilters = {
  q?: string;
  status?: string;
  platform?: string;
  limit: number;
  offset: number;
};

export type ContentRow = {
  id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  excerpt: string;
  imageUrl: string | null;
  platform: string | null;
  platforms: string[];
  status: string;
  scheduledFor: string | null;
  postedAt: string | null;
  createdAt: string;
};

function parsePlatforms(raw: unknown): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw as string[];
  try { const j = JSON.parse(String(raw)); return Array.isArray(j) ? j : []; }
  catch { return []; }
}

export async function listAdminContent(f: ContentFilters) {
  const conds: string[] = []; const params: any[] = [];
  if (f.q) {
    conds.push("(g.content LIKE ? OR u.email LIKE ?)");
    params.push(`%${f.q}%`, `%${f.q}%`);
  }
  if (f.status) { conds.push("g.status = ?"); params.push(f.status); }
  if (f.platform) {
    conds.push("(g.platform = ? OR JSON_CONTAINS(g.scheduled_platforms, JSON_QUOTE(?)))");
    params.push(f.platform, f.platform);
  }
  const where = conds.length ? `WHERE ${conds.join(" AND ")}` : "";

  const [rows] = await db.query<any[]>(
    `SELECT g.id, g.user_id, g.content, g.image_url, g.platform, g.scheduled_platforms,
            g.status, g.scheduled_for, g.posted_at, g.created_at,
            u.email, u.first_name, u.last_name, p.avatar_url
     FROM generated_content g
     INNER JOIN users u ON u.id = g.user_id
     LEFT JOIN user_profiles p ON p.user_id = g.user_id
     ${where}
     ORDER BY g.created_at DESC
     LIMIT ? OFFSET ?`,
    [...params, f.limit, f.offset],
  );
  const [[c]] = await db.query<any[]>(
    `SELECT COUNT(*) AS total FROM generated_content g
     INNER JOIN users u ON u.id = g.user_id ${where}`,
    params,
  );
  return {
    rows: rows.map<ContentRow>((r) => ({
      id: r.id, userId: r.user_id, email: r.email,
      firstName: r.first_name, lastName: r.last_name,
      avatarUrl: r.avatar_url ?? null,
      excerpt: String(r.content ?? "").slice(0, 280),
      imageUrl: r.image_url ?? null,
      platform: r.platform ?? null,
      platforms: parsePlatforms(r.scheduled_platforms),
      status: r.status ?? "draft",
      scheduledFor: r.scheduled_for ? new Date(r.scheduled_for).toISOString() : null,
      postedAt: r.posted_at ? new Date(r.posted_at).toISOString() : null,
      createdAt: new Date(r.created_at).toISOString(),
    })),
    total: Number(c.total ?? 0),
  };
}
