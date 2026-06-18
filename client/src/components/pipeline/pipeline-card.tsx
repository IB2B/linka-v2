"use client";

import type { Opportunity } from "@/types/pipeline";
import { PipelinePlatformPill } from "./pipeline-platform-pill";
import { PipelineCardMenu } from "./pipeline-card-menu";
import { formatAge } from "./format-age";
import { formatMoney } from "./format-money";

type Props = {
  opp: Opportunity;
  isDragging: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onDropBefore: (id: string) => void;
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
};

export function PipelineCard({
  opp, isDragging, onDragStart, onDragEnd, onDropBefore, onClick, onDelete,
}: Props) {
  return (
    <div
      role="button"
      tabIndex={0}
      draggable
      onDragStart={(e) => { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", opp.id); onDragStart(opp.id); }}
      onDragEnd={onDragEnd}
      onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }}
      onDrop={(e) => { e.preventDefault(); e.stopPropagation(); onDropBefore(opp.id); }}
      onClick={() => onClick(opp.id)}
      onKeyDown={(e) => e.key === "Enter" && onClick(opp.id)}
      className={`group/card relative mb-2 w-full cursor-pointer rounded-lg border bg-card p-3 text-left shadow-sm transition-all hover:border-foreground/20 hover:shadow ${
        isDragging ? "opacity-40" : ""
      }`}
    >
      <div className="absolute right-1.5 top-1.5 opacity-0 transition-opacity group-hover/card:opacity-100">
        <PipelineCardMenu
          opp={opp}
          onOpen={() => onClick(opp.id)}
          onDeleted={() => onDelete(opp.id)}
        />
      </div>
      <h4 className="mb-1.5 line-clamp-2 pr-6 text-sm font-medium leading-snug text-foreground">
        {opp.title}
      </h4>
      {opp.contactName || opp.contactHandle ? (
        <div className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
          {opp.contactName ? <span className="truncate">{opp.contactName}</span> : null}
          {opp.contactName && opp.contactHandle ? <span aria-hidden>·</span> : null}
          {opp.contactHandle ? <span className="truncate">{opp.contactHandle}</span> : null}
        </div>
      ) : null}
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          {opp.sourcePlatform ? <PipelinePlatformPill platform={opp.sourcePlatform} /> : null}
          {opp.valueAmount != null ? (
            <span className="truncate rounded-md bg-foreground/5 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-foreground">
              {formatMoney(opp.valueAmount, opp.valueCurrency)}
            </span>
          ) : null}
        </div>
        <span className="shrink-0 text-[10px] text-muted-foreground" suppressHydrationWarning>
          {formatAge(opp.lastActivityAt ?? opp.createdAt)}
        </span>
      </div>
    </div>
  );
}
