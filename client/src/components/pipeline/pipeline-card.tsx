"use client";

import type { Opportunity } from "@/types/pipeline";
import { PipelinePlatformPill } from "./pipeline-platform-pill";
import { formatAge } from "./format-age";

type Props = {
  opp: Opportunity;
  isDragging: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onDropBefore: (id: string) => void;
  onClick: (id: string) => void;
};

export function PipelineCard({
  opp, isDragging, onDragStart, onDragEnd, onDropBefore, onClick,
}: Props) {
  return (
    <button
      type="button"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", opp.id);
        onDragStart(opp.id);
      }}
      onDragEnd={onDragEnd}
      onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }}
      onDrop={(e) => { e.preventDefault(); e.stopPropagation(); onDropBefore(opp.id); }}
      onClick={() => onClick(opp.id)}
      className={`group/card mb-2 w-full rounded-lg border bg-card p-3 text-left shadow-sm transition-all hover:border-foreground/20 hover:shadow ${
        isDragging ? "opacity-40" : ""
      }`}
    >
      <h4 className="mb-1.5 line-clamp-2 text-sm font-medium leading-snug text-foreground">
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
        {opp.sourcePlatform ? (
          <PipelinePlatformPill platform={opp.sourcePlatform} />
        ) : <span />}
        <span className="text-[10px] text-muted-foreground">
          {formatAge(opp.lastActivityAt ?? opp.createdAt)}
        </span>
      </div>
    </button>
  );
}
