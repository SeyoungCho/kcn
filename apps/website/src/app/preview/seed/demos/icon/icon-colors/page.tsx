"use client";

import IconStarFill from "@karrotmarket/react-monochrome-icon/IconStarFill";
import { Icon } from "@repo/seed/ui/icon";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const colors = [
  { key: "neutral", value: "var(--fg-neutral)" },
  { key: "brand", value: "var(--fg-brand)" },
  { key: "critical", value: "var(--fg-critical)" },
] as const;

export default function IconColorsDemo() {
  const t = usePreviewDictionary().demos.icon;

  return (
    <div className="flex min-h-screen items-center justify-center gap-8 p-8">
      {colors.map(({ key, value }) => (
        <div key={key} className="flex flex-col items-center gap-2">
          <Icon svg={<IconStarFill />} size="x6" color={value} />
          <span className="text-t2 text-fg-neutral-subtle">
            {t.colors[key]}
          </span>
        </div>
      ))}
    </div>
  );
}
