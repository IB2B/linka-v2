"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function RefreshAnalyticsButton({ postId }: { postId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const onClick = () => {
    startTransition(() => {
      router.replace(`/dashboard/analytics/${postId}?t=${Date.now()}`);
    });
  };
  return (
    <Button size="sm" variant="outline" onClick={onClick} disabled={pending}>
      <RefreshCw className={cn("size-3.5", pending && "animate-spin")} />
      {pending ? "Refreshing…" : "Refresh"}
    </Button>
  );
}
