import { fetchMe } from "@/lib/auth/me";
import { CommentsView } from "./comments-view";
import { getPostComments } from "@/lib/analytics/get-post-comments";
import type { CommenterMe } from "@/lib/analytics/post-comments.types";

export async function CommentsCard({ postId }: { postId: string }) {
  const [groups, me] = await Promise.all([getPostComments(postId), fetchMe()]);
  const commenter: CommenterMe | undefined = me
    ? { name: `${me.firstName} ${me.lastName}`.trim() || me.email, avatar: me.avatarUrl }
    : undefined;
  return <CommentsView postId={postId} groups={groups} me={commenter} />;
}
