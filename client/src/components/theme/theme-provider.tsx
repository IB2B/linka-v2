"use client";

import { useCallback, useEffect, useState } from "react";

import { ThemeContext, type Theme } from "./theme-context";
import { THEME_COOKIE, parseTheme, writeThemeCookie } from "./theme-cookie";

type Props = {
  children: React.ReactNode;
  // Read from the cookie by the root layout, which already set <html class>.
  initialTheme: Theme;
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

export function ThemeProvider({ children, initialTheme, disableTransitionOnChange = false }: Props) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  const setTheme = useCallback((next: Theme) => {
    if (disableTransitionOnChange) killTransitions();
    writeThemeCookie(next);
    applyTheme(next);
    setThemeState(next);
  }, [disableTransitionOnChange]);

  useEffect(() => {
    // The choice used to live in localStorage; move it to the cookie once.
    const saved = parseTheme(localStorage.getItem(THEME_COOKIE));
    if (saved) {
      localStorage.removeItem(THEME_COOKIE);
      setTheme(saved);
    } else if (initialTheme === "system") {
      // The server may have guessed without the colour-scheme hint.
      applyTheme("system");
    }
  }, [initialTheme, setTheme]);

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
