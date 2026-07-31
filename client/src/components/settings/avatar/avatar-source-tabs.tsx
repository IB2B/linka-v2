"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { SegmentedChoice } from "@/components/generate/segmented-choice";
import { AvatarCardGrid } from "./avatar-card-grid";
import { AvatarGroupGrid } from "./avatar-group-grid";
import type { AvatarGroup, AvatarOption } from "@/types/avatar-settings";

const SOURCES = [
  { value: "mine" as const, label: "My avatars" },
  { value: "stock" as const, label: "Stock library" },
];

type Props = {
  groups: AvatarGroup[];
  looks: AvatarOption[];
  stock: AvatarOption[];
  selectedId: string | null;
  onSelect: (o: AvatarOption) => void;
  onOpenGroup: (id: string) => void;
  onSearch: (q: string) => void;
};

export function AvatarSourceTabs({
  groups, looks, stock, selectedId, onSelect, onOpenGroup, onSearch,
}: Props) {
  const [source, setSource] = useState<"mine" | "stock">(
    groups.length > 0 ? "mine" : "stock",
  );
  const [group, setGroup] = useState<string | null>(null);
  const [q, setQ] = useState("");

  function openGroup(id: string) { setGroup(id); onOpenGroup(id); }

  return (
    <div className="space-y-3">
      <SegmentedChoice label="Source" value={source} choices={SOURCES}
        onChange={setSource} />

      {source === "mine" ? (
        <>
          <AvatarGroupGrid groups={groups} activeId={group} onOpen={openGroup} />
          {group === null ? (
            <p className="text-sm text-muted-foreground">
              Pick a person above to see their looks.
            </p>
          ) : (
            <AvatarCardGrid options={looks} selectedId={selectedId}
              onSelect={onSelect} />
          )}
        </>
      ) : (
        <>
          <Input value={q} placeholder="Search the stock library…"
            onChange={(e) => { setQ(e.target.value); onSearch(e.target.value); }} />
          <AvatarCardGrid options={stock} selectedId={selectedId}
            onSelect={onSelect} />
        </>
      )}
    </div>
  );
}
