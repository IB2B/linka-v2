"use client";

import { useRef, useTransition, useState } from "react";
import { toast } from "sonner";
import { Camera } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { uploadAvatarAction } from "@/app/dashboard/settings/upload-avatar-action";

type Props = { avatarUrl: string | null; firstName: string; email: string };

export function ProfileAvatar({ avatarUrl, firstName, email }: Props) {
  const initials = (firstName?.[0] || email?.[0] || "?").toUpperCase();
  const [preview, setPreview] = useState<string | null>(avatarUrl);
  const [pending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2.5 * 1024 * 1024) {
      toast.error("Image must be smaller than 2.5 MB.");
      return;
    }
    setPreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("avatar", file);
    startTransition(async () => {
      const result = await uploadAvatarAction(formData);
      if (result.error) {
        toast.error(result.error);
        setPreview(avatarUrl);
      } else {
        toast.success("Avatar updated.");
      }
    });
  }

  return (
    <div className="flex items-center gap-4 pb-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={pending}
        className="group relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-lg font-semibold text-primary ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {preview ? (
          <img src={preview} alt="Avatar" className="size-full object-cover" />
        ) : (
          initials
        )}
        {pending ? (
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
            <Spinner size="sm" className="text-white" />
          </span>
        ) : (
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition group-hover:opacity-100">
            <Camera className="size-4 text-white" />
          </span>
        )}
      </button>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <div>
        <p className="text-sm font-medium">Profile photo</p>
        <p className="text-xs text-muted-foreground">Recommended 512×512 px · Max 2.5 MB · JPG, PNG or WebP.</p>
      </div>
    </div>
  );
}
