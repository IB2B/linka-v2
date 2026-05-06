export type PostComment = {
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
  replies: PostComment[];
};

export type PostCommentGroup = {
  platform: string;
  comments: PostComment[];
};

export type CommenterMe = { name: string; avatar: string | null };
