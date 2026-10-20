"use client";

import { ContentPlaceholder } from "@repo/seed/ui/content-placeholder";
import { ImageFrame } from "@repo/seed/ui/image-frame";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ImageFrameDefaultDemo() {
  const t = usePreviewDictionary().demos.imageFrame;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <ImageFrame
        className="w-full max-w-[320px]"
        src="https://picsum.photos/seed/monstera/600/400"
        alt={t.alt}
        stroke
        fallback={<ContentPlaceholder />}
      />
    </div>
  );
}
