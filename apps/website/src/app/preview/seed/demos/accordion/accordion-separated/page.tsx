"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/seed/ui/accordion";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const keys = ["shipping", "returns", "payment"] as const;

export default function AccordionSeparatedDemo() {
  const t = usePreviewDictionary().demos.accordion;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[480px]">
        <Accordion variant="separated" size="large" defaultValues={["returns"]}>
          {keys.map((key) => (
            <AccordionItem key={key} value={key}>
              <AccordionTrigger title={t.items[key].title} />
              <AccordionContent>
                <p
                  className="m-0 px-x-global-gutter pb-x5 text-t5
                    text-fg-neutral-muted"
                >
                  {t.items[key].content}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
