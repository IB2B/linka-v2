"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { isLocale } from "@/i18n/config";

type Result = { success?: boolean; error?: string };

export async function setLocaleAction(locale: string): Promise<Result> {
  if (!isLocale(locale)) return { error: "Unsupported locale." };
  const cookieStore = await cookies();
  cookieStore.set("NEXT_LOCALE", locale, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });
  revalidatePath("/", "layout");
  return { success: true };
}
