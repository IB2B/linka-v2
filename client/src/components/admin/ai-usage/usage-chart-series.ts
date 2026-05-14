import type { AiUsagePoint } from "@/types/admin-ai-usage";

export type SeriesKey = "drafts" | "posted" | "failed";

export const SERIES: { key: SeriesKey; label: string; color: string }[] = [
  { key: "drafts", label: "Drafts", color: "#6366f1" },
  { key: "posted", label: "Posted", color: "#10b981" },
  { key: "failed", label: "Failed", color: "#f43f5e" },
];

export function seriesTotals(data: AiUsagePoint[]) {
  return data.reduce(
    (a, p) => ({ drafts: a.drafts + p.drafts, posted: a.posted + p.posted, failed: a.failed + p.failed }),
    { drafts: 0, posted: 0, failed: 0 },
  );
}

export function trimLeadingZeros(data: AiUsagePoint[]): AiUsagePoint[] {
  const first = data.findIndex((p) => p.drafts > 0 || p.posted > 0 || p.failed > 0);
  return first <= 0 ? data : data.slice(Math.max(0, first - 3));
}
