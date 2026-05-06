type Result = { ok: true } | { ok: false; error: string };

type Body = { platform: string; commentId: string; cid?: string };

async function post(path: string, body: Body): Promise<Result> {
  try {
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      return { ok: false, error: json.error ?? "Request failed." };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error." };
  }
}

export const likeComment = (postId: string, body: Body) =>
  post(`/api/posts/${postId}/comments/like`, body);

export const hideComment = (postId: string, body: Body) =>
  post(`/api/posts/${postId}/comments/hide`, body);

export const deleteComment = (postId: string, body: Body) =>
  post(`/api/posts/${postId}/comments/delete`, body);
