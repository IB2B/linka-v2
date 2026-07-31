import { generateOpenAIImage } from "./openai-images";
import type { ImageShape } from "./image-size";

export type ImageResult = { url: string; model: string };

export async function generatePostImage(
  prompt: string, shape?: ImageShape,
): Promise<ImageResult> {
  const hasKey = process.env.OPENAI_IMAGE_API_KEY ?? process.env.OPENAI_API_KEY;
  if (!hasKey) throw new Error("OPENAI_API_KEY not set");
  const model = process.env.IMAGE_MODEL ?? "dall-e-3";
  const url = await generateOpenAIImage({ prompt, model, shape });
  return { url, model };
}
