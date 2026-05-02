import { PLATFORMS } from "@/lib/zernio/platforms";

export function platformColor(slug: string): string | null {
  return PLATFORMS.find((p) => p.slug === slug)?.color ?? null;
}
