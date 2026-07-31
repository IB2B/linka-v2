import { normalizeHashtags } from "./hashtag-normalize";

// Deterministic repair of what the model returned. Prompting reduces these but
// never to zero, and a post ships to someone's public feed — so the guarantees
// live here, not in the wording of a system prompt.
export function sanitizePost(text: string, platform = "linkedin"): string {
  return normalizeHashtags(text, platform);
}
