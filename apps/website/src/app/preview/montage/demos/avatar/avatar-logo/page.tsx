"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@repo/montage/ui/avatar";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sizes = ["sm", "default", "lg", "xl", "2xl"] as const;

export default function AvatarLogoDemo() {
  const t = usePreviewDictionary().demos.montage.avatar;

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-4
        p-8"
    >
      <div className="flex items-center gap-3">
        {sizes.map((size) => (
          <Avatar key={size} size={size} variant="logo">
            <AvatarImage
              src="https://picsum.photos/seed/kcn-company/200/200"
              alt={t.shopName}
            />
            <AvatarFallback />
          </Avatar>
        ))}
      </div>
      <div className="flex items-center gap-3">
        {sizes.map((size) => (
          <Avatar key={size} size={size} variant="logo">
            <AvatarFallback />
          </Avatar>
        ))}
      </div>
    </div>
  );
}
