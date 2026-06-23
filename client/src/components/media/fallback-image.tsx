"use client";

import { useState } from "react";
import type { ReactNode } from "react";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
  fallback: ReactNode;
};

// Renders `fallback` when the image fails to load (e.g. the file was wiped
// from disk). Mirrors the onError idiom already used by inbox-avatar.
export function FallbackImage({ src, alt = "", className, loading, fallback }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
