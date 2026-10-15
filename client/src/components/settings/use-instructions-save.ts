"use client";

import { useRef, useTransition } from "react";
import { toast } from "sonner";
import {
  saveInstructionsToAllAction, savePlatformInstructionsAction,
} from "@/app/dashboard/settings/ai-instructions-actions";

// Shared submit handling for both instruction forms (shared brief + per platform).
// `applyToAll` saves the form's current answers to every platform at once.
export function useInstructionsSave(platform: string) {
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await savePlatformInstructionsAction(platform, formData);
      if (result.error) toast.error(result.error);
      else toast.success("Instructions saved.");
    });
  }

  function applyToAll() {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    startTransition(async () => {
      const result = await saveInstructionsToAllAction(formData);
      if (result.error) toast.error(result.error);
      else toast.success("Saved to every platform.");
    });
  }

  return { pending, onSubmit, formRef, applyToAll };
}
