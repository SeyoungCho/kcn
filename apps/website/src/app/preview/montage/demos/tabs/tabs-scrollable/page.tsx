"use client";

import { Tabs, TabsList, TabsTrigger } from "@repo/montage/ui/tabs";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TabsScrollableDemo() {
  const t = usePreviewDictionary().demos.montage.tabs;
  const categories = [
    { value: "all", label: t.categories.all },
    { value: "foliage", label: t.categories.foliage },
    { value: "succulents", label: t.categories.succulents },
    { value: "herbs", label: t.categories.herbs },
    { value: "flowers", label: t.categories.flowers },
    { value: "pots-tools", label: t.categories.potsTools },
    { value: "easy-care", label: t.categories.easyCare },
    { value: "pet-safe", label: t.categories.petSafe },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[320px] flex-col gap-6">
        <Tabs defaultValue="all">
          <TabsList variant="line">
            {categories.map((category) => (
              <TabsTrigger key={category.value} value={category.value}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Tabs defaultValue="all">
          <TabsList variant="chip">
            {categories.map((category) => (
              <TabsTrigger key={category.value} value={category.value}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
