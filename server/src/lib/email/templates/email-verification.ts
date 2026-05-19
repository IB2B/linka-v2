import { emailLayout } from "./layout";

export type VerificationInput = { firstName: string; code: string };

export function emailVerificationEmail({ firstName, code }: VerificationInput) {
  const name = firstName?.trim() || "there";
  const body = `
    <p>Hey ${escape(name)},</p>
    <p>
      Use the code below to confirm your email and finish setting up your
      linka account. It expires in <strong>15 minutes</strong>.
    </p>
    <p style="margin:32px 0">
      <span style="display:inline-block;background:#F4F4F5;border-radius:8px;padding:14px 22px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:26px;font-weight:600;letter-spacing:0.32em;color:#0F1113">${escape(code)}</span>
    </p>
    <p class="small" style="margin-top:32px">
      Didn&rsquo;t create an account? You can safely ignore this email.
    </p>
  `;
  return {
    subject: `Your linka verification code: ${code}`,
    html: emailLayout({
      preheader: `Code ${code} — expires in 15 minutes.`,
      heading: "Confirm your email",
      body,
    }),
  };
}

function escape(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
