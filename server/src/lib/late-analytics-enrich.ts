import { listPostComments } from "./late-comments";
import type { PlatformBreakdown } from "../types/analytics";

const COMMENT_SUPPORTED = new Set([
  "linkedin", "instagram", "facebook",
  "twitter", "threads", "reddit",
]);

async function enrichOne(
  postId: string, p: PlatformBreakdown,
): Promise<PlatformBreakdown> {
  if (p.status !== "pending") return p;
  if (!p.accountId) return p;
  if (!COMMENT_SUPPORTED.has(p.platform)) return p;
  try {
    const data = await listPostComments(postId, p.accountId);
    const comments = data.comments ?? [];
    const commentCount = comments.length;
    const likeSum = comments.reduce((s, c) => s + (c.likeCount ?? 0), 0);
    if (commentCount === 0 && likeSum === 0) return p;
    return {
      ...p,
      status: "ok",
      metrics: {
        ...p.metrics,
        comments: commentCount,
        likes: likeSum,
      },
    };
  } catch (e) {
    console.error("[late-enrich] comments fallback failed", p.platform, e);
    return p;
  }
}

export async function enrichPendingFromComments(
  postId: string, platforms: PlatformBreakdown[],
): Promise<PlatformBreakdown[]> {
  return Promise.all(platforms.map((p) => enrichOne(postId, p)));
}
