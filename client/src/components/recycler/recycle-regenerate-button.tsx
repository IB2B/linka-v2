"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { regenerateRecycledAction } from "@/app/dashboard/recycler/actions";

export function RecycleRegenerateButton({ postId }: { postId: string }) {
  const [pending, start] = useTransition();
  const router = useRouter();

  function onClick() {
    start(async () => {
      const res = await regenerateRecycledAction(postId);
      if (res.error) {
        toast.error(res.error);
        return;
      }
      toast.success("Draft created from your post.");
      if (res.draftId) router.push(`/dashboard/posts/${res.draftId}`);
    });
  }

  return (
    <Button size="sm" variant="outline" onClick={onClick} disabled={pending}>
      {pending ? <Spinner aria-hidden /> : <RefreshCw className="size-4" />}
      Regenerate
    </Button>
  );
}
