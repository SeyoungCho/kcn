"use client";

import { IdentityPlaceholder } from "@repo/seed/ui/identity-placeholder";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function IdentityPlaceholderDefaultDemo() {
  const t = usePreviewDictionary().demos.identityPlaceholder;

  return (
    <div className="flex min-h-screen items-center justify-center gap-6 p-8">
      {/* IdentityPlaceholder fills its parent, so the parent sets the size and shape. */}
      <div className="size-16 overflow-hidden rounded-full">
        <IdentityPlaceholder identity="person" label={t.person} />
      </div>
      <div className="size-16 overflow-hidden rounded-full">
        <IdentityPlaceholder identity="business" label={t.business} />
      </div>
    </div>
  );
}
