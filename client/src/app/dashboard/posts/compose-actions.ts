"use server";

import { revalidatePath } from "next/cache";
import { serverFetch, readError } from "@/lib/server-fetch";

// Creates a manual post row; the caller then publishes or schedules it by id.
export async function createPostAction(
  content: string, imageUrl?: string | null,
): Promise<{ id?: string; error?: string }> {
  const res = await serverFetch("/api/posts", {
    method: "POST",
    body: JSON.stringify({ content, imageUrl: imageUrl ?? null }),
  });
  if (!res.ok) return { error: await readError(res, "Failed to create post.") };
  const j = (await res.json().catch(() => ({}))) as { post?: { id?: string } };
  revalidatePath("/dashboard/posts");
  return { id: j.post?.id };
}
