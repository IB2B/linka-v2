import { CommentRow } from "./comment-row";
import type { CommenterMe, PostComment } from "@/lib/analytics/post-comments.types";

type Props = {
  postId: string;
  platform: string;
  replies: PostComment[];
  depth: number;
  me?: CommenterMe;
};

export function CommentReplies({ postId, platform, replies, depth, me }: Props) {
  if (replies.length === 0 || depth >= 3) return null;
  return (
    <div className="mt-1 space-y-0.5 pl-2">
      {replies.map((r) => (
        <CommentRow
          key={r.id} postId={postId} platform={platform}
          comment={r} me={me} depth={depth + 1}
        />
      ))}
    </div>
  );
}
