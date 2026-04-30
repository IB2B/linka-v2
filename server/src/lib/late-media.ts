import { readFile } from "node:fs/promises";
import { join, basename } from "node:path";
import { lateFetch } from "./late-api";

type Presign = { uploadUrl: string; publicUrl: string };

export async function uploadLocalImageToLate(
  publicPath: string,
): Promise<string> {
  const filename = basename(publicPath);
  const diskPath = join(process.cwd(), publicPath.replace(/^\//, ""));
  const bytes = await readFile(diskPath);
  const fileType = filename.endsWith(".png") ? "image/png" : "image/jpeg";

  const presign = await lateFetch<Presign>("/media/presign", {
    method: "POST",
    body: JSON.stringify({ filename, contentType: fileType }),
  });

  const put = await fetch(presign.uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": fileType },
    body: bytes,
  });
  if (!put.ok) {
    throw new Error(`Late media PUT failed ${put.status}`);
  }
  return presign.publicUrl;
}

export async function resolvePublicImageUrl(
  imageUrl: string | null,
): Promise<string | null> {
  if (!imageUrl) return null;
  if (/^https:\/\//i.test(imageUrl)) return imageUrl;
  if (imageUrl.startsWith("/uploads/")) return uploadLocalImageToLate(imageUrl);
  return null;
}
