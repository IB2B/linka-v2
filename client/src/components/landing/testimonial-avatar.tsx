import { AVATAR_TINTS } from "./testimonials-data";

/** Initials on a muted disc. Real customers don't come with matching
 *  rainbow gradients, and stock-looking ones read as filler. */
export function TestimonialAvatar({ name }: { name: string }) {
  const tint = AVATAR_TINTS[name.charCodeAt(0) % AVATAR_TINTS.length];
  const initials = name.replace(/[^A-Za-z ]/g, "").split(" ").map((p) => p[0]).join("");
  return (
    <span
      aria-hidden
      className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold tracking-tight ${tint}`}
    >
      {initials}
    </span>
  );
}
