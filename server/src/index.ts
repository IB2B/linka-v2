import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth";
import billingRouter from "./routes/billing";
import stripeRouter from "./routes/stripe";
import usersRouter from "./routes/users";
import { errorHandler } from "./middleware/error";

const app = express();
const PORT = Number(process.env.PORT ?? 4000);

app.use(cors({ origin: process.env.NEXT_PUBLIC_APP_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/stripe/webhook", express.raw({ type: "application/json" }));
app.use(express.json());

app.get("/api/health", (_req, res) => { res.json({ ok: true }); });
app.use("/api/auth", authRouter);
app.use("/api/billing", billingRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api/users", usersRouter);

app.use(errorHandler);
app.listen(PORT, () => { console.log(`[server] listening on :${PORT}`); });
