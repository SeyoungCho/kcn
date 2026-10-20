"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/montage/ui/tabs";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TabsDemo() {
  const t = usePreviewDictionary().demos.montage.tabs;
  const sections = [
    {
      value: "details",
      label: t.sections.details,
      content: t.content.details,
    },
    { value: "care", label: t.sections.care, content: t.content.care },
    { value: "reviews", label: t.sections.reviews, content: t.content.reviews },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Tabs defaultValue="details" className="w-full max-w-[400px]">
        <TabsList variant="line">
          {sections.map((section) => (
            <TabsTrigger key={section.value} value={section.value}>
              {section.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {sections.map((section) => (
          <TabsContent
            key={section.value}
            value={section.value}
            className="py-3 text-body2-reading text-fg-neutral-secondary"
          >
            {section.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
