"use client";

import { Tabs, TabsList, TabsTrigger } from "@repo/montage/ui/tabs";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TabsFittedDemo() {
  const t = usePreviewDictionary().demos.montage.tabs;
  const sections = [
    { value: "details", label: t.sections.details },
    { value: "care", label: t.sections.care },
    { value: "reviews", label: t.sections.reviews },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Tabs defaultValue="details" className="w-full max-w-[400px]">
        <TabsList variant="line" fitted>
          {sections.map((section) => (
            <TabsTrigger key={section.value} value={section.value}>
              {section.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
