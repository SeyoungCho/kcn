"use client";

import { ContentPlaceholder } from "@repo/seed/ui/content-placeholder";
import type { ContentPlaceholderType } from "@repo/seed/ui/content-placeholder";

const types: ContentPlaceholderType[] = [
  "default",
  "coupon",
  "car",
  "realty",
  "food",
  "image",
  "group",
  "post",
  "business",
  "buySell",
  "jobs",
  "commerce",
];

export default function ContentPlaceholderTypesDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
        {types.map((type) => (
          <div key={type} className="flex flex-col items-center gap-1.5">
            <div className="size-20 overflow-hidden rounded-r2">
              <ContentPlaceholder type={type} />
            </div>
            <code className="text-t2 text-fg-neutral-muted">{type}</code>
          </div>
        ))}
      </div>
    </div>
  );
}
