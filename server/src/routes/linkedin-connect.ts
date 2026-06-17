import { Router } from "express";
import { authenticate, type AuthRequest } from "../middleware/auth";
import { requireBusinessFeature } from "../middleware/require-feature";
import * as c from "../controllers/linkup-connect.controller";

const router = Router();
router.use(authenticate);
router.use(requireBusinessFeature);

router.get("/status", (req: AuthRequest, res, next) => c.linkedinStatus(req, res).catch(next));
router.post("/login", (req: AuthRequest, res, next) => c.startLinkedinLogin(req, res).catch(next));
router.post("/verify", (req: AuthRequest, res, next) => c.verifyLinkedinLogin(req, res).catch(next));
router.delete("/", (req: AuthRequest, res, next) => c.disconnectLinkedin(req, res).catch(next));

export default router;
