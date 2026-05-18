import { Router } from "express";
import { z } from "zod";
import { adminOnly } from "../middleware/admin";
import { sendEmail } from "../lib/email/send";

const router = Router();
router.use(adminOnly);

const schema = z.object({ to: z.string().email() });

router.post("/test", async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0].message });
    return;
  }
  try {
    const r = await sendEmail({
      to: parsed.data.to,
      subject: "Linka SMTP test ✉️",
      html: `<p>This is a test email from your Linka server.</p>
             <p>If you're reading this, SMTP is working.</p>
             <p style="color:#737373;font-size:12px">Sent ${new Date().toISOString()}</p>`,
    });
    res.json({ ok: true, messageId: r.messageId });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Send failed.";
    res.status(500).json({ error: msg });
  }
});

export default router;
