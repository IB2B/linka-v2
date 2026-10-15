import sharp from "sharp";
import { dominantBorderColor, edgeSoften, floodBackground } from "./logo-background-pixels";

// Thrown with a message written for the user (e.g. "not a plain background").
export class LogoBackgroundError extends Error {}

const MAX_SIDE = 2000;

// Removes a logo's plain background: finds the colour along the border, clears
// it only where it connects to the border (a white letter inside the mark
// stays, unless `enclosed` asks to clear holes in letters too), softens the cut
// edge, then trims the empty margin. Logos are flat artwork, so this keeps
// every mark pixel exact — unlike an AI cut-out, which redraws the image.
export async function removeLogoBackground(input: Buffer, enclosed = false): Promise<Buffer> {
  const { data, info } = await sharp(input)
    .rotate()
    .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: "inside", withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  const border = dominantBorderColor(data, width, height);
  if (border.transparentShare > 0.6) {
    throw new LogoBackgroundError("This logo already has a transparent background.");
  }
  if (border.share < 0.75) {
    throw new LogoBackgroundError(
      "The background isn't one plain colour, so it can't be removed cleanly. Upload a PNG with a transparent background instead.",
    );
  }

  const background = floodBackground(data, width, height, border.color, enclosed);
  if (background.cleared > width * height * 0.97) {
    throw new LogoBackgroundError("Couldn't find the logo on that background.");
  }
  edgeSoften(data, width, height, background.mask, border.color);

  return sharp(data, { raw: { width, height, channels: 4 } })
    .png()
    .trim({ threshold: 0 })
    .toBuffer();
}
