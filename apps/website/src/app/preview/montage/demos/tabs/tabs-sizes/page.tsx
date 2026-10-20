"use client";

import { Tabs, TabsList, TabsTrigger } from "@repo/montage/ui/tabs";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sizes = ["sm", "default", "lg"] as const;

export default function TabsSizesDemo() {
  const t = usePreviewDictionary().demos.montage.tabs;
  const periods = [
    { value: "day", label: t.periods.day },
    { value: "week", label: t.periods.week },
    { value: "month", label: t.periods.month },
  ];
  const sections = [
    { value: "details", label: t.sections.details },
    { value: "care", label: t.sections.care },
    { value: "reviews", label: t.sections.reviews },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[335px] flex-col gap-4">
        {sizes.map((size) => (
          <Tabs key={size} defaultValue="day">
            <TabsList size={size}>
              {periods.map((period) => (
                <TabsTrigger key={period.value} value={period.value}>
                  {period.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        ))}
        {sizes.map((size) => (
          <Tabs key={size} defaultValue="details">
            <TabsList variant="line" size={size}>
              {sections.map((section) => (
                <TabsTrigger key={section.value} value={section.value}>
                  {section.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        ))}
      </div>
    </div>
  );
}
