import type * as React from "react";

import { ActionButton } from "@/components/ui/action-button";
import type { ActionButtonProps } from "@/components/ui/action-button";
import { cn } from "@/lib/utils";

/** 치수 토큰 이름 — 'x4' 처럼 */
type Dimension = `x${string}`;

const text = "m-0 text-center whitespace-pre-line";

const SIZES = {
  large: {
    texts: "gap-x3 pb-x7",
    title: "text-t8 font-bold",
    description: "text-t5 font-regular",
  },
  medium: {
    texts: "gap-x2 pb-x6",
    title: "text-t5 font-bold",
    description: "text-t4 font-regular",
  },
};

export interface ResultSectionProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title" | "children"
> {
  ref?: React.Ref<HTMLDivElement>;
  /** @default 'large' */
  size?: "large" | "medium";
  /** 글 위에 놓는 그림 */
  asset?: React.ReactNode;
  /** 줄을 나누려면 \n */
  title?: React.ReactNode;
  /** 줄을 나누려면 \n */
  description?: React.ReactNode;
  primaryActionProps?: ActionButtonProps;
  secondaryActionProps?: ActionButtonProps;
  /** 좌우 안쪽 여백(치수 토큰). @default 'x12' */
  px?: Dimension;
  /** 위아래 안쪽 여백(치수 토큰). @default 'x4' */
  py?: Dimension;
}

/** 결과 · 빈 상태 · 오류를 알리는 자리 — 그림 · 제목 · 설명 · 다음에 할 일 버튼. */
function ResultSection({
  className,
  style,
  size = "large",
  asset,
  title,
  description,
  primaryActionProps,
  secondaryActionProps,
  px = "x12",
  py = "x4",
  ...props
}: ResultSectionProps) {
  const styles = SIZES[size];
  return (
    <div
      data-slot="result-section"
      className={cn(
        `flex grow flex-col items-center justify-center px-(--result-section-px)
        py-(--result-section-py)`,
        className,
      )}
      style={
        {
          "--result-section-px": `var(--dimension-${px})`,
          "--result-section-py": `var(--dimension-${py})`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {asset}
      <div
        data-slot="result-section-texts"
        className={cn("flex flex-col", styles.texts)}
      >
        <span
          data-slot="result-section-title"
          className={cn(text, "text-fg-neutral", styles.title)}
        >
          {title}
        </span>
        <span
          data-slot="result-section-description"
          className={cn(text, "text-fg-neutral-muted", styles.description)}
        >
          {description}
        </span>
      </div>
      {primaryActionProps || secondaryActionProps ? (
        <div
          data-slot="result-section-actions"
          className="flex flex-col items-center gap-x5"
        >
          {primaryActionProps ? (
            <ActionButton
              variant="neutralWeak"
              size="medium"
              {...primaryActionProps}
            />
          ) : null}
          {secondaryActionProps ? (
            // 글자만 보이는 버튼이라 안쪽 여백만큼 바깥으로 당겨, 누르는 자리는 넓히고 놓이는 자리는 글자에 맞춘다
            <ActionButton
              variant="ghost"
              size="small"
              {...secondaryActionProps}
              className={cn("-mx-x3.5 -my-x2", secondaryActionProps.className)}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export { ResultSection };
