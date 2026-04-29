import type { GeneratedPost, PostStatus } from "@/types/post";

export type StatusFilter = "all" | PostStatus;

export function filterPosts(
  posts: GeneratedPost[],
  query: string,
  status: StatusFilter,
): GeneratedPost[] {
  const q = query.trim().toLowerCase();
  return posts.filter((p) => {
    if (status !== "all" && p.status !== status) return false;
    if (!q) return true;
    return (
      p.content.toLowerCase().includes(q) ||
      (p.prompt?.toLowerCase().includes(q) ?? false) ||
      (p.platform?.toLowerCase().includes(q) ?? false)
    );
  });
}
