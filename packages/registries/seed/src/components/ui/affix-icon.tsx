import type * as React from "react";
import { useRender } from "@base-ui/react/use-render";

import { cn } from "@/lib/utils";

export interface AffixIconProps extends React.SVGAttributes<SVGSVGElement> {
  /** 그릴 아이콘 — `<IconPlusLine />` 처럼 요소로 준다 */
  svg: React.ReactElement;
}

const base = "inline-flex shrink-0 items-center justify-center align-middle";

/**
 * 글자 앞에 놓는 아이콘 — 크기 · 색 · 바깥 여백은 부모 부품이 정한다
 * (--prefix-icon-size · --prefix-icon-color · --prefix-icon-margin-* · --prefix-icon-align-self).
 */
function PrefixIcon({ svg, className, ...props }: AffixIconProps) {
  return useRender({
    render: svg,
    props: {
      "aria-hidden": true,
      "data-slot": "prefix-icon",
      className: cn(
        base,
        "size-(--prefix-icon-size) text-(--prefix-icon-color,currentColor)",
        "mt-(--prefix-icon-margin-top,0) mr-(--prefix-icon-margin-right,0) mb-(--prefix-icon-margin-bottom,0) ml-(--prefix-icon-margin-left,0)",
        "[align-self:var(--prefix-icon-align-self)] [justify-self:var(--prefix-icon-justify-self)]",
        className,
      ),
      ...props,
    },
  });
}

/** 글자 뒤에 놓는 아이콘 — 부모 부품이 --suffix-icon-* 로 정한다. */
function SuffixIcon({ svg, className, ...props }: AffixIconProps) {
  return useRender({
    render: svg,
    props: {
      "aria-hidden": true,
      "data-slot": "suffix-icon",
      className: cn(
        base,
        "size-(--suffix-icon-size) text-(--suffix-icon-color,currentColor)",
        "mt-(--suffix-icon-margin-top,0) mr-(--suffix-icon-margin-right,0) mb-(--suffix-icon-margin-bottom,0) ml-(--suffix-icon-margin-left,0)",
        "[align-self:var(--suffix-icon-align-self)] [justify-self:var(--suffix-icon-justify-self)]",
        className,
      ),
      ...props,
    },
  });
}

export { PrefixIcon, SuffixIcon };
