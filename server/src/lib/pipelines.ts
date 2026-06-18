import { db } from "./db";

export { createOppSchema, updateOppSchema, moveOppSchema } from "./opp-schemas";

export function mapStage(r: any) {
  return { id: r.id, name: r.name, position: r.position, outcome: r.outcome };
}

function toYmd(v: any): string | null {
  if (!v) return null;
  if (v instanceof Date) {
    const m = String(v.getMonth() + 1).padStart(2, "0");
    const d = String(v.getDate()).padStart(2, "0");
    return `${v.getFullYear()}-${m}-${d}`;
  }
  return String(v).slice(0, 10);
}

export function mapOpp(r: any) {
  return {
    id: r.id, pipelineId: r.pipeline_id, stageId: r.stage_id,
    title: r.title,
    contactName: r.contact_name, contactHandle: r.contact_handle,
    contactEmail: r.contact_email ?? null,
    contactPhone: r.contact_phone ?? null,
    companyName: r.company_name ?? null,
    sourcePlatform: r.source_platform,
    valueAmount: r.value_amount != null ? Number(r.value_amount) : null,
    valueCurrency: r.value_currency ?? null,
    expectedClose: toYmd(r.expected_close),
    status: r.status, notes: r.notes,
    conversationId: r.conversation_id,
    socialUrl: r.social_url ?? null,
    facebookUrl: r.facebook_url ?? null,
    instagramUrl: r.instagram_url ?? null,
    xUrl: r.x_url ?? null,
    tiktokUrl: r.tiktok_url ?? null,
    threadsUrl: r.threads_url ?? null,
    position: r.position,
    lastActivityAt: r.last_activity_at,
    createdAt: r.created_at, updatedAt: r.updated_at,
  };
}

const COL_MAP: Record<string, string> = {
  title: "title",
  contactName: "contact_name",
  contactHandle: "contact_handle",
  contactEmail: "contact_email",
  contactPhone: "contact_phone",
  companyName: "company_name",
  sourcePlatform: "source_platform",
  valueAmount: "value_amount",
  valueCurrency: "value_currency",
  expectedClose: "expected_close",
  notes: "notes",
  socialUrl: "social_url",
  facebookUrl: "facebook_url",
  instagramUrl: "instagram_url",
  xUrl: "x_url",
  tiktokUrl: "tiktok_url",
  threadsUrl: "threads_url",
};

export function toUpdateColumn(key: string): string | null {
  return COL_MAP[key] ?? null;
}

export async function loadStage(stageId: string, userId: string) {
  const [rows] = await db.query<any[]>(
    `SELECT s.id, s.pipeline_id, s.outcome FROM pipeline_stages s
     JOIN pipelines p ON p.id = s.pipeline_id
     WHERE s.id = ? AND p.user_id = ?`,
    [stageId, userId],
  );
  return rows[0] ?? null;
}
