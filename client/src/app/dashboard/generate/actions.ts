"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import type {
  GenerateInput,
  GenerationResult,
  NewsArticle,
  PostType,
  TopicSuggestion,
} from "@/types/content";

type Result<T> = { data?: T; error?: string };

async function api(path: string, init: RequestInit = {}): Promise<Response> {
  const cookieStore = await cookies();
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
  return fetch(`${proto}://${host}${path}`, {
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
  postType: PostType,
  count = 5,
): Promise<Result<TopicSuggestion[]>> {
  const res = await api("/api/content/suggest-topics", {
    method: "POST",
    body: JSON.stringify({ postType, count }),
  });
  const json = (await res.json().catch(() => ({}))) as {
    suggestions?: TopicSuggestion[];
    error?: string;
  };
  if (!res.ok) return { error: json.error ?? "Failed to get suggestions." };
  return { data: json.suggestions ?? [] };
}

export async function generatePostAction(
  input: GenerateInput,
): Promise<Result<GenerationResult>> {
  const res = await api("/api/content/generate", {
    method: "POST",
    body: JSON.stringify({
      postType: input.postType,
      topic: input.topic,
      newsArticle: input.newsArticle
        ? {
            title: input.newsArticle.title,
            url: input.newsArticle.url,
            source: input.newsArticle.source,
            summary: input.newsArticle.summary,
          }
        : undefined,
      platform: input.platform,
      language: input.language,
      withImage: input.withImage,
    }),
  });
  const json = (await res.json().catch(() => ({}))) as {
    post?: { id: string; content: string };
    error?: string;
  };
  if (!res.ok || !json.post) return { error: json.error ?? "Generation failed." };
  revalidatePath("/dashboard/posts");
  return { data: { contentId: json.post.id, content: json.post.content } };
}

const MOCK_NEWS: NewsArticle[] = [
  { id: "n1", title: "OpenAI ships a new agent SDK with built-in tools and memory", url: "#", source: "TechCrunch", summary: "Lowers the bar for building production agents." },
  { id: "n2", title: "LinkedIn rolls out long-form video for thought leaders", url: "#", source: "The Verge", summary: "Creators can publish 20-minute videos to the feed." },
  { id: "n3", title: "EU drafts a new policy framework for general-purpose AI", url: "#", source: "Reuters", summary: "Transparency requirements for foundation models." },
  { id: "n4", title: "Why remote-first is making a comeback at large tech companies", url: "#", source: "Wired", summary: "The pendulum is swinging back after RTO." },
  { id: "n5", title: "The state of B2B content marketing in 2026", url: "#", source: "Marketing Brew", summary: "Short-form video and personalized newsletters dominate." },
];
