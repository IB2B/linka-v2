import { fetchMe } from "@/lib/auth/me";
import { StepShell } from "@/components/onboarding/step-shell";
import { PlanGrid } from "@/components/billing/plan-grid";
import { PlanActions } from "@/components/onboarding/plan-actions";
import type { PlanTier } from "@/types/billing-plan";

export default async function OnboardingPlanPage() {
  const user = await fetchMe();
  return (
    <StepShell
      step={3}
      title="Choose your plan"
      description="Start free and upgrade any time. No credit card required."
      backHref="/onboarding/connect"
      total={3}
      maxWidth="max-w-5xl"
    >
      <PlanGrid currentTier={user?.tier as PlanTier | undefined} />
      <PlanActions />
    </StepShell>
  );
}
