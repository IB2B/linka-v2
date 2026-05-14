import { db } from "./db";
import { monthRange } from "./month-range";

const LAST30 = "created_at >= NOW() - INTERVAL 30 DAY";

export async function getUserAiStats(userId: string, month?: string) {
  const range = monthRange(month);
  const where = range
    ? "user_id = ? AND created_at >= ? AND created_at < ?"
    : "user_id = ?";
  const params = range ? [userId, range[0], range[1]] : [userId];

  const [[agg]] = await db.query<any[]>(
    `SELECT COUNT(*) AS total, SUM(status='posted') AS published,
            COALESCE(SUM(tokens_input),0) AS tok_in,
            COALESCE(SUM(tokens_output),0) AS tok_out,
            COALESCE(AVG(tokens_input+tokens_output),0) AS avg_tok,
            COUNT(CASE WHEN ${LAST30} THEN 1 END) AS last30,
            COALESCE(SUM(CASE WHEN ${LAST30} THEN tokens_input END),0) AS last30_in,
            COALESCE(SUM(CASE WHEN ${LAST30} THEN tokens_output END),0) AS last30_out
     FROM generated_content WHERE ${where}`, params,
  );
  return {
    total: Number(agg.total ?? 0),
    published: Number(agg.published ?? 0),
    tokensInput: Number(agg.tok_in ?? 0),
    tokensOutput: Number(agg.tok_out ?? 0),
    avgTokens: Math.round(Number(agg.avg_tok ?? 0)),
    last30: Number(agg.last30 ?? 0),
    last30TokensInput: Number(agg.last30_in ?? 0),
    last30TokensOutput: Number(agg.last30_out ?? 0),
  };
}

export async function getUserRecentDrafts(userId: string, month?: string) {
  const range = monthRange(month);
  const where = range
    ? "user_id = ? AND created_at >= ? AND created_at < ?"
    : "user_id = ?";
  const params = range ? [userId, range[0], range[1]] : [userId];

  const [rows] = await db.query<any[]>(
    `SELECT id, prompt, platform, status, tokens_input, tokens_output, model,
            image_status, created_at
     FROM generated_content WHERE ${where}
     ORDER BY created_at DESC LIMIT 20`, params,
  );
  return rows.map((r) => ({
    id: r.id,
    prompt: r.prompt ?? null,
    platform: r.platform ?? null,
    status: r.status ?? "draft",
    tokensInput: r.tokens_input != null ? Number(r.tokens_input) : null,
    tokensOutput: r.tokens_output != null ? Number(r.tokens_output) : null,
    model: r.model ?? null,
    imageStatus: r.image_status ?? null,
    createdAt: r.created_at instanceof Date ? r.created_at.toISOString() : String(r.created_at),
  }));
}
