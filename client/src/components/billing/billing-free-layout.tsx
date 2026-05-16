import { PlanGrid } from "./plan-grid";

type Props = {
  postsThisMonth: number;
  postsLimit: number;
};

export function BillingFreeLayout({ postsThisMonth, postsLimit }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Upgrade your plan</h1>
        <p className="text-sm text-muted-foreground mt-1.5">
          You're on the Free plan — {postsThisMonth} of {postsLimit} posts used this month.
          Pick a plan to unlock more posts, all platforms, and premium features.
        </p>
      </div>
      <PlanGrid currentTier="starter" />
    </div>
  );
}
