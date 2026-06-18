import { ExternalLink, Lightbulb } from "lucide-react";

import type { Trend, TrendIdea } from "@/types/trend";
import { IdeaRow } from "./idea-row";
import { ScoreBadge } from "./score-badge";

type Props = { trend: Trend; ideas: TrendIdea[] };

export function TrendCard({ trend, ideas }: Props) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-foreground/20">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          {trend.source ? (
            <span className="rounded-full bg-muted px-2 py-0.5 font-medium">{trend.source}</span>
          ) : null}
          {trend.url ? (
            <a href={trend.url} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-foreground">
              source <ExternalLink className="size-3" />
            </a>
          ) : null}
          <span className="ml-auto">
            <ScoreBadge score={trend.score} label="Trend score" />
          </span>
        </div>
        <h3 className="break-words text-sm font-semibold leading-snug">{trend.title}</h3>
        {trend.summary ? (
          <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">{trend.summary}</p>
        ) : null}
      </header>
      {ideas.length > 0 ? (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
            <Lightbulb className="size-3.5" />
            {ideas.length} post {ideas.length === 1 ? "idea" : "ideas"}
          </div>
          {ideas.map((i) => <IdeaRow key={i.id} idea={i} />)}
        </div>
      ) : null}
    </article>
  );
}
