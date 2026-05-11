export async function uploadCommentImage(
  postId: string, file: File,
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  try {
    const form = new FormData();
    form.append("image", file);
    const res = await fetch(`/api/posts/${postId}/comments/image`, {
      method: "POST", body: form,
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { ok: false, error: body.error ?? "Couldn't upload image." };
    }
    const body = await res.json();
    return { ok: true, url: String(body.url ?? "") };
  } catch {
    return { ok: false, error: "Network error." };
  }
}
