"use client";

import { FormField } from "@/components/forms/form-field";
import { InstructionTextarea } from "@/components/settings/instruction-textarea";
import { PRODUCT_TEXT_FIELDS } from "./product-fields";
import type { Product } from "@/types/product";

type Props = {
  product: Product | null;
  formRef: React.RefObject<HTMLFormElement | null>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

// The fields for one product; the dialog owns submit and the buttons.
export function ProductForm({ product, formRef, onSubmit }: Props) {
  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="name" name="name" label="Product name" required maxLength={120}
          defaultValue={product?.name ?? ""} placeholder="Linka" />
        <FormField id="url" name="url" type="url" label="Website link" maxLength={500}
          defaultValue={product?.url ?? ""} placeholder="https://yourapp.com" />
      </div>
      {PRODUCT_TEXT_FIELDS.map((f) => (
        <InstructionTextarea key={f.name} field={f} rows={f.rows} required={f.required}
          defaultValue={(product?.[f.name as keyof Product] as string | null) ?? ""} />
      ))}
    </form>
  );
}
