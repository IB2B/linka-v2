import { Router } from "express";
import { z } from "zod";

import { authenticate, type AuthRequest } from "../middleware/auth";
import {
  MAX_PRODUCTS, countProducts, createProduct, deleteProduct, listProducts, updateProduct,
} from "../models/product.model";

const router = Router();
router.use(authenticate);

const optional = (max: number) => z.string().trim().max(max).optional().nullable();

const schema = z.object({
  name: z.string().trim().min(1, "Give the product a name.").max(120),
  url: z.string().trim().max(500).url("Use a full link, like https://yourapp.com")
    .optional().nullable().or(z.literal("")),
  pitch: z.string().trim().min(1, "Add a one-line pitch.").max(300),
  audience: optional(300),
  features: optional(2000),
  cta: optional(200),
});

router.get("/", async (req: AuthRequest, res, next) => {
  try { res.json(await listProducts(req.user!.id)); } catch (e) { next(e); }
});

router.post("/", async (req: AuthRequest, res, next) => {
  try {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }
    if (await countProducts(req.user!.id) >= MAX_PRODUCTS) {
      res.status(400).json({ error: `You can save up to ${MAX_PRODUCTS} products.` });
      return;
    }
    res.status(201).json({ id: await createProduct(req.user!.id, parsed.data) });
  } catch (e) { next(e); }
});

router.patch("/:id", async (req: AuthRequest, res, next) => {
  try {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }
    const ok = await updateProduct(req.user!.id, String(req.params.id), parsed.data);
    if (!ok) { res.status(404).json({ error: "Product not found." }); return; }
    res.json({ ok: true });
  } catch (e) { next(e); }
});

router.delete("/:id", async (req: AuthRequest, res, next) => {
  try {
    const ok = await deleteProduct(req.user!.id, String(req.params.id));
    if (!ok) { res.status(404).json({ error: "Product not found." }); return; }
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
