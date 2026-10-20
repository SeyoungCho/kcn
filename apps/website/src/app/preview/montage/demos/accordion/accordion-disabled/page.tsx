"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/montage/ui/accordion";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function AccordionDisabledDemo() {
  const t = usePreviewDictionary().demos.montage.accordion;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Accordion className="max-w-[400px]">
        <AccordionItem value="watering">
          <AccordionTrigger>{t.faq.watering.title}</AccordionTrigger>
          <AccordionContent>{t.faq.watering.content}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="damaged" disabled>
          <AccordionTrigger>{t.faq.damaged.title}</AccordionTrigger>
          <AccordionContent>{t.faq.damaged.content}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
