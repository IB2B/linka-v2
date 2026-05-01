"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import type { Stage } from "@/types/pipeline";
import { AddOpportunityForm } from "./add-opportunity-form";

export function AddOpportunityDialog({ stages }: { stages: Stage[] }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>
        <Plus className="size-4" /> Add opportunity
      </Button>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="border-b px-4 py-3">
          <DialogTitle className="text-base">New opportunity</DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4">
          <AddOpportunityForm stages={stages} onSaved={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
