import type { GeneratedPost } from "./post";
import type { PostMetrics } from "./analytics";

export type RecycleReason = "winner" | "underdog";

export type RecycleCandidate = {
  post: GeneratedPost;
  reason: RecycleReason;
  score: number;
  metrics: PostMetrics;
  ageDays: number;
};

export type RecycleSettings = {
  enabled: boolean;
  perWeek: number;
  minAgeDays: number;
  lastRunAt: string | null;
};
