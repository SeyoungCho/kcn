"use client";

import { Tabs, TabsList, TabsTrigger } from "@repo/t-flavored/ui/tabs";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const categories = [
  "all",
  "foliage",
  "succulents",
  "herbs",
  "flowers",
  "potsTools",
  "easyCare",
  "petSafe",
  "newArrivals",
  "sale",
] as const;

export default function TabsFluidDemo() {
  const t = usePreviewDictionary().demos.tFlavored.tabs;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[360px] flex-col gap-6">
        <Tabs defaultValue="all">
          <TabsList fluid>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {t.categories[category]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Tabs defaultValue="all">
          <TabsList variant="line" fluid>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {t.categories[category]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
