"use client";

import IconCardLine from "@karrotmarket/react-monochrome-icon/IconCardLine";
import IconTruckLine from "@karrotmarket/react-monochrome-icon/IconTruckLine";
import IconArrowUturnLeftLine from "@karrotmarket/react-monochrome-icon/IconArrowUturnLeftLine";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/seed/ui/accordion";
import { Icon } from "@repo/seed/ui/icon";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function AccordionMultipleDemo() {
  const t = usePreviewDictionary().demos.accordion;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[480px]">
        <Accordion multiple defaultValues={["shipping", "returns"]}>
          <AccordionItem value="shipping">
            <AccordionTrigger
              prefix={<Icon svg={<IconTruckLine />} />}
              title={t.items.shipping.title}
              description={t.descriptions.shipping}
            />
            <AccordionContent>
              <p
                className="m-0 px-x-global-gutter pb-x4 text-t4
                  text-fg-neutral-muted"
              >
                {t.items.shipping.content}
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="returns">
            <AccordionTrigger
              prefix={<Icon svg={<IconArrowUturnLeftLine />} />}
              title={t.items.returns.title}
              description={t.descriptions.returns}
            />
            <AccordionContent>
              <p
                className="m-0 px-x-global-gutter pb-x4 text-t4
                  text-fg-neutral-muted"
              >
                {t.items.returns.content}
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="payment" disabled>
            <AccordionTrigger
              prefix={<Icon svg={<IconCardLine />} />}
              title={t.items.payment.title}
              description={t.disabled}
            />
            <AccordionContent>
              <p
                className="m-0 px-x-global-gutter pb-x4 text-t4
                  text-fg-neutral-muted"
              >
                {t.items.payment.content}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
