import { type NextRequest, NextResponse } from "next/server";

import { zernioFetch } from "@/lib/zernio/client";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const code = searchParams.get("code");
  const platform = searchParams.get("platform");

  if (!code || !platform) {
    return NextResponse.redirect(
      new URL("/dashboard/accounts?error=1", req.url)
    );
  }

  try {
    await zernioFetch("/connect/callback", {
      method: "POST",
      body: JSON.stringify({ code, platform }),
    });

    return NextResponse.redirect(
      new URL("/dashboard/settings?connected=1", req.url)
    );
  } catch {
    return NextResponse.redirect(
      new URL("/dashboard/settings?error=1", req.url)
    );
  }
}
