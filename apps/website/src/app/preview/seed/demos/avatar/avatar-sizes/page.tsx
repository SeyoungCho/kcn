"use client";

import { Avatar } from "@repo/seed/ui/avatar";
import { IdentityPlaceholder } from "@repo/seed/ui/identity-placeholder";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sizes = [20, 24, 36, 42, 48, 56, 64, 80, 96, 108] as const;

export default function AvatarSizesDemo() {
  const t = usePreviewDictionary().demos.avatar;

  return (
    <div
      className="flex min-h-screen flex-wrap items-center justify-center gap-3
        p-8"
    >
      {sizes.map((size) => (
        <Avatar
          key={size}
          size={size}
          src="https://picsum.photos/seed/kcn-avatar/200/200"
          alt={t.haneul}
          fallback={<IdentityPlaceholder label={t.haneul} />}
        />
      ))}
    </div>
  );
}
