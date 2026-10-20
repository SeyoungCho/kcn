"use client";

import { BookmarkIcon, HeartIcon, StarIcon } from "lucide-react";
import { Toggle } from "@repo/montage/ui/toggle";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ToggleIconDemo() {
  const t = usePreviewDictionary().demos.montage.toggle;

  return (
    <div className="flex min-h-screen items-center justify-center gap-6 p-8">
      <Toggle variant="icon" aria-label={t.icon.bookmark}>
        <BookmarkIcon className="group-data-pressed/toggle:fill-current" />
      </Toggle>
      <Toggle variant="icon" defaultPressed aria-label={t.icon.like}>
        <HeartIcon className="group-data-pressed/toggle:fill-current" />
      </Toggle>
      <Toggle
        variant="icon"
        aria-label={t.icon.star}
        className="data-pressed:text-fg-cautionary-primary"
      >
        <StarIcon className="group-data-pressed/toggle:fill-current" />
      </Toggle>
    </div>
  );
}
