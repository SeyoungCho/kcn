"use client";

import { Button } from "@repo/t-flavored/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@repo/t-flavored/ui/drawer";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function DrawerScrollDemo() {
  const t = usePreviewDictionary().demos.tFlavored.drawer;
  const terms = t.scroll.terms;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Drawer>
        <DrawerTrigger render={<Button size="xl" />}>
          {t.scroll.trigger}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t.scroll.title}</DrawerTitle>
            <DrawerDescription>{t.scroll.description}</DrawerDescription>
          </DrawerHeader>
          <ol
            className="flex flex-col gap-4 px-6 text-t6 break-keep
              text-grey-700"
          >
            {terms.map((term, index) => (
              <li key={term}>
                {index + 1}. {term}
              </li>
            ))}
          </ol>
          <DrawerFooter>
            <DrawerClose render={<Button size="xl" />}>
              {t.scroll.agree}
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
