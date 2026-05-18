type LayoutInput = {
  preheader?: string;
  heading: string;
  body: string;
};

export function emailLayout({ preheader, heading, body }: LayoutInput): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" />
<style>
  body { background:#FAFAFA; margin:0; padding:32px 16px; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,sans-serif; color:#0F1113; }
  .card { max-width:520px; margin:0 auto; background:#fff; border:1px solid #E5E5E5; border-radius:14px; padding:32px; }
  .brand { font-weight:600; letter-spacing:-0.02em; color:#0F1113; margin:0 0 24px; font-size:14px; }
  .brand span { color:#A3A3A3; }
  h1 { font-size:24px; line-height:1.15; letter-spacing:-0.02em; margin:0 0 12px; font-weight:600; }
  p { font-size:14px; line-height:1.55; color:#525252; margin:0 0 14px; }
  .btn { display:inline-block; background:#0F1113; color:#fff !important; text-decoration:none; padding:10px 16px; border-radius:8px; font-size:14px; font-weight:500; }
  .meta { font-size:12px; color:#A3A3A3; margin-top:24px; padding-top:16px; border-top:1px solid #E5E5E5; }
  code { background:#F4F4F5; padding:2px 6px; border-radius:4px; font-size:12px; }
</style></head><body>
${preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0">${preheader}</div>` : ""}
<div class="card">
  <p class="brand">linka<span>.studio</span></p>
  <h1>${heading}</h1>
  ${body}
  <p class="meta">Sent from linka. Reply to this email if you need a hand.</p>
</div>
</body></html>`;
}
