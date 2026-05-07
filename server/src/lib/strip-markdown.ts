export function stripMarkdown(s: string): string {
  if (!s) return s;
  return s
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/\*\*(.+?)\*\*/gs, "$1")
    .replace(/__(.+?)__/gs, "$1")
    .replace(/(^|[\s(])\*(\S(?:.*?\S)?)\*(?=[\s.,!?)]|$)/gs, "$1$2")
    .replace(/(^|[\s(])_(\S(?:.*?\S)?)_(?=[\s.,!?)]|$)/gs, "$1$2")
    .replace(/~~(.+?)~~/gs, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1 $2");
}
