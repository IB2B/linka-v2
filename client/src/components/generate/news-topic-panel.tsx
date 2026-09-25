"use client";

import { useState } from "react";

import { NewsPicker } from "./news-picker";
import { TopicGenerateBar } from "./topic-generate-bar";
import type { NewsArticle } from "@/types/content";

type Props = {
  articles: NewsArticle[];
  pending: boolean;
  onGenerate: (article: NewsArticle) => void;
};

export function NewsTopicPanel({ articles, pending, onGenerate }: Props) {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  return (
    <>
      <NewsPicker articles={articles} selectedId={article?.id ?? null}
        pending={pending} onSelect={setArticle} />
      {articles.length > 0 ? (
        <TopicGenerateBar label={article?.title ?? null} pending={pending}
          onGenerate={() => article && onGenerate(article)} />
      ) : null}
    </>
  );
}
