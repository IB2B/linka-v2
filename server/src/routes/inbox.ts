import { Router } from "express";

import { authenticate, type AuthRequest } from "../middleware/auth";
import * as c from "../controllers/inbox.controller";

const router = Router();
router.use(authenticate);

router.get("/conversations", (req: AuthRequest, res, next) => {
  c.getConversations(req, res).catch(next);
});

router.get("/conversations/:id/messages", (req: AuthRequest, res, next) => {
  c.getMessages(req, res).catch(next);
});

router.post("/conversations/:id/messages", (req: AuthRequest, res, next) => {
  c.postReply(req, res).catch(next);
});

export default router;
