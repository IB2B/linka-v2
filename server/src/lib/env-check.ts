const REQUIRED = ["DATABASE_URL", "JWT_SECRET", "NEXT_PUBLIC_APP_URL"];

const RECOMMENDED = [
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "STRIPE_PRICE_CREATOR",
  "STRIPE_PRICE_Business",
  "SMTP_HOST",
  "SMTP_USER",
  "SMTP_PASS",
];

function missing(keys: string[]): string[] {
  return keys.filter((k) => {
    const v = process.env[k];
    return !v || v === "change-me";
  });
}

export function checkEnv(): void {
  const reqMissing = missing(REQUIRED);
  const recMissing = missing(RECOMMENDED);
  if (reqMissing.length) {
    console.error(`[env] FATAL missing required: ${reqMissing.join(", ")}`);
    if (process.env.NODE_ENV === "production") process.exit(1);
  }
  if (recMissing.length) {
    console.warn(`[env] WARN missing recommended: ${recMissing.join(", ")}`);
  }
}
