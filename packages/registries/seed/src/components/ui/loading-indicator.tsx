import type * as React from "react";

import { ProgressCircle } from "@/components/ui/progress-circle";
import { cn } from "@/lib/utils";

export interface LoadingIndicatorProps extends Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  "color"
> {
  ref?: React.Ref<HTMLSpanElement>;
  /** 내용 위에 겹쳐 그릴 것. 기본은 부모 부품이 크기 · 색을 정하는 ProgressCircle */
  indicator?: React.ReactNode;
}

/**
 * 버튼 안의 '처리 중' 표시 — 내용은 안 보이게만 하고 자리는 그대로 둔다(버튼의 폭이 바뀌지 않게).
 * 가운데 놓는 것은 부모의 몫이다(부모가 relative + 가운데 정렬인 flex 여야 한다).
 */
function LoadingIndicator({
  className,
  children,
  indicator = <ProgressCircle size="inherit" tone="inherit" />,
  ...props
}: LoadingIndicatorProps) {
  return (
    <>
      <span
        data-slot="loading-indicator"
        className={cn("absolute inline-flex", className)}
        {...props}
      >
        {indicator}
      </span>
      <span
        data-slot="loading-indicator-content"
        className="[display:inherit] gap-[inherit] opacity-0"
      >
        {children}
      </span>
    </>
  );
}

export { LoadingIndicator };
