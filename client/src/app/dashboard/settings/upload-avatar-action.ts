"use server";

type ActionResult = { error?: string; success?: boolean };

export async function uploadAvatarAction(_formData: FormData): Promise<ActionResult> {
  return { error: "Avatar upload is being migrated to the new storage backend." };
}
