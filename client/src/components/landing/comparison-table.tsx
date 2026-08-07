import { ComparisonRow } from "./comparison-row";
import { LANE } from "./comparison-lane";
import type { ComparisonRow as Row } from "./comparison.types";

type Props = { rows: Row[]; colAgency: string; colDiy: string };

const HEAD = "px-4 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em]";

export function ComparisonTable({ rows, colAgency, colDiy }: Props) {
  return (
    <div className="-mx-6 overflow-x-auto px-6 pb-1">
      <div className="grid min-w-180 grid-cols-[1.3fr_1.1fr_1fr_1fr] overflow-hidden rounded-xl bg-white ring-1 ring-[#E9E9E9]">
        <span className={HEAD} />
        <span className={`${HEAD} ${LANE} rounded-t-xl border-t text-[#6D5FF9]`}>
          Linka
        </span>
        <span className={`${HEAD} text-[#A3A3A3]`}>{colAgency}</span>
        <span className={`${HEAD} text-[#A3A3A3]`}>{colDiy}</span>
        {rows.map((r, i) => (
          <ComparisonRow
            key={r.label}
            row={r}
            first={i === 0}
            last={i === rows.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
