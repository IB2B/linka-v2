import { THEME_BOOTSTRAP_SCRIPT } from "@/components/theme/theme-script";

// Served as a real file so the root layout can load it with
// strategy="beforeInteractive" (docs pair that strategy with `src` only —
// an inline script there renders a <script> tag inside the React tree).
export const dynamic = "force-static";

export function GET(): Response {
  return new Response(THEME_BOOTSTRAP_SCRIPT, {
    headers: {
      "Content-Type": "text/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
