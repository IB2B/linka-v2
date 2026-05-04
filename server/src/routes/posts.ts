import { Router } from "express";
import { authenticate } from "../middleware/auth";
import {
  list,
  getOne,
  remove,
  schedule,
  publish,
} from "../controllers/posts.controller";
import {
  regenerateText, regenerateImage,
} from "../controllers/posts-regenerate.controller";
import { scoreById } from "../controllers/posts-score.controller";
import { bulkDelete } from "../controllers/posts-bulk.controller";

const router = Router();
router.use(authenticate);

router.get("/", list);
router.get("/:id", getOne);
router.post("/:id/schedule", schedule);
router.post("/:id/publish", publish);
router.post("/:id/regenerate-text", regenerateText);
router.post("/:id/regenerate-image", regenerateImage);
router.post("/:id/score", scoreById);
router.post("/bulk-delete", bulkDelete);
router.delete("/:id", remove);

export default router;
