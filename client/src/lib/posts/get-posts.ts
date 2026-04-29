import { cookies, headers } from "next/headers";
import type { GeneratedPost } from "@/types/post";

export async function getPosts(): Promise<GeneratedPost[]> {
  const cookieStore = await cookies();
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
  const res = await fetch(`${proto}://${host}/api/posts`, {
    headers: { cookie }, cache: "no-store",
  });
  if (!res.ok) return [];
  const json = (await res.json()) as { posts?: GeneratedPost[] };
  return json.posts ?? [];
}
