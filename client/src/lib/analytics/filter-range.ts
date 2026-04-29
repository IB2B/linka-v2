import type { GeneratedPost } from "@/types/post";

export type Window = { start: Date; end: Date };

const DAY_MS = 24 * 60 * 60 * 1000;

export function buildWindows(days: number | null, now = new Date()) {
  const end = now;
  const start = days === null ? new Date(0) : new Date(end.getTime() - days * DAY_MS);
  const prevStart = days === null
    ? new Date(0)
    : new Date(start.getTime() - days * DAY_MS);
  const prevEnd = days === null ? new Date(0) : start;
  return {
    current: { start, end },
    previous: { start: prevStart, end: prevEnd },
  };
}

export function inWindow(post: GeneratedPost, w: Window): boolean {
  const t = new Date(post.createdAt).getTime();
  return t >= w.start.getTime() && t <= w.end.getTime();
}
