"use client";

import { POST_TYPES } from "@/lib/content/post-types";
import { PostTypeButton } from "./post-type-button";
import type { PostType } from "@/types/content";

type Props = {
  value: PostType;
  onChange: (type: PostType) => void;
  disabled: boolean;
};

export function PostTypeGrid({ value, onChange, disabled }: Props) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{POST_TYPES.length} formats</span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {POST_TYPES.map((meta) => (
          <PostTypeButton
            key={meta.type}
            meta={meta}
            selected={value === meta.type}
            disabled={disabled}
            onClick={() => onChange(meta.type)}
          />
        ))}
      </div>
    </div>
  );
}
