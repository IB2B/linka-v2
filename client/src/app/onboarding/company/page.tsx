import { StepShell } from "@/components/onboarding/step-shell";
import { CompanyForm } from "@/components/onboarding/company-form";

export default function OnboardingCompanyPage() {
  return (
    <StepShell
      step={1}
      title="Tell us about your company"
      description="This helps us tailor content to your audience and industry."
      alignLeft
    >
      <CompanyForm />
    </StepShell>
  );
}
