"use client";

import { ContentPlaceholder } from "@repo/seed/ui/content-placeholder";
import { ImageFrame } from "@repo/seed/ui/image-frame";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const ratios = [
  { key: "square", ratio: 1 },
  { key: "standard", ratio: 4 / 3 },
  { key: "wide", ratio: 16 / 9 },
] as const;

export default function ImageFrameRatiosDemo() {
  const t = usePreviewDictionary().demos.imageFrame;

  return (
    <div className="flex min-h-screen flex-wrap items-end justify-center gap-4
      p-8">
      {ratios.map(({ key, ratio }) => (
        <figure key={key} className="m-0 flex w-40 flex-col gap-2">
          <ImageFrame
            ratio={ratio}
            src="https://picsum.photos/seed/monstera/600/400"
            alt={t.alt}
            fallback={<ContentPlaceholder />}
          />
          <figcaption className="text-center text-t3 text-fg-neutral-subtle">
            {t.ratios[key]}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
