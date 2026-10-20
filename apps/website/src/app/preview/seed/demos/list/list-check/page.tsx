"use client";

import { List, ListCheckItem, ListCheckmark } from "@repo/seed/ui/list";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ListCheckDemo() {
  const t = usePreviewDictionary().demos.list;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[360px]">
        <List render={<fieldset aria-label={t.check.label} />}>
          <ListCheckItem
            defaultChecked
            title={t.check.options.foliage.title}
            detail={t.check.options.foliage.detail}
            suffix={<ListCheckmark />}
          />
          <ListCheckItem
            title={t.check.options.succulents.title}
            detail={t.check.options.succulents.detail}
            suffix={<ListCheckmark />}
          />
          <ListCheckItem
            defaultChecked
            highlighted
            title={t.check.options.herbs.title}
            suffix={<ListCheckmark />}
          />
          <ListCheckItem
            disabled
            title={t.check.options.flowers.title}
            detail={t.check.options.flowers.detail}
            suffix={<ListCheckmark />}
          />
        </List>
      </div>
    </div>
  );
}
