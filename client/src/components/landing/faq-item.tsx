import { Plus } from "lucide-react";
import type { Faq } from "./faq-data";

export function FaqItem({ faq }: { faq: Faq }) {
  return (
    <details className="group border-t border-[#E5E5E5] py-2 last:border-b">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[16px] font-medium text-[#0F1113] [&::-webkit-details-marker]:hidden">
        {faq.q}
        <Plus className="size-4 shrink-0 text-[#737373] transition group-open:rotate-45 group-open:text-[#6D5FF9]" />
      </summary>
      <p className="pb-5 pr-8 text-[14px] leading-[1.6] text-[#525252]">{faq.a}</p>
    </details>
  );
}
