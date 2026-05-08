import { db } from "./db";

export type FlagFilters = { q?: string; status?: string; reason?: string; limit: number; offset: number };

export type FlagRow = {
  id: string;
  contentId: string;
  status: string;
  reason: string;
  details: string | null;
  resolution: string;
  createdAt: string;
  reviewedAt: string | null;
  reporter: { id: string; email: string; firstName: string; lastName: string; avatarUrl: string | null };
  author:   { id: string; email: string; firstName: string; lastName: string; avatarUrl: string | null };
  post: { excerpt: string; imageUrl: string | null; platform: string | null;
          status: string; hiddenAt: string | null };
};

export async function listFlags(f: FlagFilters) {
  const conds: string[] = []; const params: any[] = [];
  if (f.q) {
    conds.push("(g.content LIKE ? OR ru.email LIKE ? OR au.email LIKE ?)");
    params.push(`%${f.q}%`, `%${f.q}%`, `%${f.q}%`);
  }
  if (f.status) { conds.push("cf.status = ?"); params.push(f.status); }
  if (f.reason) { conds.push("cf.reason = ?"); params.push(f.reason); }
  const where = conds.length ? `WHERE ${conds.join(" AND ")}` : "";

  const [rows] = await db.query<any[]>(
    `SELECT cf.id, cf.content_id, cf.status, cf.reason, cf.details, cf.resolution,
            cf.created_at, cf.reviewed_at,
            ru.id ru_id, ru.email ru_email, ru.first_name ru_fn, ru.last_name ru_ln,
            rp.avatar_url ru_av,
            au.id au_id, au.email au_email, au.first_name au_fn, au.last_name au_ln,
            ap.avatar_url au_av,
            g.content, g.image_url, g.platform, g.status g_status, g.hidden_at
     FROM content_flags cf
     INNER JOIN generated_content g ON g.id = cf.content_id
     INNER JOIN users ru ON ru.id = cf.reporter_id
     INNER JOIN users au ON au.id = g.user_id
     LEFT JOIN user_profiles rp ON rp.user_id = ru.id
     LEFT JOIN user_profiles ap ON ap.user_id = au.id
     ${where}
     ORDER BY FIELD(cf.status,'pending','reviewing','actioned','dismissed'), cf.created_at DESC
     LIMIT ? OFFSET ?`,
    [...params, f.limit, f.offset],
  );
  const [[c]] = await db.query<any[]>(
    `SELECT COUNT(*) AS total FROM content_flags cf
     INNER JOIN generated_content g ON g.id = cf.content_id
     INNER JOIN users ru ON ru.id = cf.reporter_id
     INNER JOIN users au ON au.id = g.user_id ${where}`,
    params,
  );
  return {
    rows: rows.map<FlagRow>((r) => ({
      id: r.id, contentId: r.content_id, status: r.status, reason: r.reason,
      details: r.details, resolution: r.resolution,
      createdAt: new Date(r.created_at).toISOString(),
      reviewedAt: r.reviewed_at ? new Date(r.reviewed_at).toISOString() : null,
      reporter: { id: r.ru_id, email: r.ru_email, firstName: r.ru_fn, lastName: r.ru_ln, avatarUrl: r.ru_av ?? null },
      author:   { id: r.au_id, email: r.au_email, firstName: r.au_fn, lastName: r.au_ln, avatarUrl: r.au_av ?? null },
      post: { excerpt: String(r.content ?? "").slice(0, 280), imageUrl: r.image_url ?? null,
              platform: r.platform ?? null, status: r.g_status ?? "draft",
              hiddenAt: r.hidden_at ? new Date(r.hidden_at).toISOString() : null },
    })),
    total: Number(c.total ?? 0),
  };
}
