"use client";

import { Folder } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/montage/ui/avatar";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function AvatarFallbackDemo() {
  const t = usePreviewDictionary().demos.montage.avatar;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex items-center gap-3">
        <Avatar size="lg">
          <AvatarImage
            src="https://invalid.example/missing.png"
            alt={t.members.doyun}
          />
          <AvatarFallback />
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>
            <Folder />
          </AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback className="bg-surface-brand-primary">
            {t.initial}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
