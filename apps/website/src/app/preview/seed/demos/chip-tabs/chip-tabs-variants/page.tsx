"use client";

import {
  ChipTabsList,
  ChipTabsRoot,
  ChipTabsTrigger,
} from "@repo/seed/ui/chip-tabs";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const tabs = ["all", "foliage", "succulents", "herbs"] as const;
const examples = [
  { variant: "neutralSolid", size: "medium" },
  { variant: "neutralOutline", size: "medium" },
  { variant: "neutralSolid", size: "large" },
  { variant: "neutralOutline", size: "large" },
] as const;

export default function ChipTabsVariantsDemo() {
  const t = usePreviewDictionary().demos.chipTabs;

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-4
        p-8"
    >
      {examples.map(({ variant, size }) => (
        <ChipTabsRoot
          key={`${variant}-${size}`}
          defaultValue="all"
          variant={variant}
          size={size}
          className="w-full max-w-[400px]"
        >
          <ChipTabsList>
            {tabs.map((tab) => (
              <ChipTabsTrigger key={tab} value={tab}>
                {t.tabs[tab]}
              </ChipTabsTrigger>
            ))}
          </ChipTabsList>
        </ChipTabsRoot>
      ))}
    </div>
  );
}
