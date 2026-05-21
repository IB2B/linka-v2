import { lateFetch } from "./late-api";

const enc = encodeURIComponent;

export async function likeComment(
  postId: string, commentId: string, accountId: string, cid?: string,
) {
  return lateFetch<{ liked?: boolean }>(
    `/inbox/comments/${enc(postId)}/${enc(commentId)}/like`,
    { method: "POST", body: JSON.stringify({ accountId, cid }) },
  );
}

export async function deleteComment(
  postId: string, commentId: string, accountId: string,
) {
  const qs = new URLSearchParams({ accountId, commentId }).toString();
  return lateFetch<{ success?: boolean }>(
    `/inbox/comments/${enc(postId)}?${qs}`, { method: "DELETE" },
  );
}
