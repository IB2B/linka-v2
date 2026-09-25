import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { withSentryConfig } from "@sentry/nextjs";

const API_URL = process.env.API_URL ?? "http://localhost:4000";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  typescript: { ignoreBuildErrors: true },
  experimental: {
    serverActions: { bodySizeLimit: "5mb" },
  },
  // Lets Chromium send the OS colour scheme, so the "System" theme renders
  // right on the server with no bootstrap script.
  async headers() {
    return [{
      source: "/:path*",
      headers: [{ key: "Accept-CH", value: "Sec-CH-Prefers-Color-Scheme" }],
    }];
  },
  async rewrites() {
    return [
      { source: "/api/:path*", destination: `${API_URL}/api/:path*` },
      { source: "/uploads/:path*", destination: `${API_URL}/uploads/:path*` },
    ];
  },
};

export default withSentryConfig(withNextIntl(nextConfig), {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  tunnelRoute: "/monitoring",
  disableLogger: true,
});
