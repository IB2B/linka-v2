import type { Notification } from "./notifications-data";

export type SocialNotificationApiItem = {
  id: string;
  postId: string;
  kind: "likes" | "comments";
  delta: number;
  platform: string;
  excerpt: string;
  createdAt: string;
  seenAt: string | null;
};

function buildTitle(kind: "likes" | "comments", delta: number, platform: string): string {
  const noun = kind === "likes"
    ? (delta === 1 ? "like" : "likes")
    : (delta === 1 ? "comment" : "comments");
  return `${delta} new ${noun} on ${platform}`;
}

export function buildSocialNotifications(
  items: SocialNotificationApiItem[], prefix: string,
): Notification[] {
  return items.map((s) => ({
    id: `social-${s.id}`,
    kind: s.kind,
    title: buildTitle(s.kind, s.delta, s.platform),
    body: s.excerpt,
    href: `${prefix}/analytics/${s.postId}`,
    at: s.createdAt,
    seen: s.seenAt !== null,
  }));
}
