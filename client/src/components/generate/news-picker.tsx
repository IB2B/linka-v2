"use client";

import { Newspaper } from "lucide-react";

import { NewsItem } from "./news-item";
import type { NewsArticle } from "@/types/content";

type Props = {
  articles: NewsArticle[];
  pending: boolean;
  onSelect: (article: NewsArticle) => void;
};

export function NewsPicker({ articles, pending, onSelect }: Props) {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
        <Newspaper className="size-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          No articles right now — try refreshing in a moment.
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-2">
      {articles.map((article) => (
        <NewsItem
          key={article.id}
          article={article}
          disabled={pending}
          onClick={() => onSelect(article)}
        />
      ))}
    </div>
  );
}
