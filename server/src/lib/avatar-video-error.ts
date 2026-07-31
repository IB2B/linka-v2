import { HeygenError, HeygenRenderError } from "./heygen-api";
import { WalletEmptyError } from "./heygen-wallet";

// video_error is rendered in the UI, so never leak the provider's name or raw
// status codes to the person who just clicked "generate".
const UNAVAILABLE =
  "Video generation is temporarily unavailable. The team has been notified.";

// An accepted render fails for our reasons (no credit) or the script's. Only the
// second kind is worth a retry, so don't invite one for the first.
const OUT_OF_CREDIT = "MOVIO_PAYMENT_INSUFFICIENT_CREDIT";

export function avatarUserMessage(err: unknown): string {
  // Our billing problem, not theirs — don't tell users to top up something they
  // have no way to top up.
  if (err instanceof WalletEmptyError) return UNAVAILABLE;
  if (err instanceof HeygenRenderError) {
    if (err.code === OUT_OF_CREDIT) return UNAVAILABLE;
    return "The video could not be rendered. Try again.";
  }
  if (err instanceof HeygenError) {
    if (err.status === 402) return UNAVAILABLE;
    if (err.status === 429) return "Too many videos at once — try again in a minute.";
    if (err.status === 401) return "Video service not configured. Contact support.";
    return "The video service could not render this. Try again.";
  }
  return err instanceof Error ? err.message : "Unknown avatar error";
}
