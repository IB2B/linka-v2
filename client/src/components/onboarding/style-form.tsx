"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { saveStyleAction, skipStepAction } from "@/app/onboarding/actions";

export function StyleForm() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    const r = await saveStyleAction(content.trim());
    setPending(false);
    if (r.error) { toast.error(r.error); return; }
    router.push("/onboarding/plan");
  }

  async function handleSkip() {
    await skipStepAction(4);
    router.push("/onboarding/plan");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Textarea
        placeholder="Paste a LinkedIn post, email, or article you've written..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={6}
      />
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={handleSkip}
          disabled={pending}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
        >
          Skip for now
        </button>
        <Button type="submit" size="sm" disabled={pending || !content.trim()}>
          {pending && <Spinner size="xs" />} Continue
        </Button>
      </div>
    </form>
  );
}
