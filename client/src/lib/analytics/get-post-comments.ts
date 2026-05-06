import { cookies, headers } from "next/headers";
import type { PostCommentGroup } from "./post-comments.types";

export async function getPostComments(id: string): Promise<PostCommentGroup[]> {
  const [cookieStore, hdrs] = await Promise.all([cookies(), headers()]);
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const cookie = cookieStore.getAll()
    .map((c) => `${c.name}=${c.value}`).join("; ");
  try {
    const res = await fetch(`${proto}://${host}/api/posts/${id}/comments`, {
      headers: { cookie }, cache: "no-store",
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { groups?: PostCommentGroup[] };
    return json.groups ?? [];
  } catch {
    return [];
  }
}
