import { adminApi } from "@/lib/admin/api";
import type { AiUsageOverview } from "@/types/admin-ai-usage";

export async function getAiUsageOverview(days = 30): Promise<AiUsageOverview | null> {
  const res = await adminApi(`/api/admin/ai-usage/overview?days=${days}`);
  if (!res.ok) return null;
  return (await res.json()) as AiUsageOverview;
}
