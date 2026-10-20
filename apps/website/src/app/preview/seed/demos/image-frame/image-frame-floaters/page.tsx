"use client";

import { Badge } from "@repo/seed/ui/badge";
import { ContentPlaceholder } from "@repo/seed/ui/content-placeholder";
import {
  ImageFrame,
  ImageFrameFloater,
  ImageFrameIndicator,
  ImageFrameReactionButton,
} from "@repo/seed/ui/image-frame";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ImageFrameFloatersDemo() {
  const t = usePreviewDictionary().demos.imageFrame;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <ImageFrame
        className="w-full max-w-[320px]"
        ratio={1}
        src="https://picsum.photos/seed/monstera/600/400"
        alt={t.alt}
        fallback={<ContentPlaceholder />}
      >
        <ImageFrameFloater placement="top-start">
          <Badge tone="brand">{t.badge}</Badge>
        </ImageFrameFloater>
        <ImageFrameFloater placement="bottom-end">
          <ImageFrameReactionButton aria-label={t.like} />
        </ImageFrameFloater>
        <ImageFrameFloater placement="bottom-start">
          <ImageFrameIndicator>+9</ImageFrameIndicator>
        </ImageFrameFloater>
      </ImageFrame>
    </div>
  );
}
