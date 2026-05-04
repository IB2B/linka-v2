import { Separator } from "@/components/ui/separator";
import { TrendsGrid } from "@/components/trends/trends-grid";
import { TrendsEmpty } from "@/components/trends/trends-empty";
import { TopicPicker } from "@/components/trends/topic-picker";
import { getTrends } from "@/lib/trends/get-trends";

export default async function TrendsPage() {
  const { trends, ideas } = await getTrends();

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Trend Radar</h1>
        <p className="text-sm text-muted-foreground">
          Live trends in your niche, with AI-generated post angles.
        </p>
      </div>
      <TopicPicker />
      <Separator className="my-2" />
      {trends.length === 0 ? <TrendsEmpty /> : <TrendsGrid trends={trends} ideas={ideas} />}
    </>
  );
}
