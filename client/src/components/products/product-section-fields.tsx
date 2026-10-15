"use client";

import { FormField } from "@/components/forms/form-field";
import { InstructionTextarea } from "@/components/settings/instruction-textarea";
import { ProductSectionHeading } from "./product-section-heading";
import type { ProductSectionMeta } from "./product-sections";
import type { ProductDraft, ProductField } from "@/types/product";

type Props = {
  section: ProductSectionMeta;
  draft: ProductDraft;
  onChange: (field: ProductField, value: string) => void;
};

// One titled group of optional product fields: inputs for short answers,
// textareas for anything that runs to a few lines.
export function ProductSectionFields({ section, draft, onChange }: Props) {
  return (
    <section className="space-y-4">
      <ProductSectionHeading title={section.title} description={section.description} />
      {section.fields.map((f) => f.rows ? (
        <InstructionTextarea key={f.name} field={f} rows={f.rows}
          value={draft[f.name]} onChange={(v) => onChange(f.name, v)} />
      ) : (
        <div key={f.name} className="space-y-1.5">
          <FormField id={f.name} label={f.label} placeholder={f.placeholder}
            value={draft[f.name]} onChange={(e) => onChange(f.name, e.target.value)} />
          {f.hint ? <p className="text-xs text-muted-foreground">{f.hint}</p> : null}
        </div>
      ))}
    </section>
  );
}
