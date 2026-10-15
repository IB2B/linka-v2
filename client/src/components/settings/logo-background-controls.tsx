"use client";

import { useState, useTransition } from "react";
import { Eraser, Undo2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  // The logo as uploaded; removal always starts from this, never from a result.
  base: string;
  // The logo currently shown and saved with the brand kit.
  url: string;
  onChange: (url: string) => void;
};

// "Remove background" for a logo on a plain background, with an option to
// also clear holes inside letters, and Undo back to the uploaded file.
export function LogoBackgroundControls({ base, url, onChange }: Props) {
  const [enclosed, setEnclosed] = useState(false);
  const [pending, start] = useTransition();
  const removed = url !== base;

  function run(clearInside: boolean) {
    start(async () => {
      const res = await fetch("/api/users/me/brand-logo/remove-background", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: base, enclosed: clearInside }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) { toast.error(json.error ?? "Couldn't remove the background."); return; }
      setEnclosed(clearInside);
      onChange(json.url);
    });
  }

  if (!removed) {
    return (
      <Button type="button" variant="outline" size="sm" disabled={pending} onClick={() => run(false)}>
        {pending ? <Spinner aria-hidden /> : <Eraser />}
        Remove background
      </Button>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Label className="flex items-center gap-2 text-sm font-normal">
        <Checkbox checked={enclosed} disabled={pending}
          onCheckedChange={(v) => run(v === true)} />
        Also clear inside letters
      </Label>
      <Button type="button" variant="ghost" size="sm" disabled={pending} onClick={() => onChange(base)}>
        {pending ? <Spinner aria-hidden /> : <Undo2 />}
        Undo
      </Button>
    </div>
  );
}
