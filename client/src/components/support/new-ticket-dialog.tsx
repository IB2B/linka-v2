"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import {
  Dialog, DialogContent, DialogDescription, DialogHeader,
  DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SupportForm } from "@/components/support/support-form";

export function NewTicketDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="sm" />}>
        <Plus className="size-3.5" />
        New ticket
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Open a support ticket</DialogTitle>
          <DialogDescription>
            Share as much detail as you can — our team will reply by email.
          </DialogDescription>
        </DialogHeader>
        <SupportForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
