"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import type { Stage } from "@/types/pipeline";
import { AddOpportunityForm } from "./add-opportunity-form";

export function AddOpportunityDialog({ stages }: { stages: Stage[] }) {
  const t = useTranslations("pipeline");
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>
        <Plus className="size-4" /> {t("addOpportunity")}
      </Button>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="border-b px-4 py-3">
          <DialogTitle className="text-base">{t("newOpportunity")}</DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4">
          <AddOpportunityForm stages={stages} onSaved={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
