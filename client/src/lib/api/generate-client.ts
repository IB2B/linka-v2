import type {
  GenerateInput, GenerationResult, GenerationBatchError,
  PostType, TopicSuggestion,
} from "@/types/content";

// Browser fetches (not server actions) so an in-flight generation never blocks
// client-side navigation. Same-origin: the /api/* proxy carries the cookie.
type Result<T> = { data?: T; error?: string; code?: string };
type GenerationBatch = { posts: GenerationResult[]; errors?: GenerationBatchError[] };

function post(path: string, body: object): Promise<Response> {
  return fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function generatePost(input: GenerateInput): Promise<Result<GenerationBatch>> {
  // Unify both callers: generate page sends `media`, trends sends `withImage`.
  const media = input.media ?? (input.withImage ? "image" : "none");
  const res = await post("/api/content/generate", {
    postType: input.postType, topic: input.topic, newsArticle: input.newsArticle,
    platforms: input.platforms, language: input.language,
    media, withImage: media === "image",
    // Only meaningful for avatar renders; omitted otherwise so the server keeps
    // its per-platform defaults.
    ...(media === "avatar" && {
      avatarAspect: input.avatarAspect, avatarSeconds: input.avatarSeconds,
    }),
    ...(media === "image" && { imageShape: input.imageShape }),
  });
  const json = (await res.json().catch(() => ({}))) as {
    posts?: { platform: string; id: string; content: string }[];
    errors?: GenerationBatchError[]; error?: string; code?: string;
  };
  if (!res.ok) return { error: json.error ?? "Generation failed.", code: json.code };
  const posts = (json.posts ?? []).map((p) => ({ platform: p.platform, contentId: p.id, content: p.content }));
  return { data: { posts, errors: json.errors } };
}

export async function suggestTopics(
  postType: PostType, count = 5, refresh = false, language?: string,
): Promise<Result<TopicSuggestion[]>> {
  const res = await post("/api/content/suggest-topics", { postType, count, refresh, language });
  const json = (await res.json().catch(() => ({}))) as {
    suggestions?: TopicSuggestion[]; error?: string;
  };
  if (!res.ok) return { error: json.error ?? "Failed to get suggestions." };
  return { data: json.suggestions ?? [] };
}
