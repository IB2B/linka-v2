import { Router } from "express";
import { authenticate, type AuthRequest } from "../middleware/auth";
import { listAccounts } from "./social-accounts-list";
import { getConnectUrl } from "./social-connect";
import { disconnectAccount } from "./social-disconnect";
const router = Router();
router.use(authenticate);

router.get("/accounts", (req: AuthRequest, res, next) => {
  listAccounts(req, res).catch(next);
});

router.get("/connect/:platform", (req: AuthRequest, res, next) => {
  getConnectUrl(req, res).catch(next);
});

router.delete("/accounts/:id", (req: AuthRequest, res, next) => {
  disconnectAccount(req, res).catch(next);
});

export default router;
