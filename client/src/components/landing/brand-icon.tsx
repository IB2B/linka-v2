import { BRAND_PATHS } from "./brand-paths";

type Props = {
  id: keyof typeof BRAND_PATHS | (string & {});
  className?: string;
};

export function BrandIcon({ id, className }: Props) {
  const d = BRAND_PATHS[id];
  if (!d) return null;
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
