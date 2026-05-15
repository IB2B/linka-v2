import { fetchMe } from "@/lib/auth/me";
import { StepShell } from "@/components/onboarding/step-shell";
import { ConnectStep } from "@/components/onboarding/connect-step";

export default async function OnboardingConnectPage() {
  const user = await fetchMe();
  const isFree = !user || user.tier === "free";
  return (
    <StepShell
      step={2}
      title="Connect your accounts"
      description="Link the platforms you publish on."
      backHref="/onboarding/company"
      total={3}
    >
      <ConnectStep isFree={isFree} />
    </StepShell>
  );
}
