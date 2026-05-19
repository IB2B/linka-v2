import { emailLayout } from "./layout";

export type ResetInput = { firstName: string; resetUrl: string };

export function passwordResetEmail({ firstName, resetUrl }: ResetInput) {
  const name = firstName?.trim() || "there";
  const body = `
    <p>Hey ${escape(name)},</p>
    <p>
      Someone (hopefully you) asked to reset the password on your linka
      account. Click the button below to pick a new one. The link expires
      in <strong>1 hour</strong>.
    </p>
    <p style="margin:32px 0">
      <a class="btn" href="${resetUrl}">Reset password</a>
    </p>
    <p class="small">
      If the button doesn&rsquo;t work, paste this link into your browser:
    </p>
    <p class="small"><code>${resetUrl}</code></p>
    <p class="small" style="margin-top:32px">
      Didn&rsquo;t request this? You can safely ignore this email &mdash;
      your password stays unchanged.
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
