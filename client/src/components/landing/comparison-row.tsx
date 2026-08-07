import { Check } from "lucide-react";

import { LANE } from "./comparison-lane";
import type { ComparisonRow as Row } from "./comparison.types";

const CELL = "px-4 py-3.5 text-[13.5px] tracking-tight";

type Props = { row: Row; first: boolean; last: boolean };

/** The four cells of one row, as direct grid children so the Linka column
 *  reads as one continuous lane rather than four boxed cells. */
export function ComparisonRow({ row, first, last }: Props) {
  const rule = first ? "" : "border-t border-[#EFEFEF]";
  return (
    <>
      <span className={`${CELL} ${rule} font-medium text-[#0F1113]`}>{row.label}</span>
      <span
        className={`${CELL} ${LANE} ${last ? "rounded-b-xl border-b" : ""} flex items-start gap-1.5 border-t border-t-[#6D5FF9]/12 font-medium text-[#0F1113]`}
      >
        <Check className="mt-[3px] size-3.5 shrink-0 text-[#6D5FF9]" strokeWidth={2.5} />
        {row.linka}
      </span>
      <span className={`${CELL} ${rule} text-[#8A8A8A]`}>{row.agency}</span>
      <span className={`${CELL} ${rule} text-[#8A8A8A]`}>{row.diy}</span>
    </>
  );
}
