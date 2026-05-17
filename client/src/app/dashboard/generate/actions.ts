"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { MOCK_NEWS } from "./mock-news";
import type {
  GenerateInput, GenerationResult, GenerationBatchError,
  NewsArticle, PostType, TopicSuggestion,
} from "@/types/content";

const API_BASE = process.env.API_URL ?? "http://localhost:4000";

type Result<T> = { data?: T; error?: string; code?: string };
type GenerationBatch = { posts: GenerationResult[]; errors?: GenerationBatchError[] };

async function api(path: string, init: RequestInit = {}): Promise<Response> {
  const cookieStore = await cookies();
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
  return fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", cookie, ...(init.headers ?? {}) },
    cache: "no-store",
  });
}

// TODO: replace with Tavily / news API call
export async function fetchNewsAction(): Promise<Result<NewsArticle[]>> {
  return { data: MOCK_NEWS };
}

export async function suggestTopicsAction(
  postType: PostType, count = 5, refresh = false,
): Promise<Result<TopicSuggestion[]>> {
  const res = await api("/api/content/suggest-topics", {
    method: "POST",
    body: JSON.stringify({ postType, count, refresh }),
  });
  const json = (await res.json().catch(() => ({}))) as {
    suggestions?: TopicSuggestion[]; error?: string;
  };
  if (!res.ok) return { error: json.error ?? "Failed to get suggestions." };
  return { data: json.suggestions ?? [] };
}

export async function generatePostAction(
  input: GenerateInput,
): Promise<Result<GenerationBatch>> {
  const res = await api("/api/content/generate", {
    method: "POST",
    body: JSON.stringify({
      postType: input.postType, topic: input.topic, newsArticle: input.newsArticle,
      platforms: input.platforms, language: input.language, withImage: input.withImage,
    }),
  });
  const json = (await res.json().catch(() => ({}))) as {
    posts?: { platform: string; id: string; content: string }[];
    errors?: GenerationBatchError[]; error?: string; code?: string;
  };
  if (!res.ok) return { error: json.error ?? "Generation failed.", code: json.code };
  const posts = (json.posts ?? []).map((p) => ({ platform: p.platform, contentId: p.id, content: p.content }));
  revalidatePath("/dashboard/posts");
  return { data: { posts, errors: json.errors } };
}
