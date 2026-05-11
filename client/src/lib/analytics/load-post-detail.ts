import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts/get-post";
import { getPostAnalytics } from "@/lib/analytics/get-post-analytics";
import { getAnalyticsSummary } from "@/lib/analytics/get-analytics-summary";
import { getPostTimeseries } from "@/lib/analytics/get-post-timeseries";
import { getPostComments } from "@/lib/analytics/get-post-comments";
import { computeBaseline } from "@/lib/analytics/post-baseline";
import { computeScore, type ScoreResult } from "@/lib/analytics/post-score";
import { buildInsights } from "@/lib/analytics/post-insights";
import { synthesizeSeries } from "@/lib/analytics/synthesize-series";
import type { GeneratedPost } from "@/types/post";
import type {
  PostAnalyticsResult, PostMetrics, PostSnapshot,
} from "@/types/analytics";

export type PostDetailData = {
  post: GeneratedPost;
  analytics: PostAnalyticsResult | null;
  series: PostSnapshot[];
  baseline: PostMetrics | null;
  sampleSize: number;
  score: ScoreResult | null;
  insights: string[];
};

export async function loadPostDetail(id: string): Promise<PostDetailData> {
  const [post, analytics, summary] = await Promise.all([
    getPost(id), getPostAnalytics(id), getAnalyticsSummary(),
  ]);
  if (!post) notFound();
  const [rawSeries, commentGroups] = await Promise.all([
    getPostTimeseries(id), getPostComments(id),
  ]);
  const isOk = analytics?.state === "ok";
  const series = synthesizeSeries(
    post.postedAt, rawSeries, commentGroups,
    isOk ? analytics.totals : null,
  );
  const others = [...summary.entries()]
    .filter(([pid]) => pid !== id).map(([, m]) => m);
  const { avg, sampleSize } = computeBaseline(summary, id);
  const score = isOk ? computeScore(analytics.totals, others) : null;
  const insights = isOk && score
    ? buildInsights(analytics.totals, avg, sampleSize, analytics.platforms, score.percentile)
    : [];
  return {
    post, analytics, series,
    baseline: sampleSize > 0 ? avg : null,
    sampleSize, score, insights,
  };
}
