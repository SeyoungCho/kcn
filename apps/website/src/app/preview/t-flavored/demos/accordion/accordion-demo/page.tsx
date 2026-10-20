"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/t-flavored/ui/accordion";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const questions = ["points", "subscription", "fee"] as const;

export default function AccordionDemo() {
  const t = usePreviewDictionary().demos.tFlavored.accordion;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Accordion multiple className="max-w-[400px]">
        {questions.map((question) => (
          <AccordionItem key={question} value={question}>
            <AccordionTrigger>
              <span className="text-primary">{t.prefix}</span>
              {t.faq[question].question}
            </AccordionTrigger>
            <AccordionContent>{t.faq[question].answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
