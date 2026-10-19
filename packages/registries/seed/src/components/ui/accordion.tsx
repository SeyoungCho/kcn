import * as React from "react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import IconChevronDownSmallLine from "@karrotmarket/react-monochrome-icon/IconChevronDownSmallLine";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { useScaleFeedback } from "@/lib/use-scale-feedback";
import { cn } from "@/lib/utils";

// 누를 때 바탕은 그대로 두고 안의 내용만 줄이는 상자(SEED 의 content scale) — 부모의 배치(flex · gap …)를 그대로 물려받아 없는 것처럼 놓인다.
// 줄이는 비율은 부모가 --content-scale 로 준다.
const CONTENT_SCALE = [
  "[display:inherit] [flex-direction:inherit] [flex-wrap:inherit] [align-items:inherit] [align-content:inherit]",
  "[justify-content:inherit] [justify-items:inherit] [gap:inherit]",
  "grid-cols-[inherit] grid-rows-[inherit] [grid-template-areas:inherit]",
  "[grid-auto-flow:inherit] auto-cols-[inherit] auto-rows-[inherit]",
  "min-h-0 min-w-0 flex-auto [grid-area:1/1/-1/-1] place-self-stretch",
  "scale-(--content-scale) [transition:var(--feedback-scale-transition)]",
].join(" ");

const accordionVariants = cva("flex w-full flex-col", {
  variants: {
    /** inline = 줄 사이에 가는 선, separated = 항목마다 테두리를 두른 상자 */
    variant: { inline: "", separated: "" },
    /** responsive = 768px 부터 large, 그 아래는 medium */
    size: { medium: "", large: "", responsive: "" },
  },
  compoundVariants: [
    { variant: "separated", size: "medium", className: "gap-x3" },
    { variant: "separated", size: "large", className: "gap-x4" },
    {
      variant: "separated",
      size: "responsive",
      className: "gap-x3 mobile:gap-x4",
    },
  ],
  defaultVariants: { variant: "inline", size: "medium" },
});

const accordionItemVariants = cva("flex w-full flex-col", {
  variants: {
    variant: {
      inline: `relative not-last:after:absolute not-last:after:inset-x-x3
      not-last:after:bottom-0 not-last:after:h-px
      not-last:after:bg-stroke-neutral-subtle not-last:after:content-['']`,
      separated:
        "overflow-hidden rounded-r3 inset-ring inset-ring-stroke-neutral-weak",
    },
  },
  defaultVariants: { variant: "inline" },
});

// 손을 댔을 때의 바탕은 ::before 로 그린다 — inline 은 양옆이 안으로 들어가며 모서리가 둥글어진다.
const accordionTriggerVariants = cva(
  [
    `group/accordion-trigger relative isolate flex w-full cursor-pointer
    items-center border-0 bg-transparent p-0 px-x-global-gutter`,
    "font-[inherit] text-start data-disabled:cursor-not-allowed",
    `outline-solid outline-(length:--dimension-x0_5)
    outline-offset-(--dimension-x0_5) outline-transparent
    focused:outline-stroke-focus-ring`,
    "transition-[outline-color] duration-d3 ease-easing",
    `[--content-scale:1]
    pressed:not-data-disabled:[--content-scale:var(--feedback-scale)]`,
    `before:absolute before:inset-0 before:-z-1 before:duration-color-transition
    before:ease-easing before:content-['']`,
    "engaged:not-data-disabled:before:bg-bg-transparent-pressed",
  ],
  {
    variants: {
      variant: {
        inline: [
          "before:transition-[background-color,inset-inline,border-radius]",
          `engaged:not-data-disabled:before:inset-x-x1.5
          engaged:not-data-disabled:before:rounded-(--dimension-x2_5)`,
        ],
        separated: "before:transition-[background-color]",
      },
      size: {
        medium: "py-x4",
        large: "py-x5",
        responsive: "py-x4 mobile:py-x5",
      },
    },
    defaultVariants: { variant: "inline", size: "medium" },
  },
);

const accordionTitleVariants = cva(
  `font-medium text-fg-neutral
  group-data-disabled/accordion-trigger:text-fg-disabled`,
  {
    variants: {
      size: {
        medium: "text-t5",
        large: "text-t7",
        responsive: "text-t5 mobile:text-t7",
      },
    },
    defaultVariants: { size: "medium" },
  },
);

const accordionDescriptionVariants = cva(
  `font-medium text-fg-neutral-subtle
  group-data-disabled/accordion-trigger:text-fg-disabled`,
  {
    variants: {
      size: {
        medium: "text-t3",
        large: "text-t5",
        responsive: "text-t3 mobile:text-t5",
      },
    },
    defaultVariants: { size: "medium" },
  },
);

type AccordionVariants = VariantProps<typeof accordionVariants>;

// 묶음(Accordion)이 정한 크기 · 변형을 항목과 제목 줄이 물려받는다.
const AccordionContext = React.createContext<AccordionVariants>({});

export interface AccordionProps
  extends
    Omit<
      AccordionPrimitive.Root.Props<string>,
      "className" | "render" | "value" | "defaultValue" | "onValueChange"
    >,
    AccordionVariants {
  /** 펼쳐 둘 항목의 value 들 */
  values?: string[];
  defaultValues?: string[];
  onValuesChange?: (values: string[]) => void;
  className?: string;
}

/** 접었다 펴는 목록. `multiple` 을 주면 여러 항목을 같이 펼 수 있다. */
function Accordion({
  className,
  variant = "inline",
  size = "medium",
  values,
  defaultValues,
  onValuesChange,
  multiple = false,
  ...props
}: AccordionProps) {
  const context = React.useMemo(() => ({ variant, size }), [variant, size]);
  return (
    <AccordionContext.Provider value={context}>
      <AccordionPrimitive.Root<string>
        data-slot="accordion"
        className={cn(accordionVariants({ variant, size }), className)}
        value={values}
        defaultValue={defaultValues}
        onValueChange={(next) => onValuesChange?.(next)}
        multiple={multiple}
        {...props}
      />
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps extends Omit<
  AccordionPrimitive.Item.Props,
  "className" | "render" | "value"
> {
  value: string;
  className?: string;
}

function AccordionItem({ className, ...props }: AccordionItemProps) {
  const { variant } = React.useContext(AccordionContext);
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(accordionItemVariants({ variant }), className)}
      {...props}
    />
  );
}

export interface AccordionTriggerProps extends Omit<
  AccordionPrimitive.Trigger.Props,
  "className" | "render" | "children" | "title" | "prefix"
> {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** 제목 앞에 놓는 것(아이콘 …) */
  prefix?: React.ReactNode;
  /** 오른쪽 끝의 아이콘 — 안 주면 아래 화살표. 펼치면 반 바퀴 돈다 */
  suffixIcon?: React.ReactNode;
  /** 제목 요소의 단계(h1 ~ h6) */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

const HEADINGS = {
  1: <h1 />,
  2: <h2 />,
  3: <h3 />,
  4: <h4 />,
  5: <h5 />,
  6: <h6 />,
} as const;

/** 항목의 제목 줄 — 누르면 접히고 펴진다. */
function AccordionTrigger({
  ref,
  className,
  title,
  description,
  prefix,
  suffixIcon,
  headingLevel = 3,
  ...props
}: AccordionTriggerProps) {
  const { variant, size } = React.useContext(AccordionContext);
  const { scaleFeedbackRef, scaleFeedbackClassName } =
    useScaleFeedback<HTMLElement>(ref);
  return (
    <AccordionPrimitive.Header
      data-slot="accordion-header"
      render={HEADINGS[headingLevel]}
      className="m-0 flex p-0 [font:inherit]"
    >
      <AccordionPrimitive.Trigger
        ref={scaleFeedbackRef}
        data-slot="accordion-trigger"
        className={cn(
          scaleFeedbackClassName,
          accordionTriggerVariants({ variant, size }),
          className,
        )}
        {...props}
      >
        <span data-slot="accordion-trigger-content" className={CONTENT_SCALE}>
          {prefix ? (
            <div
              data-slot="accordion-prefix"
              className="mr-x3 inline-flex shrink-0 items-center
                [--icon-color:var(--fg-neutral)] [--icon-size:22px]
                group-data-disabled/accordion-trigger:[--icon-color:var(--fg-disabled)]"
            >
              {prefix}
            </div>
          ) : null}
          <div
            data-slot="accordion-body"
            className="flex min-w-0 flex-1 flex-col gap-x0.5"
          >
            <span
              data-slot="accordion-title"
              className={accordionTitleVariants({ size })}
            >
              {title}
            </span>
            {description ? (
              <span
                data-slot="accordion-description"
                className={accordionDescriptionVariants({ size })}
              >
                {description}
              </span>
            ) : null}
          </div>
          <div
            data-slot="accordion-suffix-icon"
            className={cn(
              `ml-auto inline-flex shrink-0 items-center text-fg-neutral-subtle
              group-data-disabled/accordion-trigger:text-fg-disabled`,
              `transform-[rotate(0deg)] transition-[transform] duration-d6
              ease-easing
              group-data-panel-open/accordion-trigger:transform-[rotate(180deg)]`,
            )}
          >
            {suffixIcon ?? <IconChevronDownSmallLine />}
          </div>
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export interface AccordionContentProps extends Omit<
  AccordionPrimitive.Panel.Props,
  "className" | "render"
> {
  className?: string;
}

/** 항목의 내용 — 높이와 투명도가 같이 바뀌며 접히고 펴진다. 높이는 Base UI 가 재서 --accordion-panel-height 로 준다. */
function AccordionContent({ className, ...props }: AccordionContentProps) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={cn(
        `h-(--accordion-panel-height) overflow-hidden opacity-100
        [transition:height_var(--motion-duration-d6)_var(--motion-ease-easing),opacity_var(--motion-duration-d6)_var(--motion-ease-easing)]`,
        `data-starting-style:h-0 data-starting-style:opacity-0
        data-ending-style:h-0 data-ending-style:opacity-0`,
        className,
      )}
      {...props}
    />
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
