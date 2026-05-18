import { emailLayout } from "./layout";

export type WelcomeInput = { firstName: string; appUrl: string };

export function welcomeEmail({ firstName, appUrl }: WelcomeInput) {
  const name = firstName?.trim() || "there";
  const body = `
    <p>Hey ${escape(name)} — welcome to linka.</p>
    <p>
      You're in. Linka writes, designs and schedules every social post in your voice —
      across LinkedIn, Instagram, X and more. Most users post their first draft within
      five minutes.
    </p>
    <p>
      Two things to try first: connect an account, then hit Generate. Your trained voice
      gets sharper with every approve.
    </p>
    <p style="margin:24px 0">
      <a class="btn" href="${appUrl}/dashboard">Open your dashboard</a>
    </p>
    <p style="font-size:13px;color:#737373">
      Stuck or curious? Reply to this email — a real human reads it.
    </p>
  `;
  return {
    subject: `Welcome to linka, ${name}`,
    html: emailLayout({
      preheader: "You're in — let's get your first post shipped.",
      heading: `Welcome to linka, ${escape(name)}`,
      body,
    }),
  };
}

function escape(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
