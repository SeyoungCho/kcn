"use client";

import { Tabs, TabsList, TabsTrigger } from "@repo/montage/ui/tabs";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TabsDisabledDemo() {
  const t = usePreviewDictionary().demos.montage.tabs;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[400px] flex-col gap-6">
        <Tabs defaultValue="details">
          <TabsList variant="line">
            <TabsTrigger value="details">{t.sections.details}</TabsTrigger>
            <TabsTrigger value="care">{t.sections.care}</TabsTrigger>
            <TabsTrigger value="reviews" disabled>
              {t.sections.reviews}
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Tabs defaultValue="day">
          <TabsList>
            <TabsTrigger value="day">{t.periods.day}</TabsTrigger>
            <TabsTrigger value="week">{t.periods.week}</TabsTrigger>
            <TabsTrigger value="month" disabled>
              {t.periods.month}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
