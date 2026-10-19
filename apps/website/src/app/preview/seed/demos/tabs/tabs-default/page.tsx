"use client";

import {
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "@repo/seed/ui/tabs";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const tabs = ["posts", "reviews", "likes"] as const;

export default function TabsDefaultDemo() {
  const t = usePreviewDictionary().demos.tabs;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <TabsRoot defaultValue="posts" className="w-full max-w-[400px]">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {t.tabs[tab]}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent
            key={tab}
            value={tab}
            className="px-x4 py-x4 text-t4 text-fg-neutral-subtle"
          >
            {t.content[tab]}
          </TabsContent>
        ))}
      </TabsRoot>
    </div>
  );
}
