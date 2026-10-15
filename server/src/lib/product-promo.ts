import type { Product } from "../models/product.model";

// One is picked per post so a feed of promos doesn't read like the same ad.
export const PROMO_ANGLES = [
  "Start from a painful, specific problem the audience has, then show how the product removes it.",
  "Spotlight one single feature: what it does, a concrete moment it saves, nothing else.",
  "Tell a short customer-style story: who they are, what was hard, what changed after using it.",
  "Frame it as a before/after: how the task looked without the product and how it looks now.",
  "Share why the product was built: the frustration or insight behind it, told as a founder.",
  "Give a quick, genuinely useful tip in the product's area, and show the product as the easy way to do it.",
];

export function pickAngle(): string {
  return PROMO_ANGLES[Math.floor(Math.random() * PROMO_ANGLES.length)];
}

// Instagram captions don't make links clickable, so the CTA points to the bio.
function linkRule(product: Product, platform: string): string {
  if (!product.url) return "There is no link; end with the call to action only.";
  if (platform === "instagram") return 'Do not paste the link; say "link in bio" instead.';
  return `Put this link once, on its own line near the end: ${product.url}`;
}

// Each platform gets its own angle, so a multi-platform batch isn't one ad five times.
export function promoFor(product: Product | null | undefined, platform: string): string | undefined {
  return product ? promoBlock(product, platform, pickAngle()) : undefined;
}

export function promoBlock(product: Product, platform: string, angle: string): string {
  const lines = [
    `This post promotes the author's product. Product: ${product.name} — ${product.pitch}`,
    product.audience ? `It is for: ${product.audience}.` : "",
    product.features ? `Key features and benefits:\n${product.features}` : "",
    `Angle for this post: ${angle}`,
    "Rules: lead with the reader's problem or a story, not the product name. Mention the product by name once or twice, naturally. "
      + "Sound like a person recommending something they built, not an ad: no hype words, no exclamation-mark selling, no fake urgency. "
      + "Only claim what the details above support.",
    `Close with this call to action instead of a question: ${product.cta || `try ${product.name}`}. ${linkRule(product, platform)}`,
  ];
  return lines.filter(Boolean).join("\n");
}
