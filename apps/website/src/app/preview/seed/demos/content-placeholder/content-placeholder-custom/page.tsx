"use client";

import IconTriangleRightFill from "@karrotmarket/react-monochrome-icon/IconTriangleRightFill";
import { ContentPlaceholder } from "@repo/seed/ui/content-placeholder";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ContentPlaceholderCustomDemo() {
  const t = usePreviewDictionary().demos.contentPlaceholder;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div
        className="aspect-video w-full max-w-[320px] overflow-hidden rounded-r4"
      >
        <ContentPlaceholder role="img" aria-label={t.custom}>
          <IconTriangleRightFill />
        </ContentPlaceholder>
      </div>
    </div>
  );
}
