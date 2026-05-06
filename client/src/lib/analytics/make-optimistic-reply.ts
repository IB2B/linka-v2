import type { CommenterMe, PostComment } from "./post-comments.types";

export function makeOptimisticReply(text: string, me?: CommenterMe): PostComment {
  return {
    id: `optimistic-${Date.now()}`,
    text,
    authorName: me?.name ?? "You",
    authorAvatar: me?.avatar ?? null,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    replyCount: 0,
    url: null,
    isOwner: true,
    isVerified: false,
    isLiked: false,
    isHidden: false,
    canReply: false,
    canLike: false,
    canHide: false,
    canDelete: false,
    cid: null,
    replies: [],
  };
}
