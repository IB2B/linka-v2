"use client";

import { CheckSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSelection } from "./selection-context";

export function SelectToggle() {
  const sel = useSelection();
  if (sel.enabled) return null;
  return (
    <Button size="sm" variant="outline" onClick={() => sel.setEnabled(true)}>
      <CheckSquare className="size-4" /> Select
    </Button>
  );
}
