"use client";

import { useCallback, useEffect, useState } from "react";

import { ThemeContext, type Theme } from "./theme-context";
import { THEME_STORAGE_KEY } from "./theme-script";

function parseStoredTheme(raw: string | null): Theme | null {
  return raw === "light" || raw === "dark" || raw === "system" ? raw : null;
}

type Props = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  disableTransitionOnChange?: boolean;
};

function applyTheme(theme: Theme): void {
  const resolved = theme === "system"
    ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : theme;
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

function killTransitions(): void {
  const css = document.createElement("style");
  css.appendChild(document.createTextNode(
    "*,*:before,*:after{transition:none!important;animation-duration:0s!important}",
  ));
  document.head.appendChild(css);
  requestAnimationFrame(() => requestAnimationFrame(() => css.remove()));
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  disableTransitionOnChange = false,
}: Props) {
  const [theme, setThemeState] = useState<Theme | undefined>(undefined);

  useEffect(() => {
    const stored = parseStoredTheme(localStorage.getItem(THEME_STORAGE_KEY)) ?? defaultTheme;
    setThemeState(stored);
  }, [defaultTheme]);

  const setTheme = useCallback((next: Theme) => {
    if (disableTransitionOnChange) killTransitions();
    localStorage.setItem(THEME_STORAGE_KEY, next);
    applyTheme(next);
    setThemeState(next);
  }, [disableTransitionOnChange]);

  useEffect(() => {
    if (theme !== "system") return;
    const m = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
