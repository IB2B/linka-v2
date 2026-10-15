import { Router } from "express";

import { authenticate, type AuthRequest } from "../middleware/auth";
import { rateLimit } from "../lib/rate-limit";
import { importProductFromUrl } from "../lib/product-import";
import {
  MAX_PRODUCTS, countProducts, createProduct, deleteProduct, listProducts, updateProduct,
} from "../models/product.model";
import { importSchema, productSchema } from "./products.schema";

const router = Router();
router.use(authenticate);

const HOUR = 60 * 60 * 1000;

router.get("/", async (req: AuthRequest, res, next) => {
  try { res.json(await listProducts(req.user!.id)); } catch (e) { next(e); }
});

router.post("/", async (req: AuthRequest, res, next) => {
  try {
    const parsed = productSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }
    if (await countProducts(req.user!.id) >= MAX_PRODUCTS) {
      res.status(400).json({ error: `You can save up to ${MAX_PRODUCTS} products.` });
      return;
    }
    res.status(201).json({ id: await createProduct(req.user!.id, parsed.data) });
  } catch (e) { next(e); }
});

// Reads a website and returns suggested field values; nothing is saved.
router.post("/import", async (req: AuthRequest, res, next) => {
  try {
    const parsed = importSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }
    const limit = rateLimit(`product-import:${req.user!.id}`, 10, HOUR);
    if (!limit.allowed) { res.status(429).json({ error: "Too many imports. Try again in a bit." }); return; }
    try {
      res.json(await importProductFromUrl(parsed.data.url));
    } catch (e) {
      res.status(422).json({ error: e instanceof Error ? e.message : "Couldn't read that website." });
    }
  } catch (e) { next(e); }
});

router.patch("/:id", async (req: AuthRequest, res, next) => {
  try {
    const parsed = productSchema.safeParse(req.body);
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
