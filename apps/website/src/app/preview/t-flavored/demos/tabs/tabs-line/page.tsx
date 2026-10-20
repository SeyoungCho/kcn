"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/t-flavored/ui/tabs";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sections = ["details", "reviews", "care"] as const;

export default function TabsLineDemo() {
  const t = usePreviewDictionary().demos.tFlavored.tabs;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Tabs defaultValue="details" className="w-full max-w-[400px]">
        <TabsList variant="line">
          {sections.map((section) => (
            <TabsTrigger key={section} value={section}>
              {t.sections[section]}
            </TabsTrigger>
          ))}
        </TabsList>
        {sections.map((section) => (
          <TabsContent
            key={section}
            value={section}
            className="px-6 py-3 text-t6 text-grey-700"
          >
            {t.sectionContent[section]}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
