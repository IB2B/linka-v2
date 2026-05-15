"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { stripeService } from "@/lib/api/services";
import { getErrorMessage } from "@/lib/api/http";

export function UpgradeWallCta() {
  const [pending, setPending] = useState(false);

  async function handleUpgrade() {
    setPending(true);
    try {
      const { url } = await stripeService.checkout({ tier: "pro" });
      window.location.href = url;
    } catch (e) {
      toast.error(getErrorMessage(e));
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button className="w-full gap-2" disabled={pending} onClick={handleUpgrade}>
        {pending ? <Spinner size="xs" /> : <Sparkles className="size-4" />}
        Upgrade to Creator — $29/mo
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground"
        render={<Link href="/dashboard/billing" />}
        nativeButton={false}
      >
        View all plans
      </Button>
    </div>
  );
}
