import type { GeneratedPost } from "@/types/post";
import { dateKey } from "./format";

export function postDate(post: GeneratedPost): Date {
  const iso = post.scheduledFor ?? post.postedAt ?? post.createdAt;
  return new Date(iso);
}

export function groupPostsByDay(
  posts: GeneratedPost[],
): Map<string, GeneratedPost[]> {
  const map = new Map<string, GeneratedPost[]>();
  for (const post of posts) {
    const key = dateKey(postDate(post));
    const list = map.get(key);
    if (list) list.push(post);
    else map.set(key, [post]);
  }
  for (const list of map.values()) {
    list.sort(
      (a, b) => postDate(a).getTime() - postDate(b).getTime(),
    );
  }
  return map;
}
