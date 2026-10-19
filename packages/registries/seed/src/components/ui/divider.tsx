import type * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

// 구분선 — 가로면 아래 테두리, 세로면 오른쪽 테두리 한 줄로 그린다.
//
// 읽어 주는 기기: 기본 <hr> 은 뜻이 있는 구분선이라 '구분선'으로 읽힌다. 꾸밈일 뿐이면 as="div" 로 그려 읽히지 않게 하고,
// <hr> 이 아닌 요소(li 등)를 읽히게 하려면 role="separator" 를 준다. aria-orientation 은 필요할 때만 붙인다
// (<hr> 의 가로는 따로 적지 않아도 가로로 읽힌다).
const dividerVariants = cva(
  `m-0 box-border block border-0 border-solid
  border-(--divider-color,var(--stroke-neutral-muted)) p-0`,
  {
    variants: {
      orientation: {
        horizontal: "border-b-(length:--divider-thickness,1px)",
        vertical: "border-r-(length:--divider-thickness,1px)",
      },
      /** 양 끝(가로) · 위아래(세로)를 16px 씩 띄운다 */
      inset: { true: "", false: "" },
    },
    compoundVariants: [
      { orientation: "horizontal", inset: true, className: "mx-x4" },
      { orientation: "vertical", inset: true, className: "my-x4" },
    ],
    defaultVariants: { orientation: "horizontal", inset: false },
  },
);

// 색 토큰의 이름('stroke.neutralMuted' · 'palette.gray200')을 CSS 변수로. 이름이 아니면 CSS 색 그대로 쓴다.
const toColor = (color: string | undefined) => {
  const match = color?.match(/^(stroke|bg|fg|palette)\.(\w+)$/);
  if (!match) return color;
  const name = match[2]!
    .replace(/([a-z])([A-Z0-9])/g, "$1-$2")
    .replace(/([0-9])([A-Za-z])/g, "$1-$2")
    .toLowerCase();
  return `var(--${match[1]}-${name})`;
};

export interface DividerProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "color"
> {
  /** 그릴 요소 — 기본 hr */
  as?: "hr" | "div" | "li";
  /** 색 — 토큰 이름('stroke.neutralMuted', 기본) 또는 CSS 색 */
  color?: string;
  /** 굵기(px) — 기본 1 */
  thickness?: number | string;
  orientation?: "horizontal" | "vertical";
  inset?: boolean;
  ref?: React.Ref<HTMLElement>;
}

function Divider({
  as: Element = "hr",
  color,
  thickness,
  orientation = "horizontal",
  inset,
  className,
  style,
  role,
  ...props
}: DividerProps) {
  const needsOrientation =
    (Element === "hr" &&
      orientation !== "horizontal" &&
      (role === undefined || role === "separator")) ||
    (Element !== "hr" && role === "separator");
  return (
    <Element
      data-slot="divider"
      role={role}
      aria-orientation={needsOrientation ? orientation : undefined}
      className={cn(dividerVariants({ orientation, inset }), className)}
      style={
        {
          "--divider-color": toColor(color),
          "--divider-thickness":
            typeof thickness === "number" ? `${thickness}px` : thickness,
          ...style,
        } as React.CSSProperties
      }
      {...(props as React.HTMLAttributes<HTMLElement>)}
    />
  );
}

export { Divider, dividerVariants };
