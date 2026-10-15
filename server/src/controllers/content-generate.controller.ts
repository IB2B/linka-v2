import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import { checkGenerateAllowed } from "../lib/generate-guard";
import { generateForPlatform } from "../lib/content-generate-one";
import { rememberLanguage } from "../lib/remember-language";
import { sendPostsGeneratedEmail } from "../lib/post-event-emails";
import { getProduct } from "../models/product.model";
import { generateSchema as schema } from "./content-generate.schema";

type Out = {
  posts: { platform: string; id: string; content: string }[];
  errors?: { platform: string; error: string }[];
};

export async function generate(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message });
      return;
    }
    const input = parsed.data;
    // Frontend sends `media`; fall back to the legacy `withImage` flag.
    const media = input.media ?? (input.withImage ? "image" : "none");
    const userId = req.user!.id;
    const product = input.productId ? await getProduct(userId, input.productId) : null;
    if (input.productId && !product) { res.status(404).json({ error: "Product not found." }); return; }
    const blocked = await checkGenerateAllowed(userId, input.platforms.length, media);
    if (blocked) { res.status(blocked.status).json({ error: blocked.error, code: blocked.code }); return; }
    void rememberLanguage(userId, input.language).catch(() => {});
    const settled = await Promise.allSettled(
      input.platforms.map((p) => generateForPlatform(userId, { ...input, media, product }, p)),
    );
    const out: Out = { posts: [] };
    settled.forEach((t, i) => {
      const platform = input.platforms[i];
      if (t.status === "fulfilled") out.posts.push({ platform, ...t.value });
      else {
        out.errors ??= [];
        out.errors.push({ platform, error: t.reason instanceof Error ? t.reason.message : "Generation failed." });
      }
    });
    res.json(out);
    if (out.posts.length > 0) {
      sendPostsGeneratedEmail(userId, out.posts)
        .catch((e) => console.error("[notify-generated]", e));
    }
  } catch (e) { next(e); }
}
