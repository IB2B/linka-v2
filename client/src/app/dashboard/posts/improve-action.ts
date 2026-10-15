"use server";

import { revalidatePath } from "next/cache";
import { serverFetch, readError } from "@/lib/server-fetch";

type Result = { error?: string; success?: boolean };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Edits the post's current text with the chosen virality suggestions and an
// optional note of the user's own.
export async function improvePostAction(
  id: string, suggestions: string[], note?: string,
): Promise<Result> {
  if (!UUID.test(id)) return { error: "Post not found." };
  const res = await serverFetch(`/api/posts/${id}/improve-text`, {
    method: "POST",
    body: JSON.stringify({ suggestions, note: note?.trim() || undefined }),
  });
  if (!res.ok) return { error: await readError(res, "Couldn't apply the changes.") };
  revalidatePath(`/dashboard/posts/${id}`);
  return { success: true };
}
