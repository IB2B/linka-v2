// Uploads a composer image to the server (same-origin; the httpOnly auth cookie
// is sent automatically and proxied to Express). Returns the stored public path.
export async function uploadComposeImage(
  file: File,
): Promise<{ url: string } | { error: string }> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/posts/upload-image", { method: "POST", body: fd });
  if (!res.ok) {
    const j = (await res.json().catch(() => ({}))) as { error?: string };
    return { error: j.error ?? "Image upload failed." };
  }
  return res.json() as Promise<{ url: string }>;
}
