import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { LOGO_DIR } from "./logo-upload";
import type { LogoPlacement } from "./brand-kit";

export type LogoOverlay = { url: string; placement: LogoPlacement };

const PUBLIC_PREFIX = "/uploads/logos";
// A mark should read as a signature, not a billboard. An eighth of the width
// stays legible at feed size without competing with the picture.
const WIDTH_RATIO = 0.125;
const MARGIN_RATIO = 0.04;
const ALPHA = Math.round(0.85 * 255);

// Same containment check as deleteGeneratedImage: the path comes out of the
// database, so it is treated as untrusted until it resolves inside LOGO_DIR.
function logoPath(publicPath: string): string | null {
  if (!publicPath.startsWith(`${PUBLIC_PREFIX}/`)) return null;
  const name = publicPath.slice(PUBLIC_PREFIX.length + 1);
  return /^[\w.-]+$/.test(name) ? join(LOGO_DIR, name) : null;
}

// Knocks the logo back to 85% so it sits on the photo instead of on top of it.
// dest-in keeps the mark's own shape and multiplies its alpha by the tile's.
async function fade(logo: Buffer, width: number): Promise<Buffer> {
  return sharp(logo)
    .resize({ width, fit: "inside", withoutEnlargement: false })
    .ensureAlpha()
    .composite([{
      input: Buffer.from([255, 255, 255, ALPHA]),
      raw: { width: 1, height: 1, channels: 4 },
      tile: true,
      blend: "dest-in",
    }])
    .png()
    .toBuffer();
}

// Returns the original bytes untouched on any failure — a missing or corrupt
// logo must never cost the user the image they actually waited for.
export async function applyLogo(
  image: Buffer, logo: LogoOverlay,
): Promise<Buffer> {
  try {
    const file = logoPath(logo.url);
    if (!file) return image;

    const base = sharp(image);
    const { width, height } = await base.metadata();
    if (!width || !height) return image;

    const mark = await fade(await readFile(file), Math.round(width * WIDTH_RATIO));
    const size = await sharp(mark).metadata();
    const margin = Math.round(width * MARGIN_RATIO);

    return await base.composite([{
      input: mark,
      top: logo.placement.startsWith("top")
        ? margin : height - (size.height ?? 0) - margin,
      left: logo.placement.endsWith("left")
        ? margin : width - (size.width ?? 0) - margin,
    }]).png().toBuffer();
  } catch (err) {
    console.error("[watermark] skipped:", err);
    return image;
  }
}
