type LayoutInput = {
  preheader?: string;
  heading: string;
  body: string;
};

export function emailLayout({ preheader, heading, body }: LayoutInput): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
  body { margin:0; padding:56px 24px 96px; background:#FFFFFF; font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; color:#0F1113; letter-spacing:-0.011em; -webkit-font-smoothing:antialiased; }
  .wrap { max-width:560px; margin:0 auto; }
  .brand { font-size:14px; font-weight:600; letter-spacing:-0.02em; color:#0F1113; margin:0 0 56px; }
  .brand span { color:#A3A3A3; font-weight:500; }
  h1 { font-size:28px; line-height:1.2; letter-spacing:-0.03em; margin:0 0 24px; font-weight:600; color:#0F1113; }
  p { font-size:15px; line-height:1.65; color:#0F1113; margin:0 0 18px; letter-spacing:-0.011em; }
  .btn { display:inline-block; background:#0F1113; color:#FFFFFF !important; text-decoration:none; padding:12px 22px; border-radius:6px; font-size:14px; font-weight:500; letter-spacing:-0.011em; }
  .small { font-size:13px; color:#737373; line-height:1.6; letter-spacing:-0.006em; }
  .footer { font-size:12px; color:#A3A3A3; margin:64px 0 0; padding-top:24px; border-top:1px solid #F4F4F5; letter-spacing:-0.004em; }
  a { color:#0F1113; }
  code { font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:12px; color:#525252; word-break:break-all; letter-spacing:0; }
</style></head><body>
${preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0">${preheader}</div>` : ""}
<div class="wrap">
  <p class="brand">linka<span>.studio</span></p>
  <h1>${heading}</h1>
  ${body}
  <p class="footer">linka.studio &middot; Reply to this email if you need a hand.</p>
</div>
</body></html>`;
}
