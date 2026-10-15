"use client";

import { FormField } from "@/components/forms/form-field";
import { InstructionTextarea } from "@/components/settings/instruction-textarea";
import { ProductSectionHeading } from "./product-section-heading";
import { ProductUrlField } from "./product-url-field";
import type { ProductDraft, ProductField } from "@/types/product";

const PITCH = {
  name: "pitch",
  label: "One-line pitch",
  placeholder: "Linka writes your social posts in your own voice.",
};

type Props = {
  draft: ProductDraft;
  onChange: (field: ProductField, value: string) => void;
  onFill: (fields: Partial<ProductDraft>) => number;
};

// The required part of a product: name, link (with website import) and pitch.
export function ProductBasics({ draft, onChange, onFill }: Props) {
  return (
    <section className="space-y-4">
      <ProductSectionHeading title="The basics"
        description="Name and pitch are required. Start with your link to fill the rest for you." />
      <ProductUrlField value={draft.url} onChange={(v) => onChange("url", v)} onFill={onFill} />
      <FormField id="name" label="Product name" required maxLength={120} placeholder="Linka"
        value={draft.name} onChange={(e) => onChange("name", e.target.value)} />
      <InstructionTextarea field={PITCH} rows={2} required
        value={draft.pitch} onChange={(v) => onChange("pitch", v)} />
    </section>
  );
}
