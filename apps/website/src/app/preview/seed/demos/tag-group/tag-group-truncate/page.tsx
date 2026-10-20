"use client";

import { TagGroupItem, TagGroupRoot } from "@repo/seed/ui/tag-group";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TagGroupTruncateDemo() {
  const t = usePreviewDictionary().demos.tagGroup;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-[200px] flex-col gap-3">
        <TagGroupRoot truncate>
          <TagGroupItem label={t.long} />
          <TagGroupItem label={t.time} />
          <TagGroupItem label={t.visits} />
        </TagGroupRoot>
        <TagGroupRoot>
          <TagGroupItem label={t.long} />
          <TagGroupItem label={t.time} />
          <TagGroupItem label={t.visits} />
        </TagGroupRoot>
      </div>
    </div>
  );
}
