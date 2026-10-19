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
            title={t.check.options.digital.title}
            detail={t.check.options.digital.detail}
            suffix={<ListCheckmark />}
          />
          <ListCheckItem
            title={t.check.options.furniture.title}
            detail={t.check.options.furniture.detail}
            suffix={<ListCheckmark />}
          />
          <ListCheckItem
            defaultChecked
            highlighted
            title={t.check.options.books.title}
            suffix={<ListCheckmark />}
          />
          <ListCheckItem
            disabled
            title={t.check.options.tickets.title}
            detail={t.check.options.tickets.detail}
            suffix={<ListCheckmark />}
          />
        </List>
      </div>
    </div>
  );
}
