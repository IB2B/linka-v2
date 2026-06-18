import type { GeneratedPost } from "@/types/post";
import type { PostScore } from "@/types/post-score";

// Build the persisted virality score (if any) for the detail panel's initial state.
export function postScoreFrom(post: GeneratedPost): PostScore | null {
  if (post.viralityScore == null) return null;
  return {
    score: post.viralityScore,
    reasons: post.viralityReasons ?? [],
    suggestions: post.viralitySuggestions ?? [],
  };
}
