import { db } from "./db";
import { sendEmail } from "./email/send";
import { refundConfirmationEmail } from "./email/templates/refund-confirmation";

export type RefundAuditPayload = {
  chargeId: string; refundId: string;
  amount: number; currency: string;
  subscriptionCanceled: boolean;
};

export async function recordRefundAudit(
  adminId: string, userId: string, payload: RefundAuditPayload,
): Promise<void> {
  try {
    await db.query(
      `INSERT INTO admin_actions (admin_id, target_id, action, details)
       VALUES (?, ?, 'refund_user', ?)`,
      [adminId, userId, JSON.stringify(payload)],
    );
  } catch (e) {
    console.error("[refund/audit-failed]", { adminId, userId, ...payload }, e);
  }
}

export function sendRefundEmail(
  to: string, firstName: string, amountCents: number, currency: string, subCanceled: boolean,
): void {
  const tpl = refundConfirmationEmail({ firstName, amountCents, currency, subCanceled });
  sendEmail({ to, subject: tpl.subject, html: tpl.html })
    .catch((e) => console.error("[email/refund]", e));
}
