import "dotenv/config";
import { join } from "node:path";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth";
import billingRouter from "./routes/billing";
import stripeRouter from "./routes/stripe";
import usersRouter from "./routes/users";
import voiceLabRouter from "./routes/voice-lab";
import contentRouter from "./routes/content";
import postsRouter from "./routes/posts";
import { errorHandler } from "./middleware/error";
import { reapStuckImageJobs } from "./lib/image-reaper";

const app = express();
const PORT = Number(process.env.PORT ?? 4000);

app.use(cors({ origin: process.env.NEXT_PUBLIC_APP_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/stripe/webhook", express.raw({ type: "application/json" }));
app.use(express.json());

app.use("/uploads", express.static(join(process.cwd(), "uploads"), {
  maxAge: "1d", fallthrough: false,
}));
app.get("/api/health", (_req, res) => { res.json({ ok: true }); });
app.use("/api/auth", authRouter);
app.use("/api/billing", billingRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api/users", usersRouter);
app.use("/api/voice-lab", voiceLabRouter);
app.use("/api/content", contentRouter);
app.use("/api/posts", postsRouter);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`[server] listening on :${PORT}`);
  reapStuckImageJobs().catch((e) => console.error("[image-reaper]", e));
});
