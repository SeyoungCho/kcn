"use client";

import { TabsList, TabsRoot, TabsTrigger } from "@repo/seed/ui/tabs";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const tabs = ["posts", "reviews", "likes", "following", "followers"] as const;
const layouts = ["fill", "hug"] as const;

export default function TabsLayoutsDemo() {
  const t = usePreviewDictionary().demos.tabs;

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-6
        p-8"
    >
      {layouts.map((layout) => (
        <TabsRoot
          key={layout}
          defaultValue="posts"
          triggerLayout={layout}
          className="w-full max-w-[400px]"
        >
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                {t.tabs[tab]}
              </TabsTrigger>
            ))}
          </TabsList>
        </TabsRoot>
      ))}
    </div>
  );
}
