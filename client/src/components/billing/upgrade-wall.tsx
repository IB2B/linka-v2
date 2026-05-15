import { Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlanFeature } from "./plan-feature";
import { UpgradeWallCta } from "./upgrade-wall-cta";
import { BILLING_PLANS } from "@/lib/billing/plans";
import type { PaidFeature } from "@/lib/billing/plan-features";

const FEATURE_META: Record<PaidFeature, { title: string; description: string }> = {
  inbox: {
    title: "DM Inbox & Replies",
    description:
      "Reply to DMs and comments across all your connected platforms from one unified inbox.",
  },
  analytics: {
    title: "Analytics Dashboard",
    description:
      "Track your post performance, engagement rates, and platform growth over time.",
  },
  trends: {
    title: "Trend Radar",
    description:
      "Discover trending topics in your niche with AI-generated post angles — ready to publish.",
  },
};

export function UpgradeWall({ feature }: { feature: PaidFeature }) {
  const meta = FEATURE_META[feature];
  const creator = BILLING_PLANS.find((p) => p.id === "pro")!;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-16">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-muted">
          <Lock className="size-6 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold tracking-tight">{meta.title}</h2>
        <p className="max-w-xs text-sm text-muted-foreground">{meta.description}</p>
      </div>
      <Card className="w-full max-w-sm border-primary/50 shadow-sm">
        <CardHeader className="space-y-1.5">
          <CardTitle className="flex items-center justify-between text-base">
            {creator.name}
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              Popular
            </span>
          </CardTitle>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold">{creator.price}</span>
            <span className="text-sm text-muted-foreground">{creator.cadence}</span>
          </div>
          <p className="text-sm text-muted-foreground">{creator.description}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2">
            {creator.features.map((f) => (
              <PlanFeature key={f}>{f}</PlanFeature>
            ))}
          </ul>
          <UpgradeWallCta />
        </CardContent>
      </Card>
    </div>
  );
}
