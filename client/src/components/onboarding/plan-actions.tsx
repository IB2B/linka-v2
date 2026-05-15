"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { finishOnboardingAction } from "@/app/onboarding/actions";

export function PlanActions() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleFree() {
    setPending(true);
    const r = await finishOnboardingAction();
    if (r.error) { toast.error(r.error); setPending(false); return; }
    router.push("/dashboard");
  }

  return (
    <div className="flex justify-end pt-2">
      <Button size="sm" variant="outline" onClick={handleFree} disabled={pending}>
        {pending && <Spinner size="xs" />}
        Continue with free plan
      </Button>
    </div>
  );
}
