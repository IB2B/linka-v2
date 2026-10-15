"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogClose, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

type Props = { platformLabel: string; pending: boolean; onConfirm: () => void };

// Copies this tab's answers to every platform, after a confirm because it
// replaces whatever the user wrote on the other tabs.
export function ApplyToAllButton({ platformLabel, pending, onConfirm }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="button" variant="outline" size="sm" disabled={pending}
        onClick={() => setOpen(true)}>
        Apply to all platforms
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Use these answers everywhere?</DialogTitle>
            <DialogDescription>
              Your {platformLabel} answers will be saved to every platform. This
              replaces what you wrote on the other tabs. You can still change
              each platform afterwards.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
            <Button onClick={() => { setOpen(false); onConfirm(); }}>
              Apply to all
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
