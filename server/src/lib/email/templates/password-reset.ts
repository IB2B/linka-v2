import { emailLayout } from "./layout";

export type ResetInput = { firstName: string; resetUrl: string };

export function passwordResetEmail({ firstName, resetUrl }: ResetInput) {
  const name = firstName?.trim() || "there";
  const body = `
    <p>Hey ${escape(name)},</p>
    <p>
      Someone (hopefully you) asked to reset the password on your linka account.
      Click the button below to pick a new one. The link expires in <strong>1 hour</strong>.
    </p>
    <p style="margin:24px 0">
      <a class="btn" href="${resetUrl}">Reset password</a>
    </p>
    <p style="font-size:13px;color:#737373">
      If the button doesn't work, paste this into your browser:<br/>
      <code style="word-break:break-all">${resetUrl}</code>
    </p>
    <p style="font-size:13px;color:#737373">
      Didn't request this? Ignore this email — your password stays unchanged.
    </p>
  `;
  return {
    subject: "Reset your linka password",
    html: emailLayout({
      preheader: "Reset link inside — expires in 1 hour.",
      heading: "Reset your password",
      body,
    }),
  };
}

function escape(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
