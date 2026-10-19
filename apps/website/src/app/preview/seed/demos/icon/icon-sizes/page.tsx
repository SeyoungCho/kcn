"use client";

import IconHeartLine from "@karrotmarket/react-monochrome-icon/IconHeartLine";
import { Icon } from "@repo/seed/ui/icon";

const sizes = ["x4", "x5", "x6", "x8", 40] as const;

export default function IconSizesDemo() {
  return (
    <div className="flex min-h-screen items-end justify-center gap-6 p-8">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon svg={<IconHeartLine />} size={size} />
          <span className="text-t2 text-fg-neutral-subtle">
            {typeof size === "number" ? `${size}px` : size}
          </span>
        </div>
      ))}
    </div>
  );
}
