export async function uploadSupportAttachment(
  file: File,
): Promise<{ url: string } | { error: string }> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/support/upload", { method: "POST", body: fd });
  if (!res.ok) {
    const j = (await res.json().catch(() => ({}))) as { error?: string };
    return { error: j.error ?? "Upload failed" };
  }
  return (await res.json()) as { url: string };
}
