import { Router, type RequestHandler } from "express";
import { authenticate, type AuthRequest } from "../middleware/auth";
import { logoUpload } from "../lib/logo-upload";

const router = Router();
router.use(authenticate);

// Returns the public path and stops there. Persisting it belongs to the brand
// kit save that follows, so cancelling the form leaves an orphan file rather
// than a logo the user never confirmed.
const handleUpload: RequestHandler = (req, res) => {
  logoUpload.single("logo")(req, res, (err) => {
    const r = req as AuthRequest;
    if (err) { res.status(400).json({ error: err.message }); return; }
    if (!r.file) { res.status(400).json({ error: "No file uploaded." }); return; }
    res.json({ url: `/uploads/logos/${r.file.filename}` });
  });
};

router.post("/", handleUpload);

export default router;
