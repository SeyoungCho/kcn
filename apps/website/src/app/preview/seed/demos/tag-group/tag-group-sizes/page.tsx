"use client";

import { TagGroupItem, TagGroupRoot } from "@repo/seed/ui/tag-group";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sizes = ["t2", "t3", "t4"] as const;
const tones = ["neutralSubtle", "neutral", "brand"] as const;

export default function TagGroupSizesDemo() {
  const t = usePreviewDictionary().demos.tagGroup;

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-3
        p-8"
    >
      {sizes.map((size) => (
        <TagGroupRoot key={size} size={size}>
          <TagGroupItem label={t.location} />
          <TagGroupItem label={t.time} />
          <TagGroupItem label={t.visits} />
        </TagGroupRoot>
      ))}
      <TagGroupRoot size="t3" weight="bold">
        {tones.map((tone) => (
          <TagGroupItem key={tone} tone={tone} label={t.tones[tone]} />
        ))}
      </TagGroupRoot>
    </div>
  );
}
