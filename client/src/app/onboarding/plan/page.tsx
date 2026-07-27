import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { fetchMe } from "@/lib/auth/me";
import { completeForCompAction } from "@/app/onboarding/actions";
import { StepShell } from "@/components/onboarding/step-shell";
import { PlanGrid } from "@/components/billing/plan-grid";
import { PlanActions } from "@/components/onboarding/plan-actions";
import type { PlanTier } from "@/types/billing-plan";

export default async function OnboardingPlanPage() {
  const [user, t] = await Promise.all([fetchMe(), getTranslations("onboarding.plan")]);
  if (user?.isComp) {
    await completeForCompAction();
    redirect("/dashboard");
  }
  return (
    <StepShell
      step={4}
      total={4}
      title={t("title")}
      description={t("description")}
      backHref="/onboarding/connect"
      maxWidth="max-w-5xl"
    >
      <PlanGrid currentTier={user?.tier as PlanTier | undefined} />
      <PlanActions />
    </StepShell>
  );
}
