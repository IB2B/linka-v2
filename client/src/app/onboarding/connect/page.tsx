import { getTranslations } from "next-intl/server";

import { fetchMe } from "@/lib/auth/me";
import { StepShell } from "@/components/onboarding/step-shell";
import { ConnectStep } from "@/components/onboarding/connect-step";

export default async function OnboardingConnectPage() {
  const [user, t] = await Promise.all([fetchMe(), getTranslations("onboarding.connect")]);
  const isFree = !user || user.tier === "free";
  return (
    <StepShell
      step={3}
      total={4}
      title={t("title")}
      description={t("description")}
      backHref="/onboarding/company"
    >
      <ConnectStep isFree={isFree} />
    </StepShell>
  );
}
