"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export function BillingToast() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (params.get("success") === "1") {
      toast.success("Plan activated! Welcome aboard.");
      router.replace("/dashboard/billing");
    }
  }, [params, router]);

  return null;
}
