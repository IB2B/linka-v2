import type { PostMetrics, PlatformBreakdown } from "@/types/analytics";

export function buildInsights(
  totals: PostMetrics, baseline: PostMetrics, baselineSize: number,
  platforms: PlatformBreakdown[], percentile: number,
): string[] {
  const out: string[] = [];
  if (baselineSize >= 5 && baseline.engagementRate > 0.0001) {
    const lift = Math.round(
      ((totals.engagementRate - baseline.engagementRate) / baseline.engagementRate) * 100,
    );
    if (lift >= 20) out.push(`Engagement is ${lift}% above your average.`);
    else if (lift <= -20) out.push(`Engagement is ${Math.abs(lift)}% below your average.`);
  }
  if (baselineSize >= 5) {
    if (percentile >= 90) out.push(`Top ${Math.max(100 - percentile, 1)}% of your posts.`);
    else if (percentile >= 75) out.push("Outperforming most of your recent posts.");
    else if (percentile <= 25) out.push("Underperforming most of your recent posts.");
  }
  const ok = platforms.filter((p) => p.status === "ok");
  if (ok.length > 1) {
    const top = [...ok].sort((a, b) => b.metrics.likes - a.metrics.likes)[0];
    if (top && top.metrics.likes > 0) {
      out.push(`Top platform: ${top.platform} with ${top.metrics.likes.toLocaleString()} likes.`);
    }
  }
  const failed = platforms.filter((p) => p.status === "failed");
  if (failed.length > 0) {
    const s = failed.length > 1 ? "s" : "";
    out.push(`${failed.length} platform${s} failed to publish.`);
  }
  return out;
}
