"use client";

import IconCheckmarkLine from "@karrotmarket/react-monochrome-icon/IconCheckmarkLine";
import IconLocationpinLine from "@karrotmarket/react-monochrome-icon/IconLocationpinLine";
import IconStarFill from "@karrotmarket/react-monochrome-icon/IconStarFill";
import { TagGroupItem, TagGroupRoot } from "@repo/seed/ui/tag-group";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TagGroupWithIconDemo() {
  const t = usePreviewDictionary().demos.tagGroup;

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-3
        p-8"
    >
      <TagGroupRoot size="t3">
        <TagGroupItem prefixIcon={<IconLocationpinLine />} label={t.location} />
        <TagGroupItem label={t.time} />
        <TagGroupItem
          tone="brand"
          weight="bold"
          prefixIcon={<IconCheckmarkLine />}
          label={t.verified}
        />
      </TagGroupRoot>
      <TagGroupRoot size="t3" tone="neutral">
        <TagGroupItem prefixIcon={<IconStarFill />} label={t.rating} />
        <TagGroupItem label={t.reviews} />
      </TagGroupRoot>
    </div>
  );
}
