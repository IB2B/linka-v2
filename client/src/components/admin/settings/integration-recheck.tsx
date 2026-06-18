"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

// Re-runs the server component (which re-pings every service) without a full reload.
export function IntegrationRecheck() {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <Button
      size="sm" variant="outline" disabled={pending}
      onClick={() => start(() => router.refresh())}
    >
      {pending ? <Spinner aria-hidden /> : <RefreshCw className="size-3.5" />}
      Re-check
    </Button>
  );
}
