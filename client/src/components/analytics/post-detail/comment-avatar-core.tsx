"use client";

import { useState } from "react";

import { hashColor, initials, proxiedAvatar } from "@/lib/analytics/avatar";

type Props = {
  name: string;
  src?: string | null;
  size?: number;
  className?: string;
};

export function CommentAvatarCore({ name, src, size = 36, className }: Props) {
  const [errored, setErrored] = useState(false);
  const showImage = !!src && !errored;
  const dim = { width: size, height: size };

  if (showImage) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={proxiedAvatar(src!)} alt="" loading="lazy" style={dim}
        onError={() => setErrored(true)}
        className={`rounded-full bg-muted object-cover ${className ?? ""}`}
      />
    );
  }
  return (
    <div
      style={{ ...dim, backgroundColor: hashColor(name) }}
      className={`flex items-center justify-center rounded-full text-[11px] font-semibold text-white ${className ?? ""}`}
    >
      {initials(name)}
    </div>
  );
}
