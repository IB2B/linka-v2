import { Badge } from "@/components/ui/badge";

type Props = {
  published?: string[];
  scheduled?: string[] | null;
  intended: string | null;
};

function pickList(p: Props): string[] {
  if (p.published && p.published.length > 0) return p.published;
  if (p.scheduled && p.scheduled.length > 0) return p.scheduled;
  return p.intended ? [p.intended] : [];
}

export function PlatformBadges(p: Props) {
  const list = pickList(p);
  if (list.length === 0) {
    return <span className="text-xs text-muted-foreground">—</span>;
  }
  return (
    <div className="flex flex-wrap gap-1">
      {list.map((x) => (
        <Badge key={x} variant="outline" className="capitalize">{x}</Badge>
      ))}
    </div>
  );
}
