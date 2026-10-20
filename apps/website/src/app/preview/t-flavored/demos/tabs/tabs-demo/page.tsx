"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/t-flavored/ui/tabs";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const periods = ["day", "week", "month"] as const;

export default function TabsDemo() {
  const t = usePreviewDictionary().demos.tFlavored.tabs;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Tabs defaultValue="day" className="w-full max-w-[360px]">
        <TabsList>
          {periods.map((period) => (
            <TabsTrigger key={period} value={period}>
              {t.period[period]}
            </TabsTrigger>
          ))}
        </TabsList>
        {periods.map((period) => (
          <TabsContent
            key={period}
            value={period}
            className="px-1 py-3 text-t6 text-grey-700"
          >
            {t.periodContent[period]}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
