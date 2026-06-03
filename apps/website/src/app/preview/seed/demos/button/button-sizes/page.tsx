"use client";

import { Button } from "@repo/seed/ui/button";
import { Book } from "lucide-react";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sizes = [
  ["xs", "xs"],
  ["sm", "sm"],
  ["md", "md"],
  ["lg", "lg"],
] as const;

export default function ButtonSizesDemo() {
  const t = usePreviewDictionary().demos.button;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex flex-col flex-wrap items-center justify-center gap-3">
        <div
          className="flex flex-row flex-wrap items-center justify-center gap-3"
        >
          {sizes.map(([size, label]) => (
            <Button key={size} size={size}>
              {label}
            </Button>
          ))}
        </div>

        <div
          className="flex flex-row flex-wrap items-center justify-center gap-3"
        >
          {sizes.map(([size]) => (
            <Button
              key={`${size}-icon`}
              aria-label={t.iconButtonLabel.replace("{size}", size)}
              layout="iconOnly"
              size={size}
            >
              <Book />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
