"use client";

import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { NewsArticle } from "@/types/content";

type Props = {
  article: NewsArticle;
  disabled: boolean;
  onClick: () => void;
};

export function NewsItem({ article, disabled, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="group flex w-full items-start justify-between gap-3 rounded-md border bg-card p-3 text-left transition-colors hover:border-primary/50 hover:bg-muted/40 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <div className="min-w-0 flex-1 space-y-1.5">
        <p className="line-clamp-2 font-medium leading-snug">
          {article.title}
        </p>
        {article.summary ? (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {article.summary}
          </p>
        ) : null}
        <Badge variant="outline" className="text-xs">
          {article.source}
        </Badge>
      </div>
      <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
    </button>
  );
}
