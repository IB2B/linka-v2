import { db } from "./db";

export type ImageStatus =
  "pending" | "generating" | "completed" | "failed" | "skipped";

export type TopGenerator = {
  id: string; email: string; firstName: string; lastName: string;
  avatarUrl: string | null; drafts: number; images: number;
  tokensInput: number; tokensOutput: number;
};

export type CountRow = { key: string; count: number };

export { getModelBreakdown } from "./ai-usage-models";

export async function getImageBreakdown(days: number) {
  const [rows] = await db.query<any[]>(
    `SELECT image_status k, COUNT(*) c FROM generated_content
     WHERE created_at >= NOW() - INTERVAL ? DAY
     GROUP BY image_status`,
    [days],
  );
  const map: Record<string, number> = {};
  for (const r of rows) map[String(r.k)] = Number(r.c ?? 0);
  const order: ImageStatus[] =
    ["completed", "failed", "generating", "pending", "skipped"];
  return order
    .map((k) => ({ key: k, count: map[k] ?? 0 }))
    .filter((r) => r.count > 0);
}

export async function getTopGenerators(days: number): Promise<TopGenerator[]> {
  const [rows] = await db.query<any[]>(
    `SELECT u.id, u.email, u.first_name, u.last_name, p.avatar_url,
            COUNT(g.id) drafts,
            SUM(g.image_status='completed') images,
            COALESCE(SUM(g.tokens_input),0) tok_in,
            COALESCE(SUM(g.tokens_output),0) tok_out
     FROM generated_content g
     INNER JOIN users u ON u.id = g.user_id
     LEFT JOIN user_profiles p ON p.user_id = u.id
     WHERE g.created_at >= NOW() - INTERVAL ? DAY
     GROUP BY u.id ORDER BY drafts DESC LIMIT 10`,
    [days],
  );
  return rows.map((r) => ({
    id: r.id, email: r.email,
    firstName: r.first_name, lastName: r.last_name,
    avatarUrl: r.avatar_url ?? null,
    drafts: Number(r.drafts ?? 0),
    images: Number(r.images ?? 0),
    tokensInput: Number(r.tok_in ?? 0),
    tokensOutput: Number(r.tok_out ?? 0),
  }));
}

export async function getDraftPlatformMix(days: number): Promise<CountRow[]> {
  const [rows] = await db.query<any[]>(
    `SELECT COALESCE(platform,'unknown') k, COUNT(*) c
     FROM generated_content
     WHERE created_at >= NOW() - INTERVAL ? DAY
     GROUP BY k ORDER BY c DESC LIMIT 8`,
    [days],
  );
  return rows.map((r) => ({ key: r.k, count: Number(r.c ?? 0) }));
}
