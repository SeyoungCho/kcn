"use client";

import { TabsList, TabsRoot, TabsTrigger } from "@repo/seed/ui/tabs";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const tabs = ["posts", "reviews", "likes", "settings"] as const;
const sizes = ["small", "medium"] as const;

export default function TabsSizesDemo() {
  const t = usePreviewDictionary().demos.tabs;

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-6
        p-8"
    >
      {sizes.map((size) => (
        <TabsRoot
          key={size}
          defaultValue="posts"
          size={size}
          className="w-full max-w-[400px]"
        >
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab} value={tab} disabled={tab === "settings"}>
                {t.tabs[tab]}
              </TabsTrigger>
            ))}
          </TabsList>
        </TabsRoot>
      ))}
    </div>
  );
}
