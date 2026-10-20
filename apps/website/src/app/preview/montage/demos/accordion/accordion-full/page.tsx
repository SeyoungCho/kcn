"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/montage/ui/accordion";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function AccordionFullDemo() {
  const t = usePreviewDictionary().demos.montage.accordion;
  const items = [
    {
      value: "watering",
      title: t.faq.watering.title,
      content: t.faq.watering.content,
    },
    {
      value: "damaged",
      title: t.faq.damaged.title,
      content: t.faq.damaged.content,
    },
    {
      value: "pet-safe",
      title: t.faq.petSafe.title,
      content: t.faq.petSafe.content,
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Accordion
        variant="full"
        size="default"
        className="max-w-[400px] rounded-16 bg-surface-elevated-primary py-2
          shadow-sm"
      >
        {items.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
