"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { LogoPlacementSelect } from "./logo-placement-select";
import type { BrandKit } from "@/lib/content/platform-instructions.types";

// The file uploads on pick and the returned path rides along in a hidden input,
// so the logo is only committed when the surrounding brand kit form is saved.
export function BrandLogoField({ kit }: { kit: BrandKit }) {
  const [url, setUrl] = useState(kit.logoUrl ?? "");
  const [busy, setBusy] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setBusy(true);
    const body = new FormData();
    body.append("logo", file);
    const res = await fetch("/api/users/me/brand-logo", { method: "POST", body });
    const json = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) { toast.error(json.error ?? "Upload failed."); return; }
    setUrl(json.url);
  }

  return (
    <div className="space-y-3 border-t border-border/60 pt-4">
      <input type="hidden" name="bkLogoUrl" value={url} />
      <div className="flex flex-wrap items-center gap-3">
        {url ? (
          // Checkerboard so a transparent PNG reads as transparent rather than
          // looking like it has a white background baked in.
          <span className="flex size-14 items-center justify-center rounded-md border bg-[repeating-conic-gradient(theme(colors.muted)_0_25%,transparent_0_50%)] bg-[length:12px_12px] p-1">
            <img src={url} alt="Brand logo" className="max-h-full max-w-full object-contain" />
          </span>
        ) : null}
        <Button type="button" variant="outline" size="sm" disabled={busy}
          onClick={() => input.current?.click()}>
          {busy ? <Spinner aria-hidden /> : null}
          {url ? "Replace logo" : "Upload logo"}
        </Button>
        {url ? (
          <Button type="button" variant="ghost" size="sm" onClick={() => setUrl("")}>
            Remove
          </Button>
        ) : null}
        <input ref={input} type="file" accept="image/png,image/webp,image/jpeg"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void upload(f);
            e.target.value = "";
          }} />
      </div>
      <p className="text-xs text-muted-foreground">
        PNG with a transparent background works best — up to 2 MB.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <Label className="flex items-center gap-2 text-sm font-normal">
          <Checkbox name="bkLogoOnImages" defaultChecked={kit.logoOnImages} />
          Add my logo to every generated image
        </Label>
        <LogoPlacementSelect defaultValue={kit.logoPlacement} />
      </div>
    </div>
  );
}
