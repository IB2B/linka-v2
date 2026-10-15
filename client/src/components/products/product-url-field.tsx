"use client";

import { useTransition } from "react";
import { Globe } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { importProductAction } from "@/app/dashboard/settings/product-actions";
import { normalizeUrl } from "@/lib/content/normalize-url";
import type { ProductDraft } from "@/types/product";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onFill: (fields: Partial<ProductDraft>) => number;
};

// The website link, with "Fill from site": the AI reads the page and fills
// only the fields that are still empty.
export function ProductUrlField({ value, onChange, onFill }: Props) {
  const [pending, start] = useTransition();
  const url = normalizeUrl(value);
  // The field shows only the address; "https://" is a fixed prefix the user can't edit.
  const host = value.replace(/^https?:\/\//i, "");

  function onHostChange(raw: string) {
    const rest = raw.trimStart().replace(/^https?:\/\//i, "");
    onChange(rest ? `https://${rest}` : "");
  }

  function fill() {
    onChange(url);
    start(async () => {
      const res = await importProductAction(url);
      if (res.error || !res.fields) { toast.error(res.error ?? "Couldn't read that website."); return; }
      const n = onFill(res.fields);
      toast.success(n > 0 ? `Filled ${n} fields from your site. Check them before saving.` : "Nothing new to fill in.");
    });
  }

  return (
    <div className="space-y-1.5">
      <Label htmlFor="url">Website link</Label>
      <div className="flex gap-2">
        <div className="flex min-w-0 flex-1">
          <span aria-hidden className="inline-flex select-none items-center rounded-l-lg border border-r-0 border-input bg-muted px-2.5 text-sm text-muted-foreground">
            https://
          </span>
          <Input id="url" inputMode="url" maxLength={490} placeholder="yourapp.com"
            className="rounded-l-none" aria-label="Website link, starting with https://"
            value={host} onChange={(e) => onHostChange(e.target.value)} disabled={pending} />
        </div>
        <Button type="button" variant="outline" className="shrink-0" onClick={fill}
          disabled={pending || !url}>
          {pending ? <Spinner aria-hidden /> : <Globe />}
          {pending ? "Reading your site…" : "Fill from site"}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Add your link and press Fill: the AI reads your site and fills the empty fields below.
      </p>
    </div>
  );
}
