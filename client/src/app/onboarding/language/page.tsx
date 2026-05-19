import { getTranslations } from "next-intl/server";

import { StepShell } from "@/components/onboarding/step-shell";
import { OnboardingLanguagePicker } from "@/components/onboarding/language-picker";

export default async function OnboardingLanguagePage() {
  const t = await getTranslations("onboarding.language");
  return (
    <StepShell step={1} total={4} title={t("title")} description={t("description")}>
      <OnboardingLanguagePicker />
    </StepShell>
  );
}
