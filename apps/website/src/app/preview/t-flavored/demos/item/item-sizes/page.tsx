"use client";

import * as React from "react";
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from "@repo/t-flavored/ui/item";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sizes = ["sm", "default", "lg", "xl"] as const;

export default function ItemSizesDemo() {
  const t = usePreviewDictionary().demos.tFlavored.item;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <ItemGroup className="max-w-[400px]">
        {sizes.map((size, index) => (
          <React.Fragment key={size}>
            {index > 0 && <ItemSeparator />}
            <Item size={size}>
              <ItemContent>
                <ItemTitle className="font-medium text-grey-700">
                  {t.sizes[size]}
                </ItemTitle>
              </ItemContent>
            </Item>
          </React.Fragment>
        ))}
      </ItemGroup>
    </div>
  );
}
