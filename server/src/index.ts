import "dotenv/config";
import "./lib/sentry";
import { join } from "node:path";
import express from "express";
import * as Sentry from "@sentry/node";
import { checkEnv } from "./lib/env-check";

checkEnv();
import cookieParser from "cookie-parser";
import cors from "cors";
import { mountApiRoutes } from "./routes/api-index";
import { errorHandler } from "./middleware/error";
import { startBackgroundJobs } from "./lib/background-jobs";

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

mountApiRoutes(app);

Sentry.setupExpressErrorHandler(app);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`[server] listening on :${PORT}`);
  startBackgroundJobs();
});
