import "dotenv/config";
import "./lib/sentry";
import { join } from "node:path";
import express from "express";
import * as Sentry from "@sentry/node";
import { checkEnv } from "./lib/env-check";

checkEnv();
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth";
import authLogoutRouter from "./routes/auth-logout";
import authPasswordRouter from "./routes/auth-password";
import authVerifyEmailRouter from "./routes/auth-verify-email";
import billingRouter from "./routes/billing";
import plansRouter from "./routes/plans";
import stripeRouter from "./routes/stripe";
import usersRouter from "./routes/users";
import linkedinRouter from "./routes/users-linkedin";
import voiceLabRouter from "./routes/voice-lab";
import contentRouter from "./routes/content";
import postsRouter from "./routes/posts";
import socialRouter from "./routes/social";
import supportRouter from "./routes/support";
import inboxRouter from "./routes/inbox";
import linkedinConnectRouter from "./routes/linkedin-connect";
import { linkedinWebhook } from "./controllers/linkedin-connect.controller";
import pipelinesRouter from "./routes/pipelines";
import trendsRouter from "./routes/trends";
import analyticsRouter from "./routes/analytics";
import recyclerRouter from "./routes/recycler";
import feedbackRouter from "./routes/feedback";
import servicesRouter from "./routes/services";
import socialNotificationsRouter from "./routes/social-notifications";
import platformRouter from "./routes/platform";
import avatarRouter from "./routes/avatar";
import { mountAdminRoutes } from "./routes/admin-index";
import { proxyImage } from "./controllers/image-proxy.controller";
import { authenticate } from "./middleware/auth";
import { errorHandler } from "./middleware/error";
import { resumeStuckImageJobs } from "./lib/image-reaper";
import { startSocialEngagementPoller } from "./lib/social-engagement-poller";
import { startScheduledPostsPoller } from "./lib/scheduled-posts-poller";

const app = express();
const PORT = Number(process.env.PORT ?? 4000);

app.use(cors({ origin: process.env.NEXT_PUBLIC_APP_URL, credentials: true }));
app.use(cookieParser());
app.use("/api/stripe/webhook", express.raw({ type: "application/json" }));
app.use(express.json());
app.use("/uploads", express.static(join(process.cwd(), "uploads"), {
  maxAge: "1d", fallthrough: false,
  setHeaders: (res) => res.setHeader("X-Content-Type-Options", "nosniff"),
}));

app.get("/api/health", (_req, res) => { res.json({ ok: true }); });
app.get("/api/image-proxy", authenticate, proxyImage);
app.use("/api/auth", authRouter);
app.use("/api/auth", authLogoutRouter);
app.use("/api/auth", authPasswordRouter);
app.use("/api/auth", authVerifyEmailRouter);
app.use("/api/billing", billingRouter);
app.use("/api/plans", plansRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api/users", usersRouter);
app.use("/api/users/me/linkedin-pdf", linkedinRouter);
app.use("/api/voice-lab", voiceLabRouter);
app.use("/api/content", contentRouter);
app.use("/api/posts", postsRouter);
app.use("/api/social", socialRouter);
app.use("/api/support", supportRouter);
app.use("/api/inbox", inboxRouter);
app.post("/api/linkedin/webhook", (req, res, next) => linkedinWebhook(req, res).catch(next));
app.use("/api/linkedin", linkedinConnectRouter);
app.use("/api/pipelines", pipelinesRouter);
app.use("/api/trends", trendsRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/recycler", recyclerRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/services", servicesRouter);
app.use("/api/social/notifications", socialNotificationsRouter);
app.use("/api/platform", platformRouter);
app.use("/api/avatar", avatarRouter);
mountAdminRoutes(app);

Sentry.setupExpressErrorHandler(app);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`[server] listening on :${PORT}`);
  resumeStuckImageJobs().catch((e) => console.error("[image-reaper]", e));
  startSocialEngagementPoller();
  startScheduledPostsPoller();
});
