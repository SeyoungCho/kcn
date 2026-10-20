"use client";

import { Tabs, TabsList, TabsTrigger } from "@repo/t-flavored/ui/tabs";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const variants = ["default", "line"] as const;
const sizes = ["default", "sm"] as const;
const items = ["first", "second", "third"] as const;

export default function TabsSizesDemo() {
  const t = usePreviewDictionary().demos.tFlavored.tabs;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[400px] flex-col gap-6">
        {variants.map((variant) =>
          sizes.map((size) => (
            <div key={`${variant}-${size}`} className="flex flex-col gap-2">
              <span className="px-1 text-t7 text-grey-600">
                {`variant="${variant}" · `}
                {t.sizes[size]}
              </span>
              <Tabs defaultValue="first">
                <TabsList variant={variant} size={size}>
                  {items.map((item) => (
                    <TabsTrigger key={item} value={item}>
                      {t.items[item]}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          )),
        )}
      </div>
    </div>
  );
}
