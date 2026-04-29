export function platformColorVar(platform: string | null): string {
  if (!platform) return "var(--muted-foreground)";
  switch (platform.toLowerCase()) {
    case "instagram":
      return "var(--platform-instagram)";
    case "facebook":
      return "var(--platform-facebook)";
    case "linkedin":
      return "var(--platform-linkedin)";
    case "tiktok":
      return "var(--platform-tiktok)";
    case "twitter":
    case "x":
      return "var(--platform-twitter)";
    case "threads":
      return "var(--platform-threads)";
    default:
      return "var(--muted-foreground)";
  }
}
