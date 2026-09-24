import { Router, type Request } from "express";
import type { AuthRequest } from "../middleware/auth";
import { rateLimitMw } from "../middleware/rate-limit-mw";
import { buildUserExport } from "../lib/user-export";
import { eraseUser } from "../lib/user-erase";
import { CLEAR_COOKIE_OPTS } from "../lib/cookie-opts";

// Mounted after `authenticate` in users.ts. GDPR access + erasure endpoints.
const router = Router();

// Per user, not per IP — one export runs a query for every user table.
const exportLimit = rateLimitMw(
  "user-export", 5, 60 * 60 * 1000, (req: Request) => (req as AuthRequest).user!.id,
);

router.get("/me/export", exportLimit, async (req: AuthRequest, res, next) => {
  try {
    const data = await buildUserExport(req.user!.id);
    const day = new Date().toISOString().slice(0, 10);
    res.setHeader("Content-Disposition", `attachment; filename="linka-data-${day}.json"`);
    res.setHeader("Cache-Control", "no-store");
    res.type("application/json").send(JSON.stringify(data, null, 2));
  } catch (e) { next(e); }
});

router.delete("/me", async (req: AuthRequest, res, next) => {
  try {
    await eraseUser(req.user!.id);
    res.clearCookie("token", CLEAR_COOKIE_OPTS);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
