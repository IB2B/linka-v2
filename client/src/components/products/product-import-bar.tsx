"use client";

import { useState, useTransition } from "react";
import { Globe } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { importProductAction } from "@/app/dashboard/settings/product-actions";
import type { ProductDraft } from "@/types/product";

type Props = { initialUrl: string; onFill: (fields: Partial<ProductDraft>) => number };

// "Fill from website": the AI reads the page and fills the empty fields.
export function ProductImportBar({ initialUrl, onFill }: Props) {
  const [url, setUrl] = useState(initialUrl);
  const [pending, start] = useTransition();

  function run() {
    start(async () => {
      const res = await importProductAction(url.trim());
      if (res.error || !res.fields) { toast.error(res.error ?? "Couldn't read that website."); return; }
      const n = onFill(res.fields);
      toast.success(n > 0 ? `Filled ${n} fields from your website. Check them before saving.` : "Nothing new to fill in.");
    });
  }

  return (
    <div className="space-y-2 rounded-lg border bg-muted/30 p-3">
      <p className="text-sm font-medium">Fill from your website</p>
      <p className="text-xs text-muted-foreground">
        Paste your link and the AI fills in the empty fields below. Takes about 20 seconds.
      </p>
      <div className="flex gap-2">
        <Input type="url" value={url} onChange={(e) => setUrl(e.target.value)} disabled={pending}
          placeholder="https://yourapp.com" aria-label="Website to import from" />
        <Button type="button" variant="outline" disabled={pending || !url.trim()} onClick={run}>
          {pending ? <Spinner aria-hidden /> : <Globe />}
          {pending ? "Reading…" : "Fill"}
        </Button>
      </div>
    </div>
  );
}
