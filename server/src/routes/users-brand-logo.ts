import { Router, type RequestHandler } from "express";
import { readFile, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { authenticate, type AuthRequest } from "../middleware/auth";
import { LOGO_DIR, logoUpload } from "../lib/logo-upload";
import { LogoBackgroundError, removeLogoBackground } from "../lib/logo-background";

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

// Only a file this server issued: the path is read straight off disk.
const removeSchema = z.object({
  url: z.string().regex(/^\/uploads\/logos\/[\w-]+\.(png|webp|jpg)$/),
  // Also clear background-coloured holes inside the mark (e.g. inside an "o").
  enclosed: z.boolean().default(false),
});

// Writes a transparent copy next to the original and returns its path; the
// original is kept so the user can undo before saving the brand kit.
const handleRemoveBackground: RequestHandler = async (req, res, next) => {
  try {
    const parsed = removeSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: "Upload a logo first." }); return; }
    const input = await readFile(join(LOGO_DIR, basename(parsed.data.url))).catch(() => null);
    if (!input) { res.status(404).json({ error: "That logo file is gone. Upload it again." }); return; }
    const out = await removeLogoBackground(input, parsed.data.enclosed);
    const name = `${randomUUID()}.png`;
    await writeFile(join(LOGO_DIR, name), out);
    res.json({ url: `/uploads/logos/${name}` });
  } catch (e) {
    if (e instanceof LogoBackgroundError) { res.status(422).json({ error: e.message }); return; }
    next(e);
  }
};

router.post("/", handleUpload);
router.post("/remove-background", handleRemoveBackground);

export default router;
