"use client";

import { Avatar } from "@repo/seed/ui/avatar";
import { IdentityPlaceholder } from "@repo/seed/ui/identity-placeholder";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function AvatarDefaultDemo() {
  const t = usePreviewDictionary().demos.avatar;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Avatar
        size={64}
        src="https://picsum.photos/seed/kcn-avatar/200/200"
        alt={t.alt}
        fallback={<IdentityPlaceholder label={t.noPhoto} />}
      />
    </div>
  );
}
