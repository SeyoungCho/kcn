"use client";

import { Badge } from "@repo/montage/ui/badge";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function BadgeColorsDemo() {
  const t = usePreviewDictionary().demos.montage.badge;

  const colors = [
    { color: "neutral", label: t.colors.neutral },
    { color: "brand", label: t.colors.brand },
    { color: "positive", label: t.colors.positive },
    { color: "cautionary", label: t.colors.cautionary },
    { color: "destructive", label: t.colors.destructive },
    { color: "lime", label: t.colors.lime },
    { color: "cyan", label: t.colors.cyan },
    { color: "light-blue", label: t.colors.lightBlue },
    { color: "violet", label: t.colors.violet },
    { color: "purple", label: t.colors.purple },
    { color: "pink", label: t.colors.pink },
  ] as const;

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-4
        p-8"
    >
      <div className="flex max-w-[480px] flex-wrap justify-center gap-2">
        {colors.map(({ color, label }) => (
          <Badge key={color} color={color}>
            {label}
          </Badge>
        ))}
      </div>
      <div className="flex max-w-[480px] flex-wrap justify-center gap-2">
        {colors.map(({ color, label }) => (
          <Badge key={color} variant="outline" color={color}>
            {label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
