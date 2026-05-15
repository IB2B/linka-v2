export type PasswordRule = { label: string; test: (p: string) => boolean };
export type StrengthLevel = "weak" | "fair" | "good" | "strong";

export const PASSWORD_RULES: PasswordRule[] = [
  { label: "At least 8 characters",  test: (p) => p.length >= 8 },
  { label: "One uppercase letter",   test: (p) => /[A-Z]/.test(p) },
  { label: "One lowercase letter",   test: (p) => /[a-z]/.test(p) },
  { label: "One number",             test: (p) => /[0-9]/.test(p) },
  { label: "One special character",  test: (p) => /[^A-Za-z0-9]/.test(p) },
];

export function getPasswordStrength(password: string) {
  const passed = PASSWORD_RULES.map((r) => r.test(password));
  const score = passed.filter(Boolean).length;
  const level: StrengthLevel =
    score <= 1 ? "weak" : score === 2 ? "fair" : score <= 4 ? "good" : "strong";
  const bars = score <= 1 ? 1 : score === 2 ? 2 : score <= 4 ? 3 : 4;
  return { score, level, bars, passed };
}
