import type { RawComment, RawCommentFrom } from "./late-comments";
import type { PlatformEntry } from "./late-accounts";
import { pickAvatar, pickName } from "./post-comments-pick";

export type CommentDTO = {
  id: string;
  text: string;
  authorName: string;
  authorAvatar: string | null;
  createdAt: string | null;
  likeCount: number;
  replyCount: number;
  url: string | null;
  isOwner: boolean;
  isVerified: boolean;
  isLiked: boolean;
  isHidden: boolean;
  canReply: boolean;
  canLike: boolean;
  canHide: boolean;
  canDelete: boolean;
  cid: string | null;
  replies: CommentDTO[];
};

function unwrapId(s: string | null | undefined): string | null {
  if (!s) return null;
  return s.includes(":") ? (s.split(":").pop() ?? s) : s;
}

function eq(a: string | null | undefined, b: string | null | undefined): boolean {
  return !!a && !!b && a.toLowerCase() === b.toLowerCase();
}

function isOwnedBy(f: RawCommentFrom | undefined, owner: PlatformEntry): boolean {
  if (!f) return false;
  if (eq(unwrapId(f.id), owner.ownerId)) return true;
  if (eq(f.username, owner.ownerUsername)) return true;
  if (eq(f.name, owner.ownerName)) return true;
  return !!f.isOwner;
}

// Late API doesn't support liking comments on LinkedIn.
const LIKE_UNSUPPORTED = new Set(["linkedin"]);

export function mapComment(
  c: RawComment, owner: PlatformEntry, parent?: RawCommentFrom,
): CommentDTO {
  const isOwner = isOwnedBy(c.from, owner) || (!c.from && !!parent);
  const fb = isOwner ? parent : undefined;
  const childParent = c.from ?? parent;
  return {
    id: c.id ?? c._id ?? Math.random().toString(36).slice(2),
    text: c.message ?? "",
    authorName: pickName(c.from, fb),
    authorAvatar: pickAvatar(c.from, fb),
    createdAt: c.createdTime ?? null,
    likeCount: c.likeCount ?? 0,
    replyCount: c.replyCount ?? 0,
    url: c.url ?? null,
    isOwner,
    isVerified: !!c.from?.verifiedType,
    isLiked: c.isLiked ?? false,
    isHidden: c.isHidden ?? false,
    canReply: c.canReply ?? true,
    canLike: (c.canLike ?? true) && !LIKE_UNSUPPORTED.has(owner.platform),
    canHide: c.canHide ?? false,
    canDelete: c.canDelete ?? isOwner,
    cid: c.cid ?? null,
    replies: Array.isArray(c.replies)
      ? c.replies.map((r) => mapComment(r, owner, childParent)) : [],
  };
}
