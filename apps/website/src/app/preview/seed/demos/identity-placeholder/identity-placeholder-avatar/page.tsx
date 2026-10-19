"use client";

import { Avatar } from "@repo/seed/ui/avatar";
import { IdentityPlaceholder } from "@repo/seed/ui/identity-placeholder";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sizes = [24, 36, 48, 64, 80] as const;

export default function IdentityPlaceholderAvatarDemo() {
  const t = usePreviewDictionary().demos.identityPlaceholder;

  return (
    <div
      className="flex min-h-screen flex-wrap items-center justify-center gap-4
        p-8"
    >
      {sizes.map((size) => (
        <Avatar
          key={size}
          size={size}
          fallback={<IdentityPlaceholder label={t.person} />}
        />
      ))}
    </div>
  );
}
