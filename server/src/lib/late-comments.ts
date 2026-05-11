import { lateFetch } from "./late-api";

export type RawCommentFrom = {
  id?: string;
  name?: string;
  username?: string;
  displayName?: string;
  picture?: string | null;
  profilePicture?: string | null;
  avatar?: string | null;
  imageUrl?: string | null;
  profilePicUrl?: string | null;
  isOwner?: boolean;
  verifiedType?: string | null;
};

export type RawComment = {
  id?: string;
  _id?: string;
  message?: string;
  createdTime?: string;
  from?: RawCommentFrom;
  likeCount?: number;
  replyCount?: number;
  canReply?: boolean;
  canLike?: boolean;
  canHide?: boolean;
  canDelete?: boolean;
  isLiked?: boolean;
  isHidden?: boolean;
  parentId?: string | null;
  url?: string;
  cid?: string;
  replies?: RawComment[];
};

export async function listPostComments(
  postId: string, accountId: string, cursor?: string,
) {
  const qs = new URLSearchParams({ accountId, limit: "50" });
  if (cursor) qs.set("cursor", cursor);
  return lateFetch<{ comments: RawComment[] }>(
    `/inbox/comments/${encodeURIComponent(postId)}?${qs.toString()}`,
  );
}

export async function replyToPostComment(
  postId: string, accountId: string, commentId: string, message: string,
  mediaUrl?: string,
) {
  const body: Record<string, unknown> = { accountId, commentId, message };
  if (mediaUrl) body.mediaUrl = mediaUrl;
  return lateFetch<{ success?: boolean; data?: { commentId?: string } }>(
    `/inbox/comments/${encodeURIComponent(postId)}`,
    { method: "POST", body: JSON.stringify(body) },
  );
}
