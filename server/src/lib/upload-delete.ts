import { unlink } from "node:fs/promises";
import { join } from "node:path";

const UPLOADS_DIR = join(process.cwd(), "uploads");
const SAFE_PATH = /^\/uploads\/(avatars|images|posts|logos|support|inbox)\/([\w-][\w.-]*)$/;

// Removes one file under /uploads. Anything that is not a plain file in a known
// upload folder (remote CDN URLs, traversal attempts) is ignored, and a file
// that is already gone counts as deleted.
export async function deleteUpload(publicPath: string): Promise<void> {
  const m = SAFE_PATH.exec(publicPath);
  if (!m) return;
  await unlink(join(UPLOADS_DIR, m[1], m[2])).catch((e: NodeJS.ErrnoException) => {
    if (e.code !== "ENOENT") throw e;
  });
}
