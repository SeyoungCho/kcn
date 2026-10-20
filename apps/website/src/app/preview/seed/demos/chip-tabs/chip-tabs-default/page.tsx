"use client";

import {
  ChipTabsContent,
  ChipTabsList,
  ChipTabsRoot,
  ChipTabsTrigger,
} from "@repo/seed/ui/chip-tabs";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const tabs = ["all", "foliage", "succulents", "herbs"] as const;

export default function ChipTabsDefaultDemo() {
  const t = usePreviewDictionary().demos.chipTabs;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <ChipTabsRoot defaultValue="all" className="w-full max-w-[400px]">
        <ChipTabsList>
          {tabs.map((tab) => (
            <ChipTabsTrigger key={tab} value={tab}>
              {t.tabs[tab]}
            </ChipTabsTrigger>
          ))}
        </ChipTabsList>
        {tabs.map((tab) => (
          <ChipTabsContent
            key={tab}
            value={tab}
            className="px-x4 py-x4 text-t4 text-fg-neutral-subtle"
          >
            {t.content[tab]}
          </ChipTabsContent>
        ))}
      </ChipTabsRoot>
    </div>
  );
}
