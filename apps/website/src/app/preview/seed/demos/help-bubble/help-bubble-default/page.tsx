"use client";

import IconQuestionmarkCircleLine from "@karrotmarket/react-monochrome-icon/IconQuestionmarkCircleLine";
import { ActionButton } from "@repo/seed/ui/action-button";
import {
  HelpBubbleArrow,
  HelpBubbleArrowTip,
  HelpBubbleBody,
  HelpBubbleContent,
  HelpBubbleDescription,
  HelpBubblePositioner,
  HelpBubbleRoot,
  HelpBubbleTitle,
  HelpBubbleTrigger,
} from "@repo/seed/ui/help-bubble";
import { Icon } from "@repo/seed/ui/icon";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function HelpBubbleDefaultDemo() {
  const t = usePreviewDictionary().demos.helpBubble;

  return (
    <div className="flex min-h-screen items-center justify-center p-8 pt-24">
      <HelpBubbleRoot defaultOpen>
        <HelpBubbleTrigger
          render={
            <ActionButton
              variant="neutralWeak"
              layout="iconOnly"
              aria-label={t.trigger}
            />
          }
        >
          <Icon svg={<IconQuestionmarkCircleLine />} />
        </HelpBubbleTrigger>
        <HelpBubblePositioner>
          <HelpBubbleContent>
            <HelpBubbleArrow>
              <HelpBubbleArrowTip />
            </HelpBubbleArrow>
            <HelpBubbleBody>
              <HelpBubbleTitle>{t.title}</HelpBubbleTitle>
              <HelpBubbleDescription>{t.description}</HelpBubbleDescription>
            </HelpBubbleBody>
          </HelpBubbleContent>
        </HelpBubblePositioner>
      </HelpBubbleRoot>
    </div>
  );
}
