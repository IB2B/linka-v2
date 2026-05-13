import { POST_TYPES, type PostTypeMeta } from "./post-types";
import type { PostType } from "@/types/content";

export const RANDOM_TYPES: PostType[] = POST_TYPES.filter(
  (p) => p.type !== "news_commentary",
).map((p) => p.type);

export function getPostTypeMeta(type: PostType): PostTypeMeta {
  return POST_TYPES.find((p) => p.type === type) ?? POST_TYPES[0];
}
