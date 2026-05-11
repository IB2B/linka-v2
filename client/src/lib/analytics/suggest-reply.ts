type SuggestInput = {
  postId: string;
  platform: string;
  commentMessage: string;
  commenterName?: string;
};

export async function suggestReply(
  input: SuggestInput,
): Promise<{ ok: true; suggestion: string } | { ok: false; error: string }> {
  try {
    const res = await fetch(`/api/posts/${input.postId}/comments/suggest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        platform: input.platform,
        commentMessage: input.commentMessage,
        commenterName: input.commenterName,
      }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { ok: false, error: body.error ?? "Couldn't suggest a reply." };
    }
    const body = await res.json();
    return { ok: true, suggestion: String(body.suggestion ?? "") };
  } catch {
    return { ok: false, error: "Network error." };
  }
}
