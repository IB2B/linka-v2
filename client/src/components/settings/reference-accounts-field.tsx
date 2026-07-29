"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MAX_REFERENCE_ACCOUNTS as MAX } from "@/lib/content/platform-instructions.types";

// Accounts the user thinks post really well. Names/handles feed the prompt today
// and will be the input list for post scraping later.
export function ReferenceAccountsField({ accounts }: { accounts: string[] }) {
  const [rows, setRows] = useState<string[]>(accounts.length ? accounts : [""]);

  return (
    <div className="space-y-1.5">
      <Label>Accounts you want to post like</Label>
      <p className="text-xs text-muted-foreground">
        Up to {MAX} accounts doing a great job on this platform — @handle or
        profile link. The AI studies their style, never copies their words.
      </p>
      <div className="space-y-2 pt-0.5">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input
              name="referenceAccounts"
              value={row}
              onChange={(e) =>
                setRows((p) => p.map((r, idx) => (idx === i ? e.target.value : r)))
              }
              placeholder="@naval or https://linkedin.com/in/…"
            />
            {rows.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Remove account"
                className="text-muted-foreground hover:text-destructive"
                onClick={() => setRows((p) => p.filter((_, idx) => idx !== i))}
              >
                <Trash2 className="size-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
      {rows.length < MAX && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-1 gap-1.5"
          onClick={() => setRows((p) => [...p, ""])}
        >
          <Plus className="size-4" /> Add account
        </Button>
      )}
    </div>
  );
}
