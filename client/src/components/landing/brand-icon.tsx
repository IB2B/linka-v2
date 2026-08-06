import { BRAND_PATHS } from "./brand-paths";

type Props = {
  id: keyof typeof BRAND_PATHS | (string & {});
  className?: string;
  /** Drawn as a monogram when the brand has no icon path. */
  label?: string;
};

export function BrandIcon({ id, className, label }: Props) {
  const d = BRAND_PATHS[id];
  if (!d) {
    if (!label) return null;
    return (
      <span aria-hidden className="text-[15px] font-semibold tracking-tight">
        {label.slice(0, 1).toUpperCase()}
      </span>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-hidden
      fill="currentColor"
      className={className}
    >
      <path d={d} />
    </svg>
  );
}
