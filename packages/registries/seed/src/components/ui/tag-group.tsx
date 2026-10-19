import * as React from "react";
import { cva } from "class-variance-authority";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type TagGroupSize = "t2" | "t3" | "t4";
type TagGroupWeight = "regular" | "bold";
type TagGroupTone = "neutralSubtle" | "neutral" | "brand";

interface TagGroupItemVariants {
  size?: TagGroupSize;
  weight?: TagGroupWeight;
  tone?: TagGroupTone;
}

// 묶음이 정한 크기 · 굵기 · 색조를 항목이 물려받는다(항목에 직접 주면 그 값이 이긴다).
const TagGroupContext = React.createContext<
  TagGroupItemVariants & { truncate?: boolean }
>({});

// 줄바꿈하는 묶음은 글자 크기를 0 으로 두고(요소 사이의 빈칸이 자리를 차지하지 않게) 줄 높이만 정한다.
const rootVariants = cva("", {
  variants: {
    truncate: {
      true: "inline-flex max-w-full items-center",
      false: "inline-block text-[0px]",
    },
    size: { t2: "", t3: "", t4: "" },
  },
  compoundVariants: [
    { truncate: false, size: "t2", className: "leading-t2" },
    { truncate: false, size: "t3", className: "leading-t3" },
    { truncate: false, size: "t4", className: "leading-t4" },
  ],
  defaultVariants: { truncate: false, size: "t2" },
});

const separatorVariants = cva(
  "font-regular whitespace-pre text-gray-600 select-none",
  {
    variants: {
      size: { t2: "text-t2", t3: "text-t3", t4: "text-t4" },
      truncate: { true: "", false: "align-middle" },
    },
    defaultVariants: { size: "t2", truncate: false },
  },
);

const itemVariants = cva("min-w-0 shrink align-middle", {
  variants: {
    truncate: { true: "inline-flex items-baseline", false: "inline" },
    tone: {
      neutralSubtle: "[--icon-color:var(--fg-neutral-subtle)]",
      neutral: "[--icon-color:var(--fg-neutral)]",
      brand: "[--icon-color:var(--fg-brand)]",
    },
  },
  defaultVariants: { truncate: false, tone: "neutralSubtle" },
});

const labelVariants = cva(
  "inline min-w-0 align-middle break-normal not-first:ml-x0.5 not-last:mr-x0.5",
  {
    variants: {
      truncate: {
        true: "overflow-hidden text-ellipsis whitespace-nowrap",
        false: "overflow-visible text-clip whitespace-normal",
      },
      size: { t2: "text-t2", t3: "text-t3", t4: "text-t4" },
      weight: { regular: "font-regular", bold: "font-bold" },
      tone: {
        neutralSubtle: "text-fg-neutral-subtle",
        neutral: "text-fg-neutral",
        brand: "text-fg-brand",
      },
    },
    defaultVariants: {
      truncate: false,
      size: "t2",
      weight: "regular",
      tone: "neutralSubtle",
    },
  },
);

// 아이콘은 글자의 대문자 높이 한가운데에 오게 위아래로 민다 — 미는 양이 글자 크기(em · cap)에 달려 있어 아이콘에도 글자 크기를 준다.
const iconVariants = cva("relative", {
  variants: {
    size: {
      t2: "[--icon-size:var(--dimension-x3)] text-(length:--font-size-t2)",
      t3: "[--icon-size:13px] text-(length:--font-size-t3)",
      t4: "[--icon-size:var(--dimension-x3_5)] text-(length:--font-size-t4)",
    },
    weight: { regular: "font-regular", bold: "font-bold" },
    truncate: { true: "top-[calc(var(--icon-size)/2-0.5cap)]", false: "" },
  },
  compoundVariants: [
    {
      truncate: false,
      size: "t2",
      className: "top-[calc(1em-var(--line-height-t2)/2-0.5cap)]",
    },
    {
      truncate: false,
      size: "t3",
      className: "top-[calc(1em-var(--line-height-t3)/2-0.5cap)]",
    },
    {
      truncate: false,
      size: "t4",
      className: "top-[calc(1em-var(--line-height-t4)/2-0.5cap)]",
    },
  ],
  defaultVariants: { size: "t2", weight: "regular", truncate: false },
});

export interface TagGroupRootProps
  extends React.HTMLAttributes<HTMLSpanElement>, TagGroupItemVariants {
  /** 한 줄에 두고 넘치면 말줄임표로 자른다 */
  truncate?: boolean;
  /** 항목 사이에 넣는 글자 */
  separator?: React.ReactNode;
}

function TagGroupRoot({
  className,
  children,
  size = "t2",
  weight,
  tone,
  truncate = false,
  separator = " · ",
  ...props
}: TagGroupRootProps) {
  const context = React.useMemo(
    () => ({ size, weight, tone, truncate }),
    [size, weight, tone, truncate],
  );
  return (
    <TagGroupContext.Provider value={context}>
      <span
        data-slot="tag-group"
        className={cn(rootVariants({ truncate, size }), className)}
        {...props}
      >
        {React.Children.toArray(children)
          .filter(Boolean)
          .map((child, index) => (
            // 순서가 바뀌지 않는 묶음이라 자리 번호를 key 로 쓴다.
            <React.Fragment key={index}>
              {index > 0 ? (
                <>
                  <span
                    aria-hidden
                    data-slot="tag-group-separator"
                    className={separatorVariants({ size, truncate })}
                  >
                    {separator}
                  </span>
                  {/* 보이는 구분자는 읽히지 않으므로, 읽을 때 항목이 붙지 않게 보이지 않는 쉼표를 둔다.
                      글이 아니라 CSS 의 content 로 — 읽는 이름에는 들어가고 화면의 글(textContent)은 그대로다. */}
                  <span
                    data-slot="tag-group-spoken-separator"
                    className="sr-only before:content-[',_']"
                  />
                </>
              ) : null}
              {child}
            </React.Fragment>
          ))}
      </span>
    </TagGroupContext.Provider>
  );
}

export interface TagGroupItemProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    TagGroupItemVariants {
  /** 글자 앞에 놓는 아이콘 — `<IconCheckmarkLine />` 처럼 요소로 준다 */
  prefixIcon?: React.ReactElement;
  label: React.ReactNode;
  /** 글자 뒤에 놓는 아이콘 */
  suffixIcon?: React.ReactElement;
}

function TagGroupItem({
  className,
  prefixIcon,
  label,
  suffixIcon,
  size,
  weight,
  tone,
  ...props
}: TagGroupItemProps) {
  const group = React.useContext(TagGroupContext);
  const variants = {
    truncate: group.truncate ?? false,
    size: size ?? group.size ?? "t2",
    weight: weight ?? group.weight ?? "regular",
    tone: tone ?? group.tone ?? "neutralSubtle",
  } as const;
  return (
    <span
      data-slot="tag-group-item"
      className={cn(itemVariants(variants), className)}
      {...props}
    >
      {prefixIcon ? (
        <Icon svg={prefixIcon} className={iconVariants(variants)} />
      ) : null}
      <span
        data-slot="tag-group-item-label"
        className={labelVariants(variants)}
      >
        {label}
      </span>
      {suffixIcon ? (
        <Icon svg={suffixIcon} className={iconVariants(variants)} />
      ) : null}
    </span>
  );
}

export { TagGroupRoot, TagGroupItem };
