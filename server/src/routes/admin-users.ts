import { Router } from "express";
import { z } from "zod";
import { db } from "../lib/db";
import { adminOnly, type AuthRequest } from "../middleware/admin";
import { listAdminUsers } from "../lib/admin-users-list";
import { createAdminUser } from "../lib/admin-user-create";
import { exportAdminUsers } from "../controllers/admin-users-export.controller";

const router = Router();
router.use(adminOnly);

router.get("/", async (req, res, next) => {
  try {
    const q = String(req.query.q ?? "").trim() || undefined;
    const role = typeof req.query.role === "string" ? req.query.role : undefined;
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    const limit = Math.min(Number(req.query.limit ?? 50), 200);
    const offset = Math.max(Number(req.query.offset ?? 0), 0);
    res.json(await listAdminUsers({ q, role, status, limit, offset }));
  } catch (e) { next(e); }
});

router.get("/export", exportAdminUsers);
router.post("/", (req, res, next) => { createAdminUser(req, res).catch(next); });

const roleSchema = z.object({ role: z.enum(["USER", "ADMIN", "SUPER_ADMIN"]) });
router.patch("/:id/role", async (req: AuthRequest, res, next) => {
  try {
    if (req.params.id === req.user!.id) {
      res.status(400).json({ error: "Cannot change your own role." }); return;
    }
    const parsed = roleSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: "Invalid role" }); return; }
    if (parsed.data.role === "SUPER_ADMIN" && req.user!.role !== "SUPER_ADMIN") {
      res.status(403).json({ error: "Only SUPER_ADMIN can grant SUPER_ADMIN." }); return;
    }
    await db.query("UPDATE users SET role = ? WHERE id = ?", [parsed.data.role, req.params.id]);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

router.delete("/:id", async (req: AuthRequest, res, next) => {
  try {
    if (req.params.id === req.user!.id) {
      res.status(400).json({ error: "Cannot delete yourself." }); return;
    }
    await db.query("DELETE FROM users WHERE id = ?", [req.params.id]);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

const statusSchema = z.object({ status: z.enum(["ACTIVE", "SUSPENDED"]) });
router.patch("/:id/status", async (req: AuthRequest, res, next) => {
  try {
    if (req.params.id === req.user!.id) {
      res.status(400).json({ error: "Cannot suspend yourself." }); return;
    }
    const parsed = statusSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: "Invalid status" }); return; }
    await db.query("UPDATE users SET status = ? WHERE id = ?", [parsed.data.status, req.params.id]);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
