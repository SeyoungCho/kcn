"use client";

import { Tabs, TabsList, TabsTrigger } from "@repo/montage/ui/tabs";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TabsSegmentedDemo() {
  const t = usePreviewDictionary().demos.montage.tabs;
  const periods = [
    { value: "day", label: t.periods.day },
    { value: "week", label: t.periods.week },
    { value: "month", label: t.periods.month },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Tabs defaultValue="week" className="w-full max-w-[335px]">
        <TabsList>
          {periods.map((period) => (
            <TabsTrigger key={period.value} value={period.value}>
              {period.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
