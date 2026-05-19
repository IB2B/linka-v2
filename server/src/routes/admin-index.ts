import type { Express } from "express";
import adminStatsRouter from "./admin-stats";
import adminUsersRouter from "./admin-users";
import adminUserDetailRouter from "./admin-user-detail";
import adminUsersPasswordResetRouter from "./admin-users-password-reset";
import adminSettingsRouter from "./admin-settings";
import adminSubscriptionsRouter from "./admin-subscriptions";
import adminPaymentsRouter from "./admin-payments";
import adminContentRouter from "./admin-content";
import adminFeedbackRouter from "./admin-feedback";
import adminSupportRouter from "./admin-support";
import adminAnalyticsRouter from "./admin-analytics";
import adminAiUsageRouter from "./admin-ai-usage";
import adminEmailRouter from "./admin-email";
import adminNotificationsRouter from "./admin-notifications";

export function mountAdminRoutes(app: Express): void {
  app.use("/api/admin/stats", adminStatsRouter);
  app.use("/api/admin/users", adminUsersRouter);
  app.use("/api/admin/users", adminUserDetailRouter);
  app.use("/api/admin/users", adminUsersPasswordResetRouter);
  app.use("/api/admin/settings", adminSettingsRouter);
  app.use("/api/admin/subscriptions", adminSubscriptionsRouter);
  app.use("/api/admin/payments", adminPaymentsRouter);
  app.use("/api/admin/content", adminContentRouter);
  app.use("/api/admin/feedback", adminFeedbackRouter);
  app.use("/api/admin/support", adminSupportRouter);
  app.use("/api/admin/analytics", adminAnalyticsRouter);
  app.use("/api/admin/ai-usage", adminAiUsageRouter);
  app.use("/api/admin/email", adminEmailRouter);
  app.use("/api/admin/notifications", adminNotificationsRouter);
}
