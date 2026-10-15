"use client";

import { InstructionTextarea } from "@/components/settings/instruction-textarea";
import type { ProductSectionMeta } from "./product-sections";
import type { ProductDraft, ProductField } from "@/types/product";

type Props = {
  section: ProductSectionMeta;
  draft: ProductDraft;
  onChange: (field: ProductField, value: string) => void;
};

// One titled group of product fields in the sheet.
export function ProductSectionFields({ section, draft, onChange }: Props) {
  return (
    <fieldset className="space-y-4">
      <legend className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {section.title}
      </legend>
      {section.fields.map((f) => (
        <InstructionTextarea key={f.name} field={f} rows={f.rows} required={f.required}
          value={draft[f.name]} onChange={(v) => onChange(f.name, v)} />
      ))}
    </fieldset>
  );
}
