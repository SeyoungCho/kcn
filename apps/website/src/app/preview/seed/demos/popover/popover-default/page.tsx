"use client";

import { ActionButton } from "@repo/seed/ui/action-button";
import {
  PopoverAction,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverRoot,
  PopoverTrigger,
} from "@repo/seed/ui/popover";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function PopoverDefaultDemo() {
  const t = usePreviewDictionary().demos.popover;

  return (
    <div className="flex min-h-screen justify-center p-8 pt-16">
      <PopoverRoot>
        <PopoverTrigger render={<ActionButton variant="neutralWeak" />}>
          {t.open}
        </PopoverTrigger>
        <PopoverContent title={t.title} description={t.description}>
          <PopoverBody>
            <p className="m-0 text-t4 text-fg-neutral">{t.body}</p>
          </PopoverBody>
          <PopoverFooter>
            <PopoverAction>{t.confirm}</PopoverAction>
          </PopoverFooter>
        </PopoverContent>
      </PopoverRoot>
    </div>
  );
}
