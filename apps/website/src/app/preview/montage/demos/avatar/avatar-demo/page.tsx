"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@repo/montage/ui/avatar";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function AvatarDemo() {
  const t = usePreviewDictionary().demos.montage.avatar;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex items-center gap-3">
        <Avatar size="lg">
          <AvatarImage
            src="https://picsum.photos/seed/kcn-avatar/200/200"
            alt={t.members.haneul}
          />
          <AvatarFallback />
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback />
        </Avatar>
        <Avatar size="lg" variant="logo">
          <AvatarFallback />
        </Avatar>
      </div>
    </div>
  );
}
