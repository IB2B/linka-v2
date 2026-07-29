"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { savePlatformInstructionsAction } from "@/app/dashboard/settings/ai-instructions-actions";

// Shared submit handling for both instruction forms (shared brief + per platform).
export function useInstructionsSave(platform: string) {
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await savePlatformInstructionsAction(platform, formData);
      if (result.error) toast.error(result.error);
      else toast.success("Instructions saved.");
    });
  }

  return { pending, onSubmit };
}
