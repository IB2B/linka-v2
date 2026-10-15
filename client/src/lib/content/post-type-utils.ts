import { POST_TYPES, type PostTypeMeta } from "./post-types";
import type { PostType } from "@/types/content";

// News needs an article and product promos need a saved product, so "Surprise me"
// skips both.
export const RANDOM_TYPES: PostType[] = POST_TYPES.filter(
  (p) => p.type !== "news_commentary" && p.type !== "promote_product",
).map((p) => p.type);

export function getPostTypeMeta(type: PostType): PostTypeMeta {
  return POST_TYPES.find((p) => p.type === type) ?? POST_TYPES[0];
}
