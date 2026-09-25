import type { Theme } from "./theme-context";

// The theme lives in a cookie so the root layout can render <html class="dark">
// on the server. No bootstrap script is needed, so there is no flash and no
// <script> inside the React tree (React warns about those).
export const THEME_COOKIE = "theme";
export const DEFAULT_THEME: Theme = "dark";
const ONE_YEAR = 60 * 60 * 24 * 365;

export function parseTheme(raw: string | null | undefined): Theme | null {
  return raw === "light" || raw === "dark" || raw === "system" ? raw : null;
}

// "system" can only be known on the server when the browser sends the
// Sec-CH-Prefers-Color-Scheme hint (Chromium does); otherwise assume dark and
// let the provider correct it after hydration.
export function isDarkOnServer(theme: Theme, colorSchemeHint: string | null): boolean {
  if (theme === "system") return colorSchemeHint !== "light";
  return theme === "dark";
}

export function writeThemeCookie(theme: Theme): void {
  document.cookie = `${THEME_COOKIE}=${theme}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
}
