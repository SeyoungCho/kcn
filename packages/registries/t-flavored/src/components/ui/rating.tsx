import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import { StarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

// 별 max 개로 점수를 매기거나 보여 준다.
//   size — xs · sm · default · lg · xl(별 16 · 20 · 24 · 32 · 40px).
//   점수를 매길 때는 RadioGroup 위의 별 Radio 들이고(화살표로 옮겨 다닌다), readOnly 면 그림 한 장이다.
//   readOnly 의 variant — default 는 별 + 점수, compact 는 별 하나 + 점수, icon-only 는 별만.
// 누르는 동안 별이 모두 0.9 배로 줄며 조금 어두워지고, 떼면 1.1 배까지 튀었다 돌아오며 켜진 별에서 노란 빛이 퍼진다.
const ratingVariants = cva("relative inline-flex items-center", {
  variants: {
    size: {
      xs: "",
      sm: "",
      default: "",
      lg: "",
      xl: "",
    },
    readOnly: {
      true: "",
      // 누르는 중인지를 별에게 알린다(--rating-pressed)
      false: `group/rating [--rating-pressed:0] active:[--rating-pressed:1]
      data-disabled:pointer-events-none`,
    },
  },
  compoundVariants: [
    // 별 사이는 점수를 매길 때만 벌어진다
    { readOnly: false, size: ["xs", "sm", "default"], className: "gap-2" },
    { readOnly: false, size: "lg", className: "gap-1.5" },
    { readOnly: false, size: "xl", className: "gap-1" },
  ],
  defaultVariants: {
    size: "default",
    readOnly: false,
  },
});

// lucide 별은 t-flavored 별보다 조금 작아(24px 칸에서 19.7px · 21.5px) 1.09 배로 키운다
const ratingStarVariants = cva(
  "relative shrink-0 scale-[1.09] fill-current stroke-none",
  {
    variants: {
      size: {
        xs: "size-4",
        sm: "size-5",
        default: "size-6",
        lg: "size-8",
        xl: "size-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

// 고른 별과 그 앞의 별(뒤에 고른 별이 있는 별)이 켜진다 — 노랗게 칠하고 --rating-lit 을 1 로.
// 떼고 나서의 튐(0.9 → 1.1 → 1)은 스프링을 linear() 로 그린다.
const ratingItemVariants = cva(
  `relative inline-flex shrink-0 cursor-pointer items-center justify-center
  rounded-full text-grey-opacity-200 outline-none [--rating-lit:0]
  transition-[color,scale,filter] duration-[170ms,450ms,120ms]
  ease-[cubic-bezier(0,0,0.2,1),linear(0,1.35_11%,1.88_21%,2_31%,1.92_42%,1.45_53%,1.2_64%,1.06_74%,1.02_84%,1),cubic-bezier(0,0,0.2,1)]
  group-active/rating:scale-90 group-active/rating:brightness-90
  group-active/rating:duration-170 group-active/rating:ease-out
  focus-visible:ring-3 focus-visible:ring-ring/50 data-checked:text-yellow-400
  data-checked:[--rating-lit:1] data-disabled:cursor-default
  data-disabled:opacity-30 has-[~[data-checked]]:text-yellow-400
  has-[~[data-checked]]:[--rating-lit:1]`,
);

// 빛 — 켜진 별이 쉬고 있을 때(--rating-glow 1)만 scale 1 · opacity 0 이고, 나머지는 scale 0 으로 숨는다.
// 0 → 1 로 바뀔 때만 시간을 줘 linear() 가 그 사이를 그린다: 1.5 배로 퍼지며 반쯤 비쳤다가 사라진다.
const ratingGlowVariants = cva(
  `pointer-events-none absolute inset-0 rounded-full
  bg-[radial-gradient(closest-side,var(--color-yellow-400),transparent)]
  opacity-[calc(1-var(--rating-glow))] transition-[scale,opacity]
  duration-[calc(var(--rating-glow)*450ms)]
  ease-[linear(1,1.34_11%,1.47_21%,1.5_31%,1.46_42%,1.21_53%,1.15_63%,1.03_74%,1),linear(1,0.66_11%,0.53_21%,0.5_31%,0.54_42%,0.79_53%,0.85_63%,0.97_74%,1)]
  [--rating-glow:calc(var(--rating-lit)*(1-var(--rating-pressed)))]
  scale-(--rating-glow)`,
);

const ratingValueVariants = cva("text-foreground", {
  variants: {
    size: {
      xs: "ml-0.5 text-t7 font-medium",
      sm: "ml-1 text-t5 font-semibold",
      default: "ml-1 text-t4 font-semibold",
      lg: "ml-1 text-t3 font-bold",
      xl: "ml-1 text-st5 font-bold",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type RatingProps = Omit<
  RadioGroupPrimitive.Props<number>,
  "className" | "readOnly"
> &
  Omit<VariantProps<typeof ratingVariants>, "readOnly"> & {
    className?: string;
    /** 별의 수 */
    max?: number;
    /** 점수를 보여 주기만 한다 */
    readOnly?: boolean;
    /** readOnly 일 때의 모양 */
    variant?: "default" | "compact" | "icon-only";
    /** 별 하나하나의 aria-label */
    getItemLabel?: (value: number) => string;
  };

function Rating({
  className,
  size = "default",
  max = 5,
  readOnly = false,
  variant = "default",
  getItemLabel = String,
  value,
  defaultValue,
  ...props
}: RatingProps) {
  const stars = Array.from({ length: max }, (_, index) => index + 1);

  if (readOnly) {
    const score = value ?? defaultValue ?? 0;

    return (
      <div
        data-slot="rating"
        data-readonly=""
        data-variant={variant}
        data-size={size}
        role="img"
        id={props.id}
        aria-label={props["aria-label"] ?? `${score}/${max}`}
        aria-labelledby={props["aria-labelledby"]}
        aria-describedby={props["aria-describedby"]}
        className={cn(ratingVariants({ size, readOnly }), className)}
      >
        {(variant === "compact" ? [1] : stars).map((star) => (
          <StarIcon
            key={star}
            data-slot="rating-star"
            aria-hidden
            className={cn(
              ratingStarVariants({ size }),
              variant === "compact" || star <= Math.round(score)
                ? "text-yellow-400"
                : "text-grey-opacity-200",
            )}
          />
        ))}
        {variant !== "icon-only" && (
          <span
            data-slot="rating-value"
            aria-hidden
            className={ratingValueVariants({ size })}
          >
            {score}
          </span>
        )}
      </div>
    );
  }

  return (
    <RadioGroupPrimitive<number>
      data-slot="rating"
      data-size={size}
      value={value}
      defaultValue={defaultValue}
      className={cn(ratingVariants({ size, readOnly }), className)}
      {...props}
    >
      {stars.map((star) => (
        <RadioPrimitive.Root
          key={star}
          data-slot="rating-item"
          value={star}
          aria-label={getItemLabel(star)}
          className={ratingItemVariants()}
        >
          <span
            data-slot="rating-item-glow"
            aria-hidden
            className={ratingGlowVariants()}
          />
          <StarIcon
            data-slot="rating-item-star"
            aria-hidden
            className={ratingStarVariants({ size })}
          />
        </RadioPrimitive.Root>
      ))}
    </RadioGroupPrimitive>
  );
}

export {
  Rating,
  ratingVariants,
  ratingItemVariants,
  ratingStarVariants,
  ratingGlowVariants,
  ratingValueVariants,
  type RatingProps,
};
