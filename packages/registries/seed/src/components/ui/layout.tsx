import * as React from "react";
import { useRender } from "@base-ui/react/use-render";

import { cn } from "@/lib/utils";

// 화면의 틀 — 바깥(Layout)이 화면 높이를 차지하고, 본문(LayoutContent)은 밀도(density)에 따라 폭을 묶어 가운데에 놓는다.

type Density = "low" | "medium" | "high";

// 본문의 가장 큰 폭 — high 는 묶지 않는다(표가 많은 관리 화면).
const CONTENT_MAX_WIDTH: Record<Density, string> = {
  low: "mobile:max-w-180",
  medium: "mobile:max-w-180 min-[1280px]:max-w-260",
  high: "",
};

const LayoutContext = React.createContext<Density>("medium");

export interface LayoutProps extends useRender.ComponentProps<"div"> {
  /** 본문 폭을 얼마나 묶을지 — 안의 LayoutContent 가 따른다 @default "medium" */
  density?: Density;
}

function Layout({
  density = "medium",
  className,
  render,
  ...props
}: LayoutProps) {
  const element = useRender({
    render,
    defaultTagName: "div",
    props: {
      "data-slot": "layout",
      className: cn("flex h-screen overflow-y-auto", className),
      ...props,
    },
  });
  return (
    <LayoutContext.Provider value={density}>{element}</LayoutContext.Provider>
  );
}

export type LayoutContentProps = useRender.ComponentProps<"div">;

function LayoutContent({ className, render, ...props }: LayoutContentProps) {
  const density = React.useContext(LayoutContext);
  return useRender({
    render,
    defaultTagName: "div",
    props: {
      "data-slot": "layout-content",
      className: cn("mx-auto w-full", CONTENT_MAX_WIDTH[density], className),
      ...props,
    },
  });
}

export { Layout, LayoutContent };
