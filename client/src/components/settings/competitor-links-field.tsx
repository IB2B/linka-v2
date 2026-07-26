"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const MAX = 5;

export function CompetitorLinksField({ defaultLinks }: { defaultLinks: string[] }) {
  const [links, setLinks] = useState<string[]>(
    defaultLinks.length ? defaultLinks : [""],
  );

  function update(i: number, v: string) {
    setLinks((prev) => prev.map((l, idx) => (idx === i ? v : l)));
  }

  return (
    <div className="space-y-2">
      <Label>Example accounts you admire (up to {MAX})</Label>
      <p className="text-xs text-muted-foreground">
        Paste profile links doing what you want to do — the AI uses them as reference.
      </p>
      <div className="space-y-2">
        {links.map((link, i) => (
          <div key={i} className="flex gap-2">
            <Input
              name="competitorLinks"
              value={link}
              onChange={(e) => update(i, e.target.value)}
              placeholder="https://linkedin.com/in/…"
            />
            {links.length > 1 && (
              <Button
                type="button" variant="ghost" size="icon"
                onClick={() => setLinks((p) => p.filter((_, idx) => idx !== i))}
              >
                <X className="size-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
      {links.length < MAX && (
        <Button
          type="button" variant="outline" size="sm" className="gap-1.5"
          onClick={() => setLinks((p) => [...p, ""])}
        >
          <Plus className="size-4" /> Add link
        </Button>
      )}
    </div>
  );
}
