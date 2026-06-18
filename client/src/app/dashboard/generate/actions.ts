"use server";

import { MOCK_NEWS } from "./mock-news";
import type { NewsArticle } from "@/types/content";

type Result<T> = { data?: T; error?: string };

// TODO: replace with Tavily / news API call
export async function fetchNewsAction(): Promise<Result<NewsArticle[]>> {
  return { data: MOCK_NEWS };
}
