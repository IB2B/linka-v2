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
import socialRouter from "./routes/social";
import supportRouter from "./routes/support";
import inboxRouter from "./routes/inbox";
import pipelinesRouter from "./routes/pipelines";
import trendsRouter from "./routes/trends";
import analyticsRouter from "./routes/analytics";
import recyclerRouter from "./routes/recycler";
import feedbackRouter from "./routes/feedback";
import adminStatsRouter from "./routes/admin-stats";
import adminUsersRouter from "./routes/admin-users";
import adminActivityRouter from "./routes/admin-activity";
import adminUserDetailRouter from "./routes/admin-user-detail";
import adminSettingsRouter from "./routes/admin-settings";
import adminSubscriptionsRouter from "./routes/admin-subscriptions";
import adminPaymentsRouter from "./routes/admin-payments";
import adminContentRouter from "./routes/admin-content";
import adminModerationRouter from "./routes/admin-moderation";
import adminFeedbackRouter from "./routes/admin-feedback";
import adminSupportRouter from "./routes/admin-support";
import adminAnalyticsRouter from "./routes/admin-analytics";
import adminAiUsageRouter from "./routes/admin-ai-usage";
import { proxyImage } from "./controllers/image-proxy.controller";
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
app.get("/api/image-proxy", proxyImage);
app.use("/api/auth", authRouter);
app.use("/api/billing", billingRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api/users", usersRouter);
app.use("/api/voice-lab", voiceLabRouter);
app.use("/api/content", contentRouter);
app.use("/api/posts", postsRouter);
app.use("/api/social", socialRouter);
app.use("/api/support", supportRouter);
app.use("/api/inbox", inboxRouter);
app.use("/api/pipelines", pipelinesRouter);
app.use("/api/trends", trendsRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/recycler", recyclerRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/admin/stats", adminStatsRouter);
app.use("/api/admin/users", adminUsersRouter);
app.use("/api/admin/activity", adminActivityRouter);
app.use("/api/admin/users", adminUserDetailRouter);
app.use("/api/admin/settings", adminSettingsRouter);
app.use("/api/admin/subscriptions", adminSubscriptionsRouter);
app.use("/api/admin/payments", adminPaymentsRouter);
app.use("/api/admin/content", adminContentRouter);
app.use("/api/admin/moderation", adminModerationRouter);
app.use("/api/admin/feedback", adminFeedbackRouter);
app.use("/api/admin/support", adminSupportRouter);
app.use("/api/admin/analytics", adminAnalyticsRouter);
app.use("/api/admin/ai-usage", adminAiUsageRouter);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`[server] listening on :${PORT}`);
  reapStuckImageJobs().catch((e) => console.error("[image-reaper]", e));
});
