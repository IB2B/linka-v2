"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { FeedbackCategories } from "./feedback-categories";
import {
  submitFeedbackAction, type FeedbackCategory,
} from "@/app/dashboard/feedback-action";

type Props = { open: boolean; onOpenChange: (v: boolean) => void };

export function FeedbackDialog({ open, onOpenChange }: Props) {
  const [category, setCategory] = useState<FeedbackCategory>("general");
  const [message, setMessage] = useState("");
  const [pending, start] = useTransition();
  const pathname = usePathname();

  function submit() {
    if (message.trim().length < 5) {
      toast.error("Tell us a bit more (at least 5 characters).");
      return;
    }
    start(async () => {
      const res = await submitFeedbackAction({ category, message, pageUrl: pathname });
      if (res.error) { toast.error(res.error); return; }
      toast.success("Thanks for the feedback!");
      setMessage("");
      setCategory("general");
      onOpenChange(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share what you love</DialogTitle>
          <DialogDescription>
            Tell us what's working or what you'd love to see next.{" "}
            <Link
              href="/dashboard/support"
              className="text-foreground underline-offset-2 hover:underline"
              onClick={() => onOpenChange(false)}
            >
              Found a bug? Open a support ticket
            </Link>.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <FeedbackCategories value={category} onChange={setCategory} disabled={pending} />
          <Textarea
            placeholder={
              category === "feature"
                ? "What should we build next?"
                : "What's working well? What do you love?"
            }
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={pending}
            maxLength={5000}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={pending}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={pending}>
            {pending ? <Spinner aria-hidden /> : null}
            Send feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
