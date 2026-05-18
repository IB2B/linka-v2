"use server";

import { adminApi, readError } from "@/lib/admin/api";

type Result = { error?: string; messageId?: string };

export async function sendTestEmailAction(to: string): Promise<Result> {
  const res = await adminApi("/api/admin/email/test", {
    method: "POST", body: JSON.stringify({ to }),
  });
  if (!res.ok) return { error: await readError(res, "Failed to send test email.") };
  const json = (await res.json()) as { messageId?: string };
  return { messageId: json.messageId };
}
