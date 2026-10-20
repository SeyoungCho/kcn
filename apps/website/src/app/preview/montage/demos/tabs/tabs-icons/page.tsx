"use client";

import { LayoutGridIcon, ListIcon, MapIcon } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@repo/montage/ui/tabs";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TabsIconsDemo() {
  const t = usePreviewDictionary().demos.montage.tabs;
  const views = [
    { value: "list", label: t.views.list, icon: ListIcon },
    { value: "grid", label: t.views.grid, icon: LayoutGridIcon },
    { value: "map", label: t.views.map, icon: MapIcon },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[335px] flex-col items-center gap-6">
        <Tabs defaultValue="list" className="w-full">
          <TabsList>
            {views.map((view) => (
              <TabsTrigger key={view.value} value={view.value}>
                <view.icon />
                {view.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Tabs defaultValue="list">
          <TabsList fitted={false}>
            {views.map((view) => (
              <TabsTrigger
                key={view.value}
                value={view.value}
                aria-label={view.label}
              >
                <view.icon />
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
