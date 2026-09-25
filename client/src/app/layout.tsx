import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { Inter, IBM_Plex_Mono, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme/theme-provider";
import {
  DEFAULT_THEME, THEME_COOKIE, isDarkOnServer, parseTheme,
} from "@/components/theme/theme-cookie";
import "./globals.css";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
const geistMono = Geist_Mono({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const TITLE = "linka.studio — one idea in, ten native posts out";
const DESCRIPTION =
  "Linka writes in your voice, rewrites every idea for the platform it's going to, generates the image or avatar video, and publishes to 10 platforms in 23 languages.";

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_APP_URL
    ? new URL(process.env.NEXT_PUBLIC_APP_URL)
    : undefined,
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "linka.studio",
  openGraph: {
    type: "website",
    siteName: "linka.studio",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [locale, messages, cookieStore, hdrs] = await Promise.all([
    getLocale(), getMessages(), cookies(), headers(),
  ]);
  const theme = parseTheme(cookieStore.get(THEME_COOKIE)?.value) ?? DEFAULT_THEME;
  const dark = isDarkOnServer(theme, hdrs.get("sec-ch-prefers-color-scheme"));
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${dark ? "dark " : ""}${inter.variable} ${plexMono.variable} ${geistMono.variable} h-full antialiased tracking-tight`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider initialTheme={theme} disableTransitionOnChange>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster position="top-right" richColors closeButton />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
