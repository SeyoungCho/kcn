# 부품 파일의 짜임

shadcn(Base UI 판)의 부품과 나란히 놓았을 때 같은 손으로 쓴 것처럼 보여야 한다. 아래 두 뼈대가 기준이다.
실례: 단순한 부품은 `src/components/ui/badge.tsx`, Base UI 위에 세운 부품은 `src/components/ui/side-panel.tsx` · `bottom-sheet.tsx`.

## 단순한 부품 (Base UI 없이)

```tsx
import type * as React from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva("box-border inline-flex items-center antialiased", {
  variants: {
    size: {
      medium: "min-h-x5 gap-x0_5 rounded-r1 px-x1_5 text-t1",
      large: "min-h-x6 gap-x0_5 rounded-r1_5 px-x2 text-t2",
    },
    tone: { neutral: "", brand: "" },
    variant: { weak: "font-medium", solid: "font-bold" },
  },
  // 색조 × 변형의 조합은 compoundVariants 로 — 색은 시맨틱 토큰 클래스
  compoundVariants: [
    {
      tone: "brand",
      variant: "solid",
      className: "bg-bg-brand-solid text-fg-on-brand-solid",
    },
  ],
  defaultVariants: { size: "medium", tone: "neutral", variant: "solid" }, // 원본의 기본값과 같게
});

export interface BadgeProps
  extends React.ComponentProps<"span">, VariantProps<typeof badgeVariants> {}

function Badge({ className, size, tone, variant, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ size, tone, variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
```

## Base UI 위에 세운 부품

```tsx
import * as React from "react";
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";

import { cn } from "@/lib/utils";

export type SheetTriggerProps = DrawerPrimitive.Trigger.Props;

function SheetTrigger(props: SheetTriggerProps) {
  return <DrawerPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

export interface SheetContentProps extends Omit<
  DrawerPrimitive.Popup.Props,
  "className"
> {
  className?: string;
  /** 원본에 있던 prop 은 이름 · 기본값 그대로 */
  showCloseButton?: boolean;
}

function SheetContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: SheetContentProps) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Viewport
        data-slot="sheet-positioner"
        className="fixed inset-0 flex items-end justify-center"
      >
        <DrawerPrimitive.Backdrop
          data-slot="sheet-backdrop"
          className="fixed inset-0 bg-bg-overlay data-closed:animate-[fade-out_var(--motion-duration-d4)_var(--motion-ease-exit)_forwards]"
        />
        <DrawerPrimitive.Popup
          data-slot="sheet-content"
          className={cn(
            "relative flex flex-col rounded-t-r6 bg-bg-layer-floating",
            className,
          )}
          {...props}
        >
          {children}
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPrimitive.Portal>
  );
}

export { SheetTrigger, SheetContent };
```

## 규칙 요약

| 할 것                                                                                                     | 하지 말 것                                                                                                       |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `import { X as XPrimitive } from '@base-ui/react/x'`                                                      | 원본 패키지 · 원본 헤드리스 훅 import                                                                            |
| 얇은 함수 — 클래스 · `data-slot` · 기본값만 더한다                                                        | 열림 · 선택 · 값 상태를 `useState` 로 따로 쥐기(Base UI 가 쥔다. 꼭 필요하면 controlled/uncontrolled 둘 다 받게) |
| `cn(variants(…), className)` — `className` 맨 뒤                                                          | `className` 을 앞에 두거나 덮어쓰기                                                                              |
| 모든 요소에 `data-slot="<부품>-<자리>"`                                                                   | BEM 클래스(`.x-dialog__content`) 다시 만들기                                                                     |
| `render` 로 다른 요소 그리기                                                                              | `asChild` · `forwardRef`                                                                                         |
| props 타입은 `XPrimitive.Part.Props` 를 넓힌다                                                            | `any`, 원본 타입 그대로 복사                                                                                     |
| 값은 토큰 클래스(`p-x4` · `text-t4` · `duration-d3`)                                                      | `style={{ padding: 16 }}`, 원본 CSS 변수(`var(--seed-…)`) 직접 참조                                              |
| 상태는 variant(`data-open:` · `pressed:` · `focused:`)                                                    | 상태마다 JS 로 클래스 갈아 끼우기                                                                                |
| 원본 API 를 납작하게(`Field.Root` → `Field`, `Field.Header` → `FieldHeader`)                              | 원본의 네임스페이스 객체 그대로 내보내기                                                                         |
| 여러 부품이 쓰는 동작은 `src/lib/use-xxx.ts` 훅으로(예: `use-scale-feedback`, `use-drawer-swipe-release`) | 같은 포인터 처리 코드를 부품마다 복사                                                                            |
| 원본 로직 중 순수 계산(달력 · 날짜)은 `src/lib/xxx.ts` 로 빼서 단위 테스트                                | 계산을 부품 안에 묻기                                                                                            |

## 원본에서 가져오는 법

1. 원본 부품의 **부위 목록**(CSS 의 `__part` 이름들)을 적는다 → 그대로 `data-slot` 목록이 된다.
2. 부위마다 원본 CSS 의 **계산된 값**을 읽는다(개발자 도구 또는 원본 CSS 파일). 값마다 해당 토큰 클래스를 찾는다.
3. 상태별 규칙(`:hover` · `[data-disabled]` · `[data-open]` …)을 variant 클래스로 옮긴다.
4. 움직임은 keyframes 이름 · duration · easing · fill-mode 까지 같게(`data-open:animate-[seed-enter_var(--motion-duration-d6)_var(--motion-ease-enter)]`).
5. 동작은 원본 코드를 읽어 **규칙만** 뽑는다(예: "높이의 25% 또는 0.4px/ms 넘으면 닫는다"). 그 규칙을 Base UI 의 공개된 틈으로 구현한다.
