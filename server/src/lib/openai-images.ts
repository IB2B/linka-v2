// Direct REST call to OpenAI Images API to avoid pulling in the SDK.
// Returns a URL (hosted by OpenAI, ~1h TTL) or a data: URL fallback for
// gpt-image-1 which returns base64.

type Size = "1024x1024" | "1792x1024" | "1536x1024";

export type OpenAIImageOptions = {
  prompt: string;
  model?: string;
  size?: Size;
  signal?: AbortSignal;
};

type ImagesResponse = {
  data?: { url?: string; b64_json?: string }[];
  error?: { message?: string };
};

export async function generateOpenAIImage(
  opts: OpenAIImageOptions,
): Promise<string> {
  const key = process.env.OPENAI_IMAGE_API_KEY ?? process.env.OPENAI_API_KEY;
  if (!key) throw Object.assign(new Error("OPENAI_API_KEY not set"), { status: 503 });

  const model = opts.model ?? "dall-e-3";
  const isGptImage = model.startsWith("gpt-image");
  const size: Size = opts.size ?? (isGptImage ? "1536x1024" : "1792x1024");

  const body: Record<string, unknown> = { model, prompt: opts.prompt, n: 1, size };
  if (!isGptImage) {
    body.quality = "standard";
    body.response_format = "url";
  }

  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
    body: JSON.stringify(body),
    signal: opts.signal ?? AbortSignal.timeout(60_000),
  });
  const json = (await res.json()) as ImagesResponse;
  if (!res.ok) throw new Error(json.error?.message ?? `OpenAI ${res.status}`);

  const item = json.data?.[0];
  if (item?.url) return item.url;
  if (item?.b64_json) return `data:image/png;base64,${item.b64_json}`;
  throw new Error("OpenAI returned no image");
}
