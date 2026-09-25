import { Router, type Request } from "express";
import { authenticate, type AuthRequest } from "../middleware/auth";
import { rateLimitMw } from "../middleware/rate-limit-mw";
import { listAvatars } from "../controllers/heygen-avatars.controller";
import { listAvatarGroups } from "../controllers/heygen-avatar-groups.controller";
import { listAvatarLooks } from "../controllers/heygen-avatar-looks.controller";
import { listVoices } from "../controllers/heygen-voices.controller";
import { getAvatarSettings, putAvatarSettings }
  from "../controllers/avatar-settings.controller";
import { avatarImageUpload, createAvatar, avatarLookStatus }
  from "../controllers/heygen-avatar-create.controller";

const router = Router();
router.use(authenticate);

// Every photo avatar is billed by HeyGen, so cap how many one user can make.
const createLimit = rateLimitMw(
  "avatar-create", 3, 24 * 60 * 60 * 1000, (req: Request) => (req as AuthRequest).user!.id,
);

router.get("/avatars", listAvatars);
router.get("/groups", listAvatarGroups);
router.get("/groups/:id/looks", listAvatarLooks);
router.post("/photo", createLimit, avatarImageUpload, createAvatar);
router.get("/looks/:id/status", avatarLookStatus);
router.get("/voices", listVoices);
router.get("/settings", getAvatarSettings);
router.put("/settings", putAvatarSettings);

export default router;
