import type { GeneratedPost } from "@/types/post";
import type { PostMetrics } from "@/types/analytics";

export type UnderperformerPost = {
  post: GeneratedPost;
  metrics: PostMetrics;
  engagementRate: number;
  percentile: number;
};

export function computeUnderperformers(
  posts: GeneratedPost[],
  metrics: Map<string, PostMetrics>,
): UnderperformerPost[] {
  const posted = posts.filter(
    (p) => p.status === "posted" && metrics.has(p.id),
  );
  if (posted.length < 4) return [];

  const withRate = posted.map((p) => {
    const m = metrics.get(p.id)!;
    return { post: p, metrics: m, engagementRate: m.engagementRate };
  });

  const sorted = [...withRate].sort((a, b) => a.engagementRate - b.engagementRate);
  const ranked = sorted.map((item, i) => ({
    ...item,
    percentile: Math.round((i / (sorted.length - 1)) * 100),
  }));

  // posts in bottom 25th percentile that also have significant impressions
  const avgImpressions = withRate.reduce((s, x) => s + x.metrics.impressions, 0) / withRate.length;
  return ranked
    .filter((r) => r.percentile <= 25 && r.metrics.impressions >= avgImpressions * 0.5)
    .sort((a, b) => a.percentile - b.percentile)
    .slice(0, 5);
}
