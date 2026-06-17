import { Router } from "express";
import { authenticate, type AuthRequest } from "../middleware/auth";
import { requireBusinessFeature } from "../middleware/require-feature";
import * as c from "../controllers/linkedin-connect.controller";

const router = Router();
router.use(authenticate);
router.use(requireBusinessFeature);

router.get("/status", (req: AuthRequest, res, next) => c.linkedinStatus(req, res).catch(next));
router.post("/connect", (req: AuthRequest, res, next) => c.connectLinkedin(req, res).catch(next));
router.post("/sync", (req: AuthRequest, res, next) => c.syncLinkedin(req, res).catch(next));
router.delete("/", (req: AuthRequest, res, next) => c.disconnectLinkedin(req, res).catch(next));

export default router;
