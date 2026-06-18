import { Router } from "express";
import { authenticate } from "../middleware/auth";
import {
  list,
  getOne,
  remove,
  schedule,
  publish,
  updateContent,
} from "../controllers/posts.controller";
import {
  regenerateText, regenerateImage,
} from "../controllers/posts-regenerate.controller";
import { createManual } from "../controllers/posts-create.controller";
import {
  postImageUpload, uploadPostImage,
} from "../controllers/posts-image-upload.controller";
import { scoreById } from "../controllers/posts-score.controller";
import { bulkDelete } from "../controllers/posts-bulk.controller";
import { listPublishedPlatforms }
  from "../controllers/posts-published-platforms.controller";
import { listNotifications }
  from "../controllers/posts-notifications.controller";
import { listComments } from "../controllers/post-comments.controller";
import { replyComment } from "../controllers/post-comments-reply.controller";
import { suggestReply } from "../controllers/post-comments-suggest.controller";
import {
  likeAction, deleteAction,
} from "../controllers/post-comments-actions.controller";

const router = Router();
router.use(authenticate);

router.get("/", list);
router.post("/", createManual);
router.post("/upload-image", postImageUpload, uploadPostImage);
router.get("/notifications", listNotifications);
router.get("/published-platforms", listPublishedPlatforms);
router.get("/:id", getOne);
router.get("/:id/comments", listComments);
router.post("/:id/comments/reply", replyComment);
router.post("/:id/comments/suggest", suggestReply);
router.post("/:id/comments/like", likeAction);
router.post("/:id/comments/delete", deleteAction);
router.post("/:id/schedule", schedule);
router.post("/:id/publish", publish);
router.post("/:id/regenerate-text", regenerateText);
router.post("/:id/regenerate-image", regenerateImage);
router.post("/:id/score", scoreById);
router.post("/bulk-delete", bulkDelete);
router.patch("/:id", updateContent);
router.delete("/:id", remove);

export default router;
