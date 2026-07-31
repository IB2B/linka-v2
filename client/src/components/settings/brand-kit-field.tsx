"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ColorSwatchInput } from "./color-swatch-input";
import { BrandLogoField } from "./brand-logo-field";
import type { BrandKit } from "@/lib/content/platform-instructions.types";

// Narrower than keyof BrandKit, which now also covers the logo's boolean and
// placement — a swatch only ever renders a hex string.
type ColourKey = "primary" | "secondary" | "accent" | "background" | "text";

const COLOURS: { name: string; key: ColourKey; label: string }[] = [
  { name: "bkPrimary", key: "primary", label: "Primary" },
  { name: "bkSecondary", key: "secondary", label: "Secondary" },
  { name: "bkAccent", key: "accent", label: "Accent" },
  { name: "bkBackground", key: "background", label: "Background" },
  { name: "bkText", key: "text", label: "Text" },
];

export function BrandKitField({ kit }: { kit: BrandKit }) {
  return (
    <div className="space-y-4 rounded-lg border border-border/60 p-4">
      <div className="space-y-1">
        <Label>Brand kit</Label>
        <p className="text-xs text-muted-foreground">
          Exact colours steer the generated images &amp; videos. Font names are
          saved for branded text designs (coming soon).
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {COLOURS.map((c) => (
          <ColorSwatchInput
            key={c.name} name={c.name} label={c.label} defaultValue={kit[c.key]}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="bkHeadingFont" className="text-xs">Heading font</Label>
          <Input id="bkHeadingFont" name="bkHeadingFont"
            defaultValue={kit.headingFont ?? ""} placeholder="Inter" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="bkBodyFont" className="text-xs">Body font</Label>
          <Input id="bkBodyFont" name="bkBodyFont"
            defaultValue={kit.bodyFont ?? ""} placeholder="Georgia" />
        </div>
      </div>
      <BrandLogoField kit={kit} />
    </div>
  );
}
