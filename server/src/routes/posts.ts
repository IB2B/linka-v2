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
import { listPublishedPlatforms }
  from "../controllers/posts-published-platforms.controller";
import { listNotifications }
  from "../controllers/posts-notifications.controller";
import { listComments } from "../controllers/post-comments.controller";
import { replyComment } from "../controllers/post-comments-reply.controller";
import { suggestReply } from "../controllers/post-comments-suggest.controller";
import { uploadCommentImage } from "../controllers/post-comment-image.controller";
import { commentImageUpload } from "../lib/comment-image-upload";
import {
  likeAction, hideAction, deleteAction,
} from "../controllers/post-comments-actions.controller";

const router = Router();
router.use(authenticate);

router.get("/", list);
router.get("/notifications", listNotifications);
router.get("/published-platforms", listPublishedPlatforms);
router.get("/:id", getOne);
router.get("/:id/comments", listComments);
router.post("/:id/comments/reply", replyComment);
router.post("/:id/comments/suggest", suggestReply);
router.post(
  "/:id/comments/image",
  commentImageUpload.single("image"),
  uploadCommentImage,
);
router.post("/:id/comments/like", likeAction);
router.post("/:id/comments/hide", hideAction);
router.post("/:id/comments/delete", deleteAction);
router.post("/:id/schedule", schedule);
router.post("/:id/publish", publish);
router.post("/:id/regenerate-text", regenerateText);
router.post("/:id/regenerate-image", regenerateImage);
router.post("/:id/score", scoreById);
router.post("/bulk-delete", bulkDelete);
router.delete("/:id", remove);

export default router;
