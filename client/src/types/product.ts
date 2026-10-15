// Mirrors GET /api/products. A product the user promotes, usually their own SaaS.
export type Product = {
  id: string;
  name: string;
  url: string | null;
  pitch: string;
  audience: string | null;
  features: string | null;
  cta: string | null;
};
