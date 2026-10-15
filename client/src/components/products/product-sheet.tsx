"use client";

import { Fragment, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import {
  Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { saveProductAction } from "@/app/dashboard/settings/product-actions";
import { PRODUCT_SECTIONS } from "./product-sections";
import { ProductBasics } from "./product-basics";
import { ProductSectionFields } from "./product-section-fields";
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
      <SheetContent className="w-full gap-0 p-0 data-[side=right]:sm:max-w-2xl">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle>{product ? `Edit ${product.name}` : "Add a product"}</SheetTitle>
          <SheetDescription>The more the AI knows, the better your promo posts.</SheetDescription>
        </SheetHeader>
        <form id="product-form" onSubmit={onSubmit} className="flex-1 space-y-8 overflow-y-auto px-6 py-6">
          <ProductBasics draft={draft} onChange={set} onFill={fill} />
          {PRODUCT_SECTIONS.map((s) => (
            <Fragment key={s.title}>
              <Separator />
              <ProductSectionFields section={s} draft={draft} onChange={set} />
            </Fragment>
          ))}
          <Separator />
          <ProductKnowledgeField value={draft.knowledge} onChange={(v) => set("knowledge", v)} />
        </form>
        <SheetFooter className="flex-row justify-end gap-2 border-t px-6 py-4">
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
