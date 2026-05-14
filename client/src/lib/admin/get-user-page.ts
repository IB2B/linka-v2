import { adminApi } from "@/lib/admin/api";
import type { AdminUserDetail } from "@/types/admin";
import type { UserAiUsage } from "@/types/admin-user-ai.types";

const DEFAULT_AI: UserAiUsage = {
  stats: { total: 0, published: 0, tokensInput: 0, tokensOutput: 0, avgTokens: 0, last30: 0, last30TokensInput: 0, last30TokensOutput: 0 },
  drafts: [],
};

export async function getUserPageData(id: string, month?: string): Promise<{
  detail: AdminUserDetail;
  ai: UserAiUsage;
} | null> {
  const qs = month ? `?month=${month}` : "";
  const [detailRes, aiRes] = await Promise.all([
    adminApi(`/api/admin/users/${id}/detail${qs}`),
    adminApi(`/api/admin/users/${id}/ai-usage${qs}`),
  ]);
  if (!detailRes.ok) return null;
  const [detail, ai] = await Promise.all([
    detailRes.json() as Promise<AdminUserDetail>,
    aiRes.ok ? (aiRes.json() as Promise<UserAiUsage>) : Promise.resolve(null),
  ]);
  return { detail, ai: ai ?? DEFAULT_AI };
}
