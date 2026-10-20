"use client";

import type * as React from "react";
import { useRender } from "@base-ui/react/use-render";

import { cn } from "@/lib/utils";

export interface IconProps extends Omit<
  React.SVGAttributes<SVGSVGElement>,
  "color"
> {
  /** 그릴 아이콘 — `<IconXmarkLine />` 처럼 요소로 준다 */
  svg: React.ReactElement;
  /** 크기 — 치수 토큰('x4') · 'full'(부모만큼) · px 숫자. 안 주면 부모 부품이 정한 크기(--icon-size) */
  size?: number | string;
  /** 색 — CSS 값. 안 주면 부모 부품이 정한 색(--icon-color), 그것도 없으면 글자 색 */
  color?: string;
}

const toSize = (size: IconProps["size"]) => {
  if (size === undefined) return undefined;
  if (typeof size === "number") return `${size}px`;
  if (size === "full") return "100%";
  return /^x\d/.test(size) ? `var(--dimension-${size})` : size;
};

/**
 * 아이콘 — 준 svg 요소에 크기와 색을 입힌다(감싸는 요소를 만들지 않는다).
 * 크기 · 색은 부모 부품이 --icon-size · --icon-color 로 정해 주고, size · color 를 주면 그 값이 이긴다.
 */
function Icon({ svg, size, color, className, style, ...props }: IconProps) {
  return useRender({
    render: svg,
    props: {
      "aria-hidden": true,
      "data-slot": "icon",
      className: cn(
        "inline-flex size-(--icon-size) shrink-0 items-center justify-center align-middle",
        "text-(--icon-color,currentColor)",
        className,
      ),
      style: {
        "--icon-size": toSize(size),
        "--icon-color": color,
        ...style,
      } as React.CSSProperties,
      ...props,
    },
  });
}

export { Icon };
