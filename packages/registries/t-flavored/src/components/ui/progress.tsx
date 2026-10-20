import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Progress 에 t-flavored 의 모양을 입혔다.
//   value — shadcn 처럼 0~100(max 로 바꾼다).
//   size — sm · default · lg (2 · 5 · 8px 두께).
// 막대는 blue-400 이고, 값이 바뀌면 0.5s ease-in-out 으로 늘거나 준다. 막대 색은 ProgressIndicator 의 bg-* 로 바꾼다.
const progressTrackVariants = cva(
  "relative flex w-full items-center overflow-hidden rounded-full bg-grey-200",
  {
    variants: {
      size: {
        sm: "h-0.5",
        default: "h-1.25",
        lg: "h-2",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

type ProgressProps = ProgressPrimitive.Root.Props &
  VariantProps<typeof progressTrackVariants>;

function Progress({
  className,
  children,
  value,
  size = "default",
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      data-size={size}
      className={cn("flex flex-wrap gap-3", className)}
      {...props}
    >
      {children}
      <ProgressTrack size={size}>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  );
}

type ProgressTrackProps = ProgressPrimitive.Track.Props &
  VariantProps<typeof progressTrackVariants>;

function ProgressTrack({ className, size, ...props }: ProgressTrackProps) {
  return (
    <ProgressPrimitive.Track
      data-slot="progress-track"
      className={cn(progressTrackVariants({ size }), className)}
      {...props}
    />
  );
}

function ProgressIndicator({
  className,
  ...props
}: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn(
        `h-full rounded-full bg-blue-400 transition-[width] duration-500
        ease-[ease-in-out]`,
        className,
      )}
      {...props}
    />
  );
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      data-slot="progress-label"
      className={cn("text-t7 font-medium text-grey-800", className)}
      {...props}
    />
  );
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      data-slot="progress-value"
      className={cn("ms-auto text-t7 text-grey-600 tabular-nums", className)}
      {...props}
    />
  );
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
  progressTrackVariants,
  type ProgressProps,
  type ProgressTrackProps,
};
