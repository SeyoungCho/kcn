"use client";

import { TagGroupItem, TagGroupRoot } from "@repo/seed/ui/tag-group";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TagGroupDefaultDemo() {
  const t = usePreviewDictionary().demos.tagGroup;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <TagGroupRoot>
        <TagGroupItem label={t.location} />
        <TagGroupItem label={t.time} />
        <TagGroupItem label={t.views} />
      </TagGroupRoot>
    </div>
  );
}
