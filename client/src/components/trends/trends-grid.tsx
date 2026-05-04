import type { Trend, TrendIdea } from "@/types/trend";
import { TrendCard } from "./trend-card";

type Props = { trends: Trend[]; ideas: TrendIdea[] };

export function TrendsGrid({ trends, ideas }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {trends.map((t) => (
        <TrendCard
          key={t.id}
          trend={t}
          ideas={ideas.filter((i) => i.trendId === t.id)}
        />
      ))}
    </div>
  );
}
