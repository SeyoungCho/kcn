"use client";

import {
  List,
  ListRadioGroup,
  ListRadioItem,
  ListRadiomark,
} from "@repo/seed/ui/list";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ListRadioDemo() {
  const t = usePreviewDictionary().demos.list;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[360px]">
        <List
          render={
            <ListRadioGroup defaultValue="pickup" aria-label={t.radio.label} />
          }
        >
          <ListRadioItem
            value="pickup"
            prefix={<ListRadiomark />}
            title={t.radio.options.pickup.title}
            detail={t.radio.options.pickup.detail}
          />
          <ListRadioItem
            value="parcel"
            prefix={<ListRadiomark />}
            title={t.radio.options.parcel.title}
            detail={t.radio.options.parcel.detail}
          />
          <ListRadioItem
            value="quick"
            disabled
            prefix={<ListRadiomark />}
            title={t.radio.options.quick.title}
            detail={t.radio.options.quick.detail}
          />
        </List>
      </div>
    </div>
  );
}
