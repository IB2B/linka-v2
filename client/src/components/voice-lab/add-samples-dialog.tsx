"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SampleUploaderForm } from "./sample-uploader-form";
import type { SampleLimits } from "@/types/voice-lab";

export function AddSamplesDialog({ limits }: { limits: SampleLimits }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="sm" />}>
        <Plus className="size-4" />
        Add samples
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add writing samples</DialogTitle>
          <DialogDescription>
            {limits.current} / {limits.limit} samples used
          </DialogDescription>
        </DialogHeader>
        <SampleUploaderForm limits={limits} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
