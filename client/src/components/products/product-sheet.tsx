"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FormField } from "@/components/forms/form-field";
import {
  Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { saveProductAction } from "@/app/dashboard/settings/product-actions";
import { PRODUCT_SECTIONS } from "./product-sections";
import { ProductSectionFields } from "./product-section-fields";
import { ProductImportBar } from "./product-import-bar";
import { ProductKnowledgeField } from "./product-knowledge-field";
import { useProductDraft } from "./use-product-draft";
import type { Product } from "@/types/product";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // null = add a new product.
  product: Product | null;
  onSaved?: (id: string) => void;
};

export function ProductSheet({ open, onOpenChange, product, onSaved }: Props) {
  const router = useRouter();
  const { draft, set, fill } = useProductDraft(product);
  const [pending, start] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    start(async () => {
      const res = await saveProductAction(product?.id ?? null, draft);
      if (res.error) { toast.error(res.error); return; }
      toast.success(product ? "Product updated." : "Product saved.");
      onOpenChange(false);
      router.refresh();
      onSaved?.(res.id ?? product?.id ?? "");
    });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 p-0 sm:max-w-xl data-[side=right]:sm:max-w-xl">
        <SheetHeader className="border-b p-5">
          <SheetTitle>{product ? `Edit ${product.name}` : "Add a product"}</SheetTitle>
          <SheetDescription>
            The more the AI knows, the better your promo posts. Only name and pitch are required.
          </SheetDescription>
        </SheetHeader>
        <form id="product-form" onSubmit={onSubmit} className="flex-1 space-y-8 overflow-y-auto p-5">
          <ProductImportBar initialUrl={draft.url} onFill={fill} />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField id="name" label="Product name" required maxLength={120} placeholder="Linka"
              value={draft.name} onChange={(e) => set("name", e.target.value)} />
            <FormField id="url" type="url" label="Website link" maxLength={500} placeholder="https://yourapp.com"
              value={draft.url} onChange={(e) => set("url", e.target.value)} />
          </div>
          {PRODUCT_SECTIONS.map((s) => (
            <ProductSectionFields key={s.title} section={s} draft={draft} onChange={set} />
          ))}
          <ProductKnowledgeField value={draft.knowledge} onChange={(v) => set("knowledge", v)} />
        </form>
        <SheetFooter className="flex-row justify-end border-t p-4">
          <SheetClose render={<Button variant="outline" disabled={pending} />}>Cancel</SheetClose>
          <Button type="submit" form="product-form" disabled={pending}>
            {pending ? <Spinner aria-hidden /> : null}
            {product ? "Save changes" : "Save product"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
