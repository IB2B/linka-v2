import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

import { DEFAULT_LOCALE, isLocale } from "./config";

type Msg = Record<string, unknown>;

function deepMerge(base: Msg, over: Msg): Msg {
  const out: Msg = { ...base };
  for (const k of Object.keys(over)) {
    const a = base[k];
    const b = over[k];
    if (a && b && typeof a === "object" && typeof b === "object"
        && !Array.isArray(a) && !Array.isArray(b)) {
      out[k] = deepMerge(a as Msg, b as Msg);
    } else {
      out[k] = b;
    }
  }
  return out;
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get("NEXT_LOCALE")?.value;
  const locale = raw && isLocale(raw) ? raw : DEFAULT_LOCALE;
  const en = (await import("../messages/en.json")).default as Msg;
  const messages = locale === "en"
    ? en
    : deepMerge(en, (await import(`../messages/${locale}.json`)).default as Msg);
  return { locale, messages };
});
