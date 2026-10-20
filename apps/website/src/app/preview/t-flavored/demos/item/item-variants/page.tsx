"use client";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@repo/t-flavored/ui/item";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const variants = ["default", "outline", "muted"] as const;

export default function ItemVariantsDemo() {
  const t = usePreviewDictionary().demos.tFlavored.item;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[400px] flex-col gap-3">
        {variants.map((variant) => (
          <Item key={variant} variant={variant}>
            <ItemContent>
              <ItemTitle>{t.variants[variant]}</ItemTitle>
              <ItemDescription>{t.variants.description}</ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </div>
    </div>
  );
}
