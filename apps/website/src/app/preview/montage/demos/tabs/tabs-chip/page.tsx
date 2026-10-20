"use client";

import { Tabs, TabsList, TabsTrigger } from "@repo/montage/ui/tabs";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TabsChipDemo() {
  const t = usePreviewDictionary().demos.montage.tabs;
  const categories = [
    { value: "all", label: t.categories.all },
    { value: "foliage", label: t.categories.foliage },
    { value: "succulents", label: t.categories.succulents },
    { value: "herbs", label: t.categories.herbs },
    { value: "flowers", label: t.categories.flowers },
    { value: "pots-tools", label: t.categories.potsTools },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[400px] flex-col gap-6">
        {(["chip", "chip-primary"] as const).map((variant) => (
          <Tabs key={variant} defaultValue="all">
            <TabsList variant={variant}>
              {categories.map((category) => (
                <TabsTrigger key={category.value} value={category.value}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        ))}
      </div>
    </div>
  );
}
