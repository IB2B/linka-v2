import { apiGet } from "@/lib/server/api-get";
import type { GeneratedPost } from "@/types/post";

export async function getPosts(): Promise<GeneratedPost[]> {
  const json = await apiGet<{ posts?: GeneratedPost[] }>("/api/posts");
  return json?.posts ?? [];
}
