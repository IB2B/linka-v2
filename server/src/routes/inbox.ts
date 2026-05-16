import { Router } from "express";

import { authenticate, type AuthRequest } from "../middleware/auth";
import { requireProFeature } from "../middleware/require-feature";
import * as c from "../controllers/inbox.controller";
import { assist } from "../controllers/inbox-assist.controller";
import { summarize } from "../controllers/inbox-summarize.controller";
import { uploadMiddleware, uploadInboxFile } from "../controllers/inbox-upload.controller";

const router = Router();
router.use(authenticate);
router.use(requireProFeature);

router.post("/conversations/:id/assist", (req: AuthRequest, res, next) => {
  assist(req, res).catch(next);
});
router.post("/conversations/:id/summarize", (req: AuthRequest, res, next) => {
  summarize(req, res).catch(next);
});

router.post("/upload", uploadMiddleware, (req: AuthRequest, res, next) => {
  uploadInboxFile(req, res).catch(next);
});

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
