import { getTranslations } from "next-intl/server";

import { StepShell } from "@/components/onboarding/step-shell";
import { CompanyForm } from "@/components/onboarding/company-form";

export default async function OnboardingCompanyPage() {
  const t = await getTranslations("onboarding.company");
  return (
    <StepShell
      step={2}
      total={4}
      title={t("title")}
      description={t("description")}
      alignLeft
    >
      <CompanyForm />
    </StepShell>
  );
}
