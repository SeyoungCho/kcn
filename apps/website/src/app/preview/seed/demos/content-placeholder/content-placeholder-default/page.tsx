"use client";

import { ContentPlaceholder } from "@repo/seed/ui/content-placeholder";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ContentPlaceholderDefaultDemo() {
  const t = usePreviewDictionary().demos.contentPlaceholder;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      {/* ContentPlaceholder fills its parent, so the parent sets the size. */}
      <div className="size-40 overflow-hidden rounded-r4">
        <ContentPlaceholder role="img" aria-label={t.label} />
      </div>
    </div>
  );
}
