import { generateOpenAIImage } from "./openai-images";

// Returns an image URL (or data: URL for gpt-image-1 base64 responses).
// Throws on missing key or upstream failure — caller is expected to mark
// the post's image_status='failed' so the UI surfaces the error.
export async function generatePostImage(prompt: string): Promise<string> {
  const hasKey = process.env.OPENAI_IMAGE_API_KEY ?? process.env.OPENAI_API_KEY;
  if (!hasKey) throw new Error("OPENAI_API_KEY not set");
  return generateOpenAIImage({ prompt });
}
