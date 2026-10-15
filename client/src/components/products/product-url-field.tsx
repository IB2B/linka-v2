"use client";

import { useTransition } from "react";
import { Globe } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { importProductAction } from "@/app/dashboard/settings/product-actions";
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

  function fill() {
    start(async () => {
      const res = await importProductAction(value.trim());
      if (res.error || !res.fields) { toast.error(res.error ?? "Couldn't read that website."); return; }
      const n = onFill(res.fields);
      toast.success(n > 0 ? `Filled ${n} fields from your site. Check them before saving.` : "Nothing new to fill in.");
    });
  }

  return (
    <div className="space-y-1.5">
      <Label htmlFor="url">Website link</Label>
      <div className="flex gap-2">
        <Input id="url" type="url" maxLength={500} placeholder="https://yourapp.com"
          value={value} onChange={(e) => onChange(e.target.value)} disabled={pending} />
        <Button type="button" variant="outline" className="shrink-0" onClick={fill}
          disabled={pending || !/^https?:\/\/\S+\.\S+/.test(value.trim())}>
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
