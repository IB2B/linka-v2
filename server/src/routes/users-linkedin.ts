import { Router, type RequestHandler } from "express";
import { unlink, readFile } from "node:fs/promises";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import multer from "multer";
import { db } from "../lib/db";
import { authenticate, type AuthRequest } from "../middleware/auth";
import { parseLinkedInPdf } from "../lib/linkedin-pdf";

const TMP_DIR = join(process.cwd(), "uploads", "linkedin-tmp");
mkdirSync(TMP_DIR, { recursive: true });

const upload = multer({
  dest: TMP_DIR,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files are allowed."));
  },
});

const router = Router();
router.use(authenticate);

const handleUpload: RequestHandler = (req, res) => {
  upload.single("pdf")(req, res, async (err) => {
    const r = req as AuthRequest;
    if (err) { res.status(400).json({ error: err.message }); return; }
    if (!r.file) { res.status(400).json({ error: "No file uploaded." }); return; }
    try {
      const buf = await readFile(r.file.path);
      const { samples, jobTitle } = await parseLinkedInPdf(buf);
      await Promise.all([
        ...samples.map((content) =>
          db.query(
            "INSERT INTO writing_samples (id, user_id, content, source) VALUES (?, ?, ?, 'linkedin')",
            [randomUUID(), r.user!.id, content],
          )
        ),
        jobTitle
          ? db.query(
              `INSERT INTO user_profiles (id, user_id, job_title) VALUES (?, ?, ?)
               ON DUPLICATE KEY UPDATE job_title = VALUES(job_title)`,
              [randomUUID(), r.user!.id, jobTitle],
            )
          : null,
        db.query("UPDATE users SET onboarding_step=4 WHERE id=?", [r.user!.id]),
      ]);
      res.json({ ok: true, samplesCount: samples.length });
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
    } finally {
      await unlink(r.file.path).catch(() => {});
    }
  });
};

router.post("/", handleUpload);
export default router;
