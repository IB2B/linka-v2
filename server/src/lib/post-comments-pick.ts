import type { RawCommentFrom } from "./late-comments";

export function pickAvatar(...fs: (RawCommentFrom | undefined)[]): string | null {
  for (const f of fs) {
    const a = f && (f.picture || f.profilePicture || f.avatar
      || f.imageUrl || f.profilePicUrl);
    if (a) return a;
  }
  return null;
}

export function pickName(...fs: (RawCommentFrom | undefined)[]): string {
  for (const f of fs) {
    const n = f && (f.name || f.displayName || f.username);
    if (n) return n;
  }
  return "Unknown";
}
