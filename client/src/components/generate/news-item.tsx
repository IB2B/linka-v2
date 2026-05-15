"use client";

import { ArrowRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { NewsArticle } from "@/types/content";

type Props = { article: NewsArticle; disabled: boolean; onClick: () => void };

export function NewsItem({ article, disabled, onClick }: Props) {
  return (
    <div className="group relative flex items-start gap-3 rounded-md border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-muted/40">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="min-w-0 flex-1 space-y-1.5 text-left disabled:cursor-not-allowed disabled:opacity-50"
      >
        <p className="line-clamp-2 font-medium leading-snug pr-6">{article.title}</p>
        {article.summary ? (
          <p className="line-clamp-2 text-sm text-muted-foreground">{article.summary}</p>
        ) : null}
        <Badge variant="outline" className="text-xs">{article.source}</Badge>
      </button>
      <div className="flex shrink-0 flex-col items-center gap-1.5">
        <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
        {article.url && article.url !== "#" ? (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-muted-foreground hover:text-primary"
            aria-label="Open article"
          >
            <ExternalLink className="size-3.5" />
          </a>
        ) : null}
      </div>
    </div>
  );
}
