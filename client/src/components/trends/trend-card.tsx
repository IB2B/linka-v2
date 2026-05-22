import { ExternalLink } from "lucide-react";

import type { Trend, TrendIdea } from "@/types/trend";
import { ScoreBar } from "./score-bar";
import { IdeaRow } from "./idea-row";

type Props = { trend: Trend; ideas: TrendIdea[] };

export function TrendCard({ trend, ideas }: Props) {
  return (
    <article className="space-y-3 rounded-xl border bg-card p-4">
      <header className="space-y-1.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 flex-1 break-words text-sm font-semibold leading-snug">{trend.title}</h3>
          <div className="shrink-0">
            <ScoreBar score={trend.score} />
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {trend.source ? <span>{trend.source}</span> : null}
          {trend.url ? (
            <a href={trend.url} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-foreground">
              source <ExternalLink className="size-3" />
            </a>
          ) : null}
        </div>
        {trend.summary ? (
          <p className="line-clamp-2 text-xs text-muted-foreground">{trend.summary}</p>
        ) : null}
      </header>
      {ideas.length > 0 ? (
        <div className="space-y-2">
          {ideas.map((i) => <IdeaRow key={i.id} idea={i} />)}
        </div>
      ) : null}
    </article>
  );
}
