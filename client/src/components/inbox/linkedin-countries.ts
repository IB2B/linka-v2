// Proxy regions LinkupAPI supports. Pick the one closest to where the LinkedIn
// account normally signs in, to avoid tripping LinkedIn's location checks.
export const LINKEDIN_COUNTRIES = [
  { code: "US", label: "United States" },
  { code: "UK", label: "United Kingdom" },
  { code: "FR", label: "France" },
  { code: "DE", label: "Germany" },
  { code: "NL", label: "Netherlands" },
  { code: "IT", label: "Italy" },
  { code: "ES", label: "Spain" },
  { code: "CA", label: "Canada" },
  { code: "BR", label: "Brazil" },
  { code: "IN", label: "India" },
  { code: "IL", label: "Israel" },
] as const;
