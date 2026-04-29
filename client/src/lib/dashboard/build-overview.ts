import type { GeneratedPost } from "@/types/post";

export type DashboardCounts = {
  drafts: number;
  scheduled: number;
  posted: number;
  totalGenerated: number;
};

export function countPosts(posts: GeneratedPost[]): DashboardCounts {
  let drafts = 0, scheduled = 0, posted = 0;
  for (const p of posts) {
    if (p.status === "draft") drafts++;
    else if (p.status === "scheduled") scheduled++;
    else if (p.status === "posted") posted++;
  }
  return { drafts, scheduled, posted, totalGenerated: posts.length };
}

export function recentPosts(posts: GeneratedPost[], limit = 5): GeneratedPost[] {
  return [...posts]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, limit);
}

export function upcomingPosts(posts: GeneratedPost[], limit = 5): GeneratedPost[] {
  const now = Date.now();
  return posts
    .filter(
      (p) => p.status === "scheduled" && p.scheduledFor &&
        +new Date(p.scheduledFor) > now,
    )
    .sort(
      (a, b) => +new Date(a.scheduledFor!) - +new Date(b.scheduledFor!),
    )
    .slice(0, limit);
}
