import { apiGet } from "@/lib/server/api-get";
import type { GeneratedPost } from "@/types/post";

export async function getPost(id: string): Promise<GeneratedPost | null> {
  const json = await apiGet<{ post?: GeneratedPost }>(`/api/posts/${id}`);
  return json?.post ?? null;
}
