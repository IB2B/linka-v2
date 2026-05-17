import type { DashboardUser } from "@/types/dashboard-user";

const TIER_LABEL: Record<string, string> = {
  free: "Free",
  starter: "Starter",
  pro: "Pro",
  scale: "Scale",
  professional: "Creator",
  enterprise: "Enterprise",
};

function tierLabel(tier: string): string {
  return TIER_LABEL[tier] ?? tier.charAt(0).toUpperCase() + tier.slice(1);
}

export function SidebarUsageMeter({ user }: { user: DashboardUser }) {
  const label = tierLabel(user.tier);
  const pct = Math.min(100, Math.round((user.postsUsed / user.postsLimit) * 100));
  const remaining = Math.max(0, user.postsLimit - user.postsUsed);

  return (
    <div className="mx-1 mb-1 space-y-2 rounded-lg border bg-card p-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold">{label} plan</p>
        <p className="text-xs tabular-nums text-muted-foreground">
          {user.postsUsed}/{user.postsLimit}
        </p>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        {remaining} post{remaining !== 1 ? "s" : ""} remaining
      </p>
    </div>
  );
}
