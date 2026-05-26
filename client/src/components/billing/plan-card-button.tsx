"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { stripeService } from "@/lib/api/services";
import { getErrorMessage } from "@/lib/api/http";
import type { BillingPlan } from "@/types/billing-plan";

type Props = { plan: BillingPlan; isCurrent: boolean };

export function PlanCardButton({ plan, isCurrent }: Props) {
  const [pending, setPending] = useState(false);

  if (plan.cta === "contact") {
    return (
      <Button
        render={<Link href={plan.contactHref ?? "mailto:sales@linka.studio"} />}
        nativeButton={false}
        className="w-full"
        variant="outline"
      >
        Contact sales
      </Button>
    );
  }

  async function handleChoose() {
    setPending(true);
    try {
      const { url } = await stripeService.checkout({ tier: plan.id });
      window.location.href = url;
    } catch (e) {
      toast.error(getErrorMessage(e));
      setPending(false);
    }
  }

  return (
    <Button
      className="w-full gap-1.5"
      variant={plan.highlighted ? "default" : "outline"}
      disabled={isCurrent || pending}
      onClick={handleChoose}
    >
      {pending && <Spinner size="xs" />}
      {isCurrent ? "Current plan" : "Choose plan"}
    </Button>
  );
}
