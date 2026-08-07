import { Plus } from "lucide-react";

import type { Faq } from "./faq-data";

export function FaqItem({ faq }: { faq: Faq }) {
  return (
    <details className="group rounded-lg px-4 transition-colors duration-200 open:bg-[#FAFAFB] open:ring-1 open:ring-[#EBEBEF] hover:bg-[#FAFAFB]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[15px] font-medium tracking-tight text-[#0F1113] [&::-webkit-details-marker]:hidden">
        {faq.q}
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-[#E5E5E5] transition group-open:bg-[#6D5FF9] group-open:ring-[#6D5FF9]">
          <Plus className="size-3.5 text-[#737373] transition group-open:rotate-45 group-open:text-white" />
        </span>
      </summary>
      <p className="max-w-[62ch] pb-4 pr-8 text-[14px] leading-[1.65] tracking-tight text-[#525252]">
        {faq.a}
      </p>
    </details>
  );
}
