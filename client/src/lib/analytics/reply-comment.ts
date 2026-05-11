type ReplyInput = {
  postId: string;
  platform: string;
  commentId: string;
  message: string;
  imageUrl?: string;
};

export async function replyToComment(
  input: ReplyInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch(`/api/posts/${input.postId}/comments/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        platform: input.platform,
        commentId: input.commentId,
        message: input.message,
        imageUrl: input.imageUrl,
      }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { ok: false, error: body.error ?? "Couldn't send reply." };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error." };
  }
}
