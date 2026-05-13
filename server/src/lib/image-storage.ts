import { mkdir, writeFile, unlink } from "node:fs/promises";
import { join } from "node:path";

const ALLOWED_IMAGE_HOSTS = new Set([
  "oaidalleapiprodscus.blob.core.windows.net",
  "oaidalle.blob.core.windows.net",
  "api.openai.com",
  "cdn.openai.com",
  "imagine.imagineapi.dev",
]);

const IMAGES_DIR = join(process.cwd(), "uploads", "images");
const PUBLIC_PREFIX = "/uploads/images";

async function bytesFromSource(source: string): Promise<Buffer> {
  if (source.startsWith("data:")) {
    const comma = source.indexOf(",");
    if (comma < 0) throw new Error("Malformed data URL");
    return Buffer.from(source.slice(comma + 1), "base64");
  }
  const parsed = new URL(source);
  if (parsed.protocol !== "https:" || !ALLOWED_IMAGE_HOSTS.has(parsed.hostname)) {
    throw new Error(`Image source host not allowed: ${parsed.hostname}`);
  }
  const res = await fetch(source, { signal: AbortSignal.timeout(60_000) });
  if (!res.ok) throw new Error(`Image fetch ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

// Persists image bytes to disk and returns a short public path suitable for
// storing in the DB. Accepts either a data: URL (gpt-image-1) or http(s) URL
// (dall-e-3).
export async function persistGeneratedImage(
  contentId: string, source: string,
): Promise<string> {
  const bytes = await bytesFromSource(source);
  await mkdir(IMAGES_DIR, { recursive: true });
  const filename = `${contentId}.png`;
  await writeFile(join(IMAGES_DIR, filename), bytes);
  return `${PUBLIC_PREFIX}/${filename}`;
}

export async function deleteGeneratedImage(publicPath: string): Promise<void> {
  if (!publicPath.startsWith(`${PUBLIC_PREFIX}/`)) return;
  const filename = publicPath.slice(PUBLIC_PREFIX.length + 1);
  if (!/^[\w.-]+$/.test(filename)) return;
  await unlink(join(IMAGES_DIR, filename)).catch(() => {});
}
