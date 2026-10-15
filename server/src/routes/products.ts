import { Router } from "express";

import { authenticate, type AuthRequest } from "../middleware/auth";
import { rateLimit } from "../lib/rate-limit";
import { importProductFromUrl } from "../lib/product-import";
import { ImportError } from "../lib/import-error";
import { releaseImport, reserveImport } from "../lib/product-import-quota";
import {
  MAX_PRODUCTS, createProductCapped, deleteProduct, listProducts, updateProduct,
} from "../models/product.model";
import { importSchema, productSchema } from "./products.schema";

const router = Router();
router.use(authenticate);

const MINUTE = 60 * 1000;

router.get("/", async (req: AuthRequest, res, next) => {
  try { res.json(await listProducts(req.user!.id)); } catch (e) { next(e); }
});

router.post("/", async (req: AuthRequest, res, next) => {
  try {
    const parsed = productSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }
    const id = await createProductCapped(req.user!.id, parsed.data);
    if (!id) { res.status(400).json({ error: `You can save up to ${MAX_PRODUCTS} products.` }); return; }
    res.status(201).json({ id });
  } catch (e) { next(e); }
});

// Reads a website and returns suggested field values; nothing is saved. Capped
// per day by plan (stored, so restarts don't reset it) plus a short burst limit.
router.post("/import", async (req: AuthRequest, res, next) => {
  try {
    const parsed = importSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }
    const userId = req.user!.id;
    if (!rateLimit(`product-import:${userId}`, 3, MINUTE).allowed) {
      res.status(429).json({ error: "Slow down a little, then try again." });
      return;
    }
    const slot = await reserveImport(userId, parsed.data.url);
    if ("limit" in slot) {
      res.status(429).json({ error: `You've used today's ${slot.limit} website imports. Try again tomorrow.` });
      return;
    }
    try {
      res.json(await importProductFromUrl(parsed.data.url));
    } catch (e) {
      await releaseImport(slot.id).catch(() => {});
      if (e instanceof ImportError) { res.status(422).json({ error: e.message }); return; }
      // Provider and network errors carry internal detail: log it, keep it off the wire.
      console.error("[product-import]", e);
      res.status(502).json({ error: "Couldn't read that website right now. Try again later." });
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
