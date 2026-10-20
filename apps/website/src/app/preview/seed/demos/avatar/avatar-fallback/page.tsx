"use client";

import { Avatar } from "@repo/seed/ui/avatar";
import { IdentityPlaceholder } from "@repo/seed/ui/identity-placeholder";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function AvatarFallbackDemo() {
  const t = usePreviewDictionary().demos.avatar;

  return (
    <div className="flex min-h-screen items-center justify-center gap-4 p-8">
      <Avatar size={64} fallback={<IdentityPlaceholder label={t.doyun} />} />
      <Avatar
        size={64}
        fallback={<IdentityPlaceholder identity="business" label={t.shop} />}
      />
      <Avatar
        size={64}
        src="https://invalid.example/missing.png"
        alt={t.seoyeon}
        fallback={<IdentityPlaceholder label={t.seoyeon} />}
      />
    </div>
  );
}
