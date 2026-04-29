import { Router } from "express";
import { authenticate } from "../middleware/auth";
import * as s from "../controllers/voice-lab-samples.controller";
import * as p from "../controllers/voice-lab-profile.controller";

const router = Router();
router.use(authenticate);

router.get("/samples", s.listSamples);
router.post("/samples", s.createSample);
router.post("/samples/bulk", s.bulkCreateSamples);
router.delete("/samples/:id", s.deleteSample);

router.get("/profile", p.getProfile);
router.post("/analyze", p.analyze);

export default router;
